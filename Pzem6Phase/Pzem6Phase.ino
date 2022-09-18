
#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <HTTPUpdateServer.h>
#include <PZEM004Tv30.h>

#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
#define PZEM_SERIAL Serial2

//  -------- ตั้งค่า wifi --------
#ifndef STASSID
#define STASSID "wifi_ssid"
#define STAPSK "wifi_pass"
#endif
String server = "192.168.0.101";
const char *host = "6phase";
const char *ssid = STASSID;
const char *password = STAPSK;

WebServer httpServer(80);
HTTPUpdateServer httpUpdater;

unsigned long previousMillis = 0;

void setup()
{
  /* Debugging serial */
  Serial.begin(115200);
  Serial.println();
  Serial.println("Booting Sketch...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.waitForConnectResult() != WL_CONNECTED)
  {
    WiFi.begin(ssid, password);
    Serial.println("WiFi failed, retrying.");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  MDNS.begin(host);
  if (MDNS.begin(host))
  {
    Serial.println("mDNS responder started");
  }

  httpUpdater.setup(&httpServer);
  httpServer.begin();

  MDNS.addService("http", "tcp", 80);
  Serial.printf("HTTPUpdateServer ready! Open http://%s.local/update in your browser\n", host);
}

void loop()
{
  httpServer.handleClient();

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= 2000)
  {
    previousMillis = currentMillis;
    readValue();
    Serial.println();
  }
}

void readValue()
{

  PZEM004Tv30 pzems[] = {PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x01), PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x02), PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x03), PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x04), PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x05), PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x06)}; // array of pzem 3 phase
  float voltage[6], current[6], power[6], energy[6], frequency[6], pf[6];

  for (int i = 0; i < 6; i++)
  {
    //------read data------
    voltage[i] = pzems[i].voltage();
    if (!isnan(voltage[i]))
    { // ถ้าอ่านค่าได้
      current[i] = pzems[i].current();
      power[i] = pzems[i].power();
      energy[i] = pzems[i].energy();
      frequency[i] = pzems[i].frequency();
      pf[i] = pzems[i].pf();
    }
    else
    { // ถ้าอ่านค่าไม่ได้ให้ใส่ค่า NAN(not a number)
      current[i] = NAN;
      power[i] = NAN;
      energy[i] = NAN;
      frequency[i] = NAN;
      pf[i] = NAN;
    }

    //------Serial display------
    Serial.print(F("PZEM "));
    Serial.print(i);
    Serial.print(F(" - Address:"));
    Serial.println(pzems[i].getAddress(), HEX);
    Serial.println(F("==================="));
    if (!isnan(voltage[i]))
    {
      Serial.print(F("Voltage: "));
      Serial.print(voltage[i]);
      Serial.println("V");
      Serial.print(F("Current: "));
      Serial.print(current[i]);
      Serial.println(F("A"));
      Serial.print(F("Power: "));
      Serial.print(power[i]);
      Serial.println(F("W"));
      Serial.print(F("Energy: "));
      Serial.print(energy[i], 3);
      Serial.println(F("kWh"));
      Serial.print(F("Frequency: "));
      Serial.print(frequency[i], 1);
      Serial.println(F("Hz"));
      Serial.print(F("PF: "));
      Serial.println(pf[i]);
    }
    else
    {
      Serial.println("No sensor detect");
    }
    Serial.println(F("-------------------"));
    Serial.println();
  }

  postData(voltage, current, power, energy, frequency, pf);
}

void postData(float v[6], float a[6], float p[6], float e[6], float f[6], float pf[6])
{

  if ((WiFi.status() == WL_CONNECTED))
  {
    uint32_t chipId = 0;
    for (int i = 0; i < 17; i = i + 8)
    {
      chipId |= ((ESP.getEfuseMac() >> (40 - i)) & 0xff) << i;
    }

    String _json_update = "{\"esp_id\":" + String(chipId) + ",\"data\":";

    for (uint8_t i = 0; i < 6; i++)
    {
      { // validate
        if (v[i] >= 60 && v[i] <= 260 && !isnan(v[i]))
          _json_update += ",\"v" + String(i + 1) + "\":" + String(v[i], 1);
        if (a[i] >= 0 && a[i] <= 100 && !isnan(a[i]))
          _json_update += ",\"i" + String(i + 1) + "\":" + String(a[i], 3);
        if (p[i] >= 0 && p[i] <= 24000 && !isnan(p[i]))
          _json_update += ",\"p" + String(i + 1) + "\":" + String(p[i], 1);
        if (e[i] >= 0 && e[i] <= 10000 && !isnan(e[i]))
          _json_update += ",\"e" + String(i + 1) + "\":" + String(e[i], 3);
        if (f[i] >= 40 && f[i] <= 70 && !isnan(f[i]))
          _json_update += ",\"f" + String(i + 1) + "\":" + String(f[i], 1);
        if (pf[i] >= 0 && pf[i] <= 1 && !isnan(pf[i]))
          _json_update += ",\"pf" + String(i + 1) + "\":" + String(pf[i], 2);
      }

      _json_update += "}}";

      HTTPClient http;

      Serial.print("[HTTP] begin...\n");
      // configure traged server and url
      // http.begin("https://www.howsmyssl.com/a/check", ca); //HTTPS
      http.begin("http://" + server + "/api/update.php"); // HTTP

      Serial.print("[HTTP] POST...\n");
      // start connection and send HTTP header
      int httpCode = http.POST(_json_update);

      // httpCode will be negative on error
      if (httpCode > 0)
      {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] POST... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK)
        {
          String payload = http.getString();
          Serial.println(payload);
        }
      }
      else
      {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    }
  }
}