/*
  Copyright (c) 2021 Jakub Mandula

  Example of using one PZEM module with Software Serial interface.
  ================================================================

  If only RX and TX pins are passed to the constructor, software
  serial interface will be used for communication with the module.

*/


#include <PZEM004Tv30.h>

#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
#define PZEM_SERIAL Serial2

void setup() {
  /* Debugging serial */
  Serial.begin(115200);
}

void loop() {



  Serial.println();
  delay(2000);
  displayValue();
}


void displayValue()
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

}
