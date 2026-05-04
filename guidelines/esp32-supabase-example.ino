#define BLYNK_TEMPLATE_ID   "TMPL6qwHOuLqv"
#define BLYNK_TEMPLATE_NAME "GreenPulse"
#define BLYNK_AUTH_TOKEN    "q2nki5fuHJfh6zcPFe_xCxArCSMU9uCr"

#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <BlynkSimpleEsp32.h>

// ─── Credentials ──────────────────────────────────────────────────────────────

char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "Angel";
char pass[] = "03781489";

const char* SUPABASE_URL      = "https://ppcwxgllgvqdgidbifky.supabase.co";
const char* SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwY3d4Z2xsZ3ZxZGdpZGJpZmt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzQ4MDEsImV4cCI6MjA4ODYxMDgwMX0.guY2rEkRdFyi0Pa8O3yJQgzZ8nGNgw7Al6BLh1KEjao";
const char* DEVICE_ID         = "esp32-1";

// ─── Pins ─────────────────────────────────────────────────────────────────────

#define SOIL_PIN       32
#define LDR_PIN        34
#define PUMP_PIN        5
#define HUMIDIFIER_PIN  2

// ─── State ────────────────────────────────────────────────────────────────────

bool pumpState      = false;
bool humidifierState = false;

BlynkTimer timer;

// ─── Supabase helpers ─────────────────────────────────────────────────────────

String makeSupabaseUrl(const String& pathAndQuery) {
  return String(SUPABASE_URL) + "/rest/v1/" + pathAndQuery;
}

void addSupabaseHeaders(HTTPClient& http) {
  http.addHeader("apikey",        SUPABASE_ANON_KEY);
  http.addHeader("Authorization", String("Bearer ") + SUPABASE_ANON_KEY);
}

bool parseSupabaseBool(const JsonVariant& value) {
  if (value.is<bool>()) return value.as<bool>();
  if (value.is<int>()) return value.as<int>() == 1;
  if (value.is<const char*>()) {
    String text = value.as<const char*>();
    text.toLowerCase();
    return text == "1" || text == "true" || text == "on";
  }
  return false;
}

bool fetchDeviceState(bool& pumpOut, bool& pestOut) {
  if (WiFi.status() != WL_CONNECTED) return false;

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient http;
  String url = makeSupabaseUrl(String("device_state?device_id=eq.%22") + DEVICE_ID + "%22&select=waterpump_on,pest_on&limit=1");
  if (!http.begin(client, url)) {
    Serial.println("[Supabase] Failed to connect for device_state read.");
    return false;
  }

  addSupabaseHeaders(http);
  http.addHeader("Accept", "application/json");

  int code = http.GET();
  if (code < 200 || code >= 300) {
    Serial.print("[Supabase] device_state read failed. HTTP ");
    Serial.println(code);
    Serial.println(http.getString());
    http.end();
    return false;
  }

  String body = http.getString();
  http.end();

  DynamicJsonDocument doc(512);
  if (deserializeJson(doc, body)) {
    Serial.println("[Supabase] JSON parse error on device_state.");
    return false;
  }

  if (!doc.is<JsonArray>() || doc.size() == 0) {
    return false;
  }

  JsonVariant row = doc[0];
  pumpOut = parseSupabaseBool(row["waterpump_on"]);
  pestOut = parseSupabaseBool(row["pest_on"]);
  return true;
}

// ─── Push sensor readings to Supabase ─────────────────────────────────────────

void postSensorLog(int soilPercent, int lightPercent) {
  if (WiFi.status() != WL_CONNECTED) return;

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient http;
  String url = makeSupabaseUrl("sensor_logs");
  if (!http.begin(client, url)) {
    Serial.println("[Supabase] Failed to connect for sensor_logs.");
    return;
  }

  addSupabaseHeaders(http);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Prefer",       "return=minimal");

  StaticJsonDocument<256> doc;
  doc["device_id"] = DEVICE_ID;
  doc["moisture"]  = soilPercent;
  doc["light"]     = lightPercent;
  doc["waterpump"] = pumpState ? 1 : 0;
  doc["pest"]      = humidifierState ? 1 : 0;

  String payload;
  serializeJson(doc, payload);

  int code = http.POST(payload);
  if (code >= 200 && code < 300) {
    Serial.println("[Supabase] sensor_logs inserted.");
  } else {
    Serial.print("[Supabase] sensor_logs failed. HTTP ");
    Serial.println(code);
    Serial.println(http.getString());
  }
  http.end();
}

// ─── Upsert device state to Supabase ──────────────────────────────────────────

void upsertDeviceState() {
  if (WiFi.status() != WL_CONNECTED) return;

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient http;
  String url = makeSupabaseUrl("device_state");
  if (!http.begin(client, url)) {
    Serial.println("[Supabase] Failed to connect for device_state.");
    return;
  }

  addSupabaseHeaders(http);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Prefer",       "resolution=merge-duplicates,return=minimal");

  StaticJsonDocument<256> doc;
  doc["device_id"]    = DEVICE_ID;
  doc["waterpump_on"] = pumpState;
  doc["pest_on"]      = humidifierState;

  String payload;
  serializeJson(doc, payload);

  int code = http.POST(payload);
  if (code >= 200 && code < 300) {
    Serial.println("[Supabase] device_state upserted.");
  } else {
    Serial.print("[Supabase] device_state failed. HTTP ");
    Serial.println(code);
    Serial.println(http.getString());
  }
  http.end();
}

void upsertDeviceSensorState(int soilPercent, int lightPercent) {
  if (WiFi.status() != WL_CONNECTED) return;

  WiFiClientSecure client;
  client.setInsecure();

  HTTPClient http;
  String url = makeSupabaseUrl("device_state");
  if (!http.begin(client, url)) {
    Serial.println("[Supabase] Failed to connect for device_state (sensors).");
    return;
  }

  addSupabaseHeaders(http);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Prefer",       "resolution=merge-duplicates,return=minimal");

  StaticJsonDocument<256> doc;
  doc["device_id"]     = DEVICE_ID;
  doc["waterpump_on"]  = pumpState;
  doc["pest_on"]       = humidifierState;
  doc["soil_moisture"] = soilPercent;
  doc["light"]         = lightPercent;

  String payload;
  serializeJson(doc, payload);

  int code = http.POST(payload);
  if (code >= 200 && code < 300) {
    Serial.println("[Supabase] device_state sensors upserted.");
  } else {
    Serial.print("[Supabase] device_state sensors failed. HTTP ");
    Serial.println(code);
    Serial.println(http.getString());
  }
  http.end();
}

// ─── Sensor read + Blynk + Supabase every 2s ──────────────────────────────────

void sendSensorData() {
  int soilRaw  = analogRead(SOIL_PIN);
  int ldrRaw   = analogRead(LDR_PIN);

  int soilPercent  = constrain(map(soilRaw,  4095, 1500, 0, 100), 0, 100);
  int lightPercent = constrain(map(ldrRaw,   0, 4095, 0, 100),    0, 100);

  pumpState = digitalRead(PUMP_PIN) == HIGH;
  humidifierState = digitalRead(HUMIDIFIER_PIN) == HIGH;

  // Push to Supabase
  postSensorLog(soilPercent, lightPercent);
  upsertDeviceSensorState(soilPercent, lightPercent);

  Serial.print("Soil: ");  Serial.print(soilPercent);
  Serial.print("% | Light: "); Serial.print(lightPercent);
  Serial.println("%");
}

void pollDeviceStateFromSupabase() {
  bool pumpOn = pumpState;
  bool pestOn = humidifierState;
  if (!fetchDeviceState(pumpOn, pestOn)) return;

  if (pumpOn != pumpState) {
    pumpState = pumpOn;
    digitalWrite(PUMP_PIN, pumpState ? HIGH : LOW);
    Blynk.virtualWrite(V2, pumpState ? 1 : 0);
    Serial.print("[Supabase] Pump: ");
    Serial.println(pumpState ? "ON" : "OFF");
  }

  if (pestOn != humidifierState) {
    humidifierState = pestOn;
    digitalWrite(HUMIDIFIER_PIN, humidifierState ? HIGH : LOW);
    Blynk.virtualWrite(V3, humidifierState ? 1 : 0);
    Serial.print("[Supabase] Humidifier: ");
    Serial.println(humidifierState ? "ON" : "OFF");
  }
}

// ─── Blynk virtual pin handlers ───────────────────────────────────────────────

// V2 → Water Pump toggle
BLYNK_WRITE(V2) {
  pumpState = param.asInt() == 1;
  digitalWrite(PUMP_PIN, pumpState ? HIGH : LOW);
  Serial.print("[Blynk] Pump: ");
  Serial.println(pumpState ? "ON" : "OFF");
  upsertDeviceState();   // ← immediately mirror to Supabase
}

// V3 → Humidifier/Pest toggle
BLYNK_WRITE(V3) {
  humidifierState = param.asInt() == 1;
  digitalWrite(HUMIDIFIER_PIN, humidifierState ? HIGH : LOW);
  Serial.print("[Blynk] Humidifier: ");
  Serial.println(humidifierState ? "ON" : "OFF");
  upsertDeviceState();   // ← immediately mirror to Supabase
}

// Sync pin states when ESP32 reconnects to Blynk
BLYNK_CONNECTED() {
  Blynk.syncVirtual(V2);
  Blynk.syncVirtual(V3);
  Serial.println("[Blynk] Connected & virtual pins synced.");
}

// ─── Setup & Loop ─────────────────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);

  pinMode(PUMP_PIN,      OUTPUT);
  pinMode(HUMIDIFIER_PIN, OUTPUT);
  digitalWrite(PUMP_PIN,      LOW);
  digitalWrite(HUMIDIFIER_PIN, LOW);

  Blynk.begin(auth, ssid, pass);
  timer.setInterval(2000L, sendSensorData);
  timer.setInterval(2000L, pollDeviceStateFromSupabase);
}

void loop() {
  Blynk.run();
  timer.run();
}