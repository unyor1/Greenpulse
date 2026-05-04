const env = import.meta.env;

const BLYNK_BASE_URL = (env.VITE_BLYNK_BASE_URL ?? "https://blynk.cloud").trim();
const BLYNK_AUTH_TOKEN = (env.VITE_BLYNK_AUTH_TOKEN ?? "").trim();

const normalizePin = (pin: string) => pin.trim().toUpperCase();

export const hasBlynkConfig = () => Boolean(BLYNK_BASE_URL && BLYNK_AUTH_TOKEN);

export async function updateBlynkVirtualPin(pin: string, value: boolean): Promise<void> {
  if (!hasBlynkConfig()) {
    throw new Error("Blynk config missing");
  }

  const normalizedPin = normalizePin(pin);
  if (!/^V\d+$/.test(normalizedPin)) {
    throw new Error(`Invalid Blynk pin: ${pin}`);
  }

  const baseUrl = BLYNK_BASE_URL.replace(/\/+$/, "");
  const url = new URL(`${baseUrl}/external/api/update`);
  url.searchParams.set("token", BLYNK_AUTH_TOKEN);
  url.searchParams.set(normalizedPin, value ? "1" : "0");

  const response = await fetch(url.toString(), { method: "GET" });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Blynk update failed: ${response.status} ${body}`);
  }
}
