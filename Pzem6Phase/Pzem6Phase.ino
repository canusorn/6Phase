/*
  Copyright (c) 2021 Jakub Mandula

  Example of using multiple PZEM modules together on one ModBUS.
  ================================================================

  First of all, use the PZEMChangeAddress example in order to assign
  each individual PZEM module a unique custom address. This example
  requires 2 PZEM modules with addresses 0x10 and 0x11.


  Then for each PZEM module create a PZEM004Tv30 instance passing a custom address
  to the address field.

  The instances can either be stored as individual objects:

  ```c
  PZEM004Tv30 pzem0(&Serial2, 0x10);
  PZEM004Tv30 pzem1(&Serial2, 0x11);
  PZEM004Tv30 pzem2(&Serial2, 0x12);

  pzem0.voltage();
  pzem1.pf();
  ```

  Or in an array and addressed using the array index:

  ```c
  PZEM004Tv30 pzems[] = {
    PZEM004Tv30(&Serial2, 0x10),
    PZEM004Tv30(&Serial2, 0x11),
    PZEM004Tv30(&Serial2, 0x12)};

  pzems[0].voltage();
  pzems[1].pf();
  ```

*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <PZEM004Tv30.h>

#if !defined(PZEM_RX_PIN) && !defined(PZEM_TX_PIN)
#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
#endif

#if !defined(PZEM_SERIAL)
#define PZEM_SERIAL Serial2
#endif

#define NUM_PZEMS 6

PZEM004Tv30 pzems[NUM_PZEMS];

//  -------- ตั้งค่า wifi --------
#ifndef STASSID
#define STASSID "wifi_ssid"
#define STAPSK "wifi_pass"
#endif
String server0 = "192.168.0.100";
String server1 = "192.168.0.101";
String server2 = "192.168.0.102";
const char *ssid = STASSID;
const char *password = STAPSK;
int notConnected = 0;

void setup()
{
  /* Debugging serial */
  Serial.begin(115200);
  Serial.println();
  Serial.println("Booting Sketch...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  // For each PZEM, initialize it
  for (int i = 0; i < NUM_PZEMS; i++)
  {
    // Initialize the PZEMs with Hardware Serial2 on RX/TX pins 16 and 17
    pzems[i] = PZEM004Tv30(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN, 0x01 + i);
  }
}

void loop()
{
  float voltage[6], current[6], power[6], energy[6], frequency[6], pf[6];
  // Print out the measured values from each PZEM module
  for (int i = 0; i < NUM_PZEMS; i++)
  {
    // Print the Address of the PZEM
    Serial.print("PZEM ");
    Serial.print(i);
    Serial.print(" - Address:");
    Serial.println(pzems[i].getAddress(), HEX);
    Serial.println("===================");

    // Read the data from the sensor
    voltage[i] = pzems[i].voltage();
    current[i] = pzems[i].current();
    power[i] = pzems[i].power();
    energy[i] = pzems[i].energy();
    frequency[i] = pzems[i].frequency();
    pf[i] = pzems[i].pf();

    // test data
    //  voltage[i] = 200 + i;
    //  current[i] = 1;
    //  power[i] = voltage[i] * current[i] * 0.84;
    //  energy[i] = 2;
    //  frequency[i] = 50;
    //  pf[i] = 0.84;

    // Check if the data is valid
    if (isnan(voltage[i]))
    {
      Serial.println("Error reading voltage");
    }
    else if (isnan(current[i]))
    {
      Serial.println("Error reading current");
    }
    else if (isnan(power[i]))
    {
      Serial.println("Error reading power");
    }
    else if (isnan(energy[i]))
    {
      Serial.println("Error reading energy");
    }
    else if (isnan(frequency[i]))
    {
      Serial.println("Error reading frequency");
    }
    else if (isnan(pf[i]))
    {
      Serial.println("Error reading power factor");
    }
    else
    {
      // Print the values to the Serial console
      Serial.print("Voltage: ");
      Serial.print(voltage[i]);
      Serial.println("V");
      Serial.print("Current: ");
      Serial.print(current[i]);
      Serial.println("A");
      Serial.print("Power: ");
      Serial.print(power[i]);
      Serial.println("W");
      Serial.print("Energy: ");
      Serial.print(energy[i], 3);
      Serial.println("kWh");
      Serial.print("Frequency: ");
      Serial.print(frequency[i], 1);
      Serial.println("Hz");
      Serial.print("PF: ");
      Serial.println(pf[i]);
    }

    Serial.println("-------------------");
    Serial.println();
  }
  postData(voltage, current, power, energy, frequency, pf);
  Serial.println();
  delay(2000);

  if (notConnected >= 30)
  {
    ESP.restart();
  }
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

    String _json_update = "{\"esp_id\":" + String(chipId) + ",\"data\":{";

    for (uint8_t i = 0; i < 6; i++)
    { // validate
      if (i)
        _json_update += ",";

      //      if (v[i] >= 60 && v[i] <= 260 && !isnan(v[i]))
      _json_update += "\"v" + String(i + 1) + "\":" + String(v[i], 1);
      //      if (a[i] >= 0 && a[i] <= 100 && !isnan(a[i]))
      _json_update += ",\"i" + String(i + 1) + "\":" + String(a[i], 3);
      //      if (p[i] >= 0 && p[i] <= 24000 && !isnan(p[i]))
      _json_update += ",\"p" + String(i + 1) + "\":" + String(p[i], 1);
      //      if (e[i] >= 0 && e[i] <= 10000 && !isnan(e[i]))
      _json_update += ",\"e" + String(i + 1) + "\":" + String(e[i], 3);
      //      if (f[i] >= 40 && f[i] <= 70 && !isnan(f[i]))
      _json_update += ",\"f" + String(i + 1) + "\":" + String(f[i], 1);
      //      if (pf[i] >= 0 && pf[i] <= 1 && !isnan(pf[i]))
      _json_update += ",\"pf" + String(i + 1) + "\":" + String(pf[i], 2);
    }

    _json_update += "}}";

    Serial.println("payload:" + _json_update);

    HTTPClient http;

    for (int s = 0; s < 3; s++)
    {

      String server;
      if (s == 0)
      {
        server = server0;
      }
      else if (s == 1)
      {
        server = server1;
      }
      else if (s == 2)
      {
        server = server2;
      }

      Serial.print("[HTTP] begin...\n");
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
          notConnected = 0;
        }
        else
        {
          notConnected++;
        }
      }
      else
      {
        Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
    }

    http.end();
  }
  else
  {
    Serial.println("Reconnecting to WiFi...");
    WiFi.disconnect();
    WiFi.reconnect();
    notConnected+=10;
    delay(10000);
  }
}