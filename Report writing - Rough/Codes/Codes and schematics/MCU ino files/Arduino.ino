#include "Dimmer.h"
#include <ArduinoJson.h>

#include "EmonLib.h" 
//#include <AltSoftSerial.h>

#define mySerial Serial
//AltSoftSerial mySerial; // RX=8, TX=9

long unsigned int   previousMillis=0;

////////////json//////////////////
 String rawTxt;
 String powerJson;
 unsigned int slider1=0;
 unsigned int slider2=0;
 unsigned int slider3=0;
 bool button1 = false;
 bool button2 = false;
 bool button3 = false;

  
////////////Dimmer///////////////

Dimmer dimmers[] = {
  Dimmer(4, DIMMER_RAMP, .1),
  Dimmer(5, DIMMER_RAMP, .1),
  Dimmer(6, DIMMER_RAMP, .1),
};

EnergyMonitor emon;  

void jsonParsing(){
 StaticJsonBuffer<200> jsonBuffer;
 JsonObject& sw = jsonBuffer.parseObject(rawTxt);

if (sw.success())
{
 slider1=sw["S1"];
 slider2=sw["S2"];
 slider3=sw["S3"];
 button1 = sw["B1"];
 button2 = sw["B2"];
 button3 = sw["B3"];
}
 

/*Serial.print(slider1);
Serial.print("\t");
Serial.print(slider2);
Serial.print("\t");
Serial.print(slider3);
Serial.print("\t");
Serial.print(button1);
Serial.print("\t");
Serial.print(button2);
Serial.print("\t");
Serial.print(button3);
Serial.println("");
*/
}

void jsonEncoding(){
 StaticJsonBuffer<200> jsonBuffer;
 JsonObject& power = jsonBuffer.createObject();
 power["TruePower"]=emon.realPower;
 power["ApparentPower"]=emon.apparentPower;
 power["Frequency"]=50;
 power["PowerFactor"]=emon.powerFactor;
 power["Vrms"]=emon.Vrms;
 power["Irms"]=emon.Irms;

 if (millis()-previousMillis>1000){
 
  power.printTo(mySerial);
  mySerial.println();
  previousMillis=millis();
 
 }
 
}

void setup() {

  emon.voltage(A1, 395, 1.7);  // Voltage: input pin, calibration, phase_shift
  emon.current(A0, 3.75);
  
  
  // Open serial communications and wait for port to open:
  Serial.begin(38400);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }


  //Serial.println("Goodnight moon!");

  // set the data rate for the SoftwareSerial port
 // mySerial.println("Hello, world?");

  for(int i = 0; i < sizeof(dimmers) / sizeof(Dimmer); i++) {
    dimmers[i].begin();
  }
}

void loop() { // run over and over

  emon.calcVI(50,20);
  jsonEncoding();
  /*mySerial.print(emon.realPower);
  mySerial.print("\t\t");
  mySerial.print(emon.apparentPower);
  mySerial.print("\t\t");
  mySerial.print(emon.apparentPower*sin(acos(emon.powerFactor)));
  mySerial.print("\t\t");
  mySerial.print(emon.powerFactor);
  mySerial.print("\t\t");
  mySerial.print(emon.Vrms);
  mySerial.print("\t\t");
  mySerial.println(emon.Irms);
  */
  if (mySerial.available()) {
    rawTxt = mySerial.readStringUntil('\n');
    //Serial.println(rawTxt);

    jsonParsing();
  }

   if(button1) dimmers[0].set(slider1);
    else dimmers[0].set(0);

   if(button2) dimmers[1].set(slider2);
    else dimmers[1].set(0);

   if(button3) dimmers[2].set(slider3);
    else dimmers[2].set(0);
}

