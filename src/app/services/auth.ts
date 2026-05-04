import { supabase, hasSupabaseConfig } from "./supabase";
import { logAuditEvent } from "./backend";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  approved: boolean;
  role: string;
  createdAt: string;
}

const mapProfile = (row: Record<string, unknown>): UserProfile => ({
  id: String(row.id ?? ""),
  email: String(row.email ?? ""),
  username: String(row.username ?? ""),
  approved: Boolean(row.approved),
  role: String(row.role ?? "user"),
  createdAt: String(row.created_at ?? ""),
});

const resolveEmailForUsername = async (username: string): Promise<string> => {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase.rpc("get_email_for_username", {
    username_input: username,
  });

  if (error || !data) {
    throw new Error("Username not found");
  }

  return String(data);
};

const isUsernameTaken = async (username: string): Promise<boolean> => {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase.rpc("is_username_taken", {
    username_input: username,
  });

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
};

const normalizeUsername = (value: string): string => {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "");
  return cleaned;
};

const isPasswordValid = (password: string, username: string, email: string): boolean => {
  const trimmed = password.trim();
  const hasLowercase = /[a-z]/.test(trimmed);
  const hasUppercase = /[A-Z]/.test(trimmed);
  const hasDigit = /\d/.test(trimmed);
  const hasSpecial = /[^A-Za-z\d]/.test(trimmed);
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = trimmed.toLowerCase();

  if (trimmed.length < 8 || !hasLowercase || !hasUppercase || !hasDigit || !hasSpecial) {
    return false;
  }

  if (
    normalizedPassword === normalizedUsername ||
    normalizedPassword === normalizedEmail ||
    normalizedPassword.includes(normalizedUsername)
  ) {
    return false;
  }

  return true;
};

const buildUniqueUsername = async (seed: string, userId: string): Promise<string> => {
  let base = normalizeUsername(seed);
  if (!base) {
    base = `user${userId.slice(0, 6).toLowerCase()}`;
  }

  if (!(await isUsernameTaken(base))) {
    return base;
  }

  for (let i = 0; i < 5; i += 1) {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const candidate = `${base}${suffix}`;
    if (!(await isUsernameTaken(candidate))) {
      return candidate;
    }
  }

  return `${base}${Date.now().toString().slice(-5)}`;
};

export async function signInWithGoogle(): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }
  // Use path-based redirect (no hash) so the OAuth provider returns tokens
  // to a single-hash callback (e.g. /auth/callback#access_token=...) instead
  // of creating a double-hash when using HashRouter.
  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}auth/callback`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function handleGoogleCallback(): Promise<UserProfile | null> {
  if (!supabase || !hasSupabaseConfig()) {
    return null;
  }

  const { data } = await supabase.auth.getSession();
  const sessionUser = data.session?.user;
  if (!sessionUser) {
    return null;
  }

  const { data: existingProfile, error: profileError } = await supabase
    .from("user_profiles")
    .select("id,email,username,approved,role,created_at")
    .eq("id", sessionUser.id)
    .maybeSingle();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!existingProfile) {
    const email = sessionUser.email ?? "";
    const metadata = sessionUser.user_metadata as Record<string, unknown> | null;
    const preferred = String(metadata?.preferred_username ?? "");
    const fullName = String(metadata?.full_name ?? "");
    const seed = preferred || fullName || email.split("@")[0] || "user";
    const username = await buildUniqueUsername(seed, sessionUser.id);

    const { error: insertError } = await supabase.from("user_profiles").insert({
      id: sessionUser.id,
      email,
      username,
      approved: false,
      role: "user",
    });

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  const { data: profileData, error: reloadError } = await supabase
    .from("user_profiles")
    .select("id,email,username,approved,role,created_at")
    .eq("id", sessionUser.id)
    .maybeSingle();

  if (reloadError || !profileData) {
    throw new Error("Account profile not found");
  }

  const profile = mapProfile(profileData as Record<string, unknown>);
  if (!profile.approved) {
    await supabase.auth.signOut();
    throw new Error("Account pending admin approval");
  }

  await logAuditEvent({
    userId: profile.id,
    username: profile.username,
    event: "login",
    details: "Google login",
  });

  return profile;
}

export async function signUpUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const trimmedUsername = input.username.trim();
  if (!trimmedUsername) {
    throw new Error("Username is required");
  }

  if (await isUsernameTaken(trimmedUsername)) {
    throw new Error("Username already taken");
  }

  if (!isPasswordValid(input.password, trimmedUsername, input.email)) {
    throw new Error("Password must be at least 8 characters long, include uppercase and lowercase letters, numbers, and a special character, and not reuse your username or email.");
  }

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const userId = data.user?.id;
  if (!userId) {
    throw new Error("Unable to create account");
  }

  const { error: profileError } = await supabase.from("user_profiles").insert({
    id: userId,
    email: input.email,
    username: trimmedUsername,
    approved: false,
    role: "user",
  });

  if (profileError) {
    throw new Error(profileError.message);
  }
}

export async function sendPasswordReset(email: string): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  // Use path-based reset redirect to avoid hash-double issues.
  const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}auth/reset`;
  // Log redirectTo so we can verify it exactly matches the allowed redirect URL in Supabase
  // (open DevTools Console to see this when you trigger a reset)
  // Example expected value: http://localhost:5173/#/auth/reset
  // If this value doesn't match an allowed redirect, Supabase will fall back to Site URL.
  // Keep this log temporarily for debugging; remove it in production.
  // eslint-disable-next-line no-console
  console.log("sendPasswordReset redirectTo:", redirectTo);

  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updatePassword(newPassword: string): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    throw new Error(error.message);
  }
}

export async function signInUser(input: {
  username: string;
  password: string;
}): Promise<UserProfile> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const email = await resolveEmailForUsername(input.username.trim());

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: input.password,
  });

  if (error || !data.user) {
    throw new Error(error?.message ?? "Sign in failed");
  }

  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("id,email,username,approved,role,created_at")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError || !profileData) {
    await supabase.auth.signOut();
    throw new Error("Account profile not found");
  }

  const profile = mapProfile(profileData as Record<string, unknown>);
  if (!profile.approved) {
    await supabase.auth.signOut();
    throw new Error("Account pending admin approval");
  }

  await logAuditEvent({
    userId: profile.id,
    username: profile.username,
    event: "login",
    details: "Password login",
  });

  return profile;
}

export async function getPendingApprovals(): Promise<UserProfile[]> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("id,email,username,approved,role,created_at")
    .eq("approved", false)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map(mapProfile);
}

export async function getUsersByRole(role: string): Promise<UserProfile[]> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("id,email,username,approved,role,created_at")
    .eq("role", role)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map(mapProfile);
}

export async function approveUser(userId: string): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({ approved: true })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function rejectUser(userId: string): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase.from("user_profiles").delete().eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  if (!supabase || !hasSupabaseConfig()) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return null;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("user_profiles")
    .select("id,email,username,approved,role,created_at")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError || !profileData) {
    return null;
  }

  return mapProfile(profileData as Record<string, unknown>);
}

export async function signOutUser(): Promise<void> {
  if (!supabase || !hasSupabaseConfig()) {
    return;
  }

  await supabase.auth.signOut();
}
