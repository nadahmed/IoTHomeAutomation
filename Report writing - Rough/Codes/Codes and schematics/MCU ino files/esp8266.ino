/*
 * WebSocketClient.ino
 *
 *  Created on: 24.05.2015
 *
 */
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <WebSocketsClient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
WebSocketsClient switches;
WebSocketsClient charts;

#define USE_SERIAL Serial

////////////json//////////////////
String rawTxt="{\"TruePower\":0,\"ApparentPower\":0,\"Frequency\":0,\"PowerFactor\":0,\"Vrms\":0,\"Irms\":0}";

long unsigned int thisTime;

void switchesEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      USE_SERIAL.printf("[WSc] Switches Disconnected!\n");
      break;
    case WStype_CONNECTED: {
     switches.sendTXT("Connected to Switches");
    }
      break;
    case WStype_TEXT:
      USE_SERIAL.println((char*)payload);
      

      // send message to server
      // webSocket.sendTXT("message here");
      break;
    case WStype_BIN:
      USE_SERIAL.printf("[WSc] get binary length: %u\n", length);
      hexdump(payload, length);

      // send data to server
      // webSocket.sendBIN(payload, length);
      break;
  }

}

void chartsEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      USE_SERIAL.printf("[WSc] Charts Disconnected!\n");
      break;
    case WStype_CONNECTED: {
      //USE_SERIAL.printf("%s\n", payload);

      // send message to server when Connected
      charts.sendTXT("Connected to Charts");
    }
      break;
    case WStype_TEXT:
      //USE_SERIAL.println((char*)payload);

      
     charts.sendTXT(rawTxt);

   

      // send message to server
      // webSocket.sendTXT("message here");
      break;
    case WStype_BIN:
      USE_SERIAL.printf("[WSc] get binary length: %u\n", length);
      hexdump(payload, length);

      // send data to server
      // webSocket.sendBIN(payload, length);
      break;
  }

}

void setup() {
  // USE_SERIAL.begin(115200);
  USE_SERIAL.begin(38400);

  //Serial.setDebugOutput(true);
  //USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for(uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

//  WiFiMulti.addAP("Why Fly?", "internet90");
  WiFiMulti.addAP("FLIP IO", "capstone2017");

  //WiFi.disconnect();
  while(WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  // server address, port and URL
  switches.begin("192.168.43.49", 80, "/switches/");
  charts.begin("192.168.43.49", 80, "/charts/");

//  switches.begin("192.168.2.102", 80, "/switches/");
//  charts.begin("192.168.2.102", 80, "/charts/");


  // event handler
  switches.onEvent(switchesEvent);
  charts.onEvent(chartsEvent);

  // use HTTP Basic Authorization this is optional remove if not needed
  //switches.setAuthorization("user", "Password");
  //charts.setAuthorization("user", "Password");

  // try ever 5000 again if connection has failed
  switches.setReconnectInterval(5000);
  charts.setReconnectInterval(5000);
  thisTime=millis();
}

void loop() {
  switches.loop();
    

  
/*      if(millis()-thisTime <= 2000){
    
  }
  else{
      charts.loop();
    thisTime=millis();
  }
*/
    if (USE_SERIAL.available())
    {
        char recieved = USE_SERIAL.read();
        if (recieved == '\n')
        {
          charts.loop();
          rawTxt = "";
        }
        else  rawTxt += recieved;
        }
    
}
