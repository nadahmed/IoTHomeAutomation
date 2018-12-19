
#include "ESP8266.h"
#include <SoftwareSerial.h>

SoftwareSerial esp(11,10);

#define SSID        "Why Fly?"
#define PASSWORD    "internet90"
#define HOST_NAME   "192.168.2.101"
#define HOST_PORT   (2293)
uint32_t port=8090;

ESP8266 wifi(esp);

/////////////////////////////INITIALIZATION/////////////////////////
uint8_t buffer[128] = {0};
static uint8_t mux_id;
   
void setup() {

///////////////////ESTABLISHING ARDUINO ESP INTERFACE//////////////
  Serial.begin(9600);
  while(!Serial){
    ;
      }

  esp.begin(9600);
  Serial.println("ESP8266 Connected");

////////////////CONNECTING TO WIFI/////////////////////////

  Serial.print("setup begin\r\n");

  Serial.print("FW Version: ");
  Serial.println(wifi.getVersion().c_str());
    
    
  if (wifi.setOprToStation()) {
        Serial.print("to station ok\r\n");
    } else {
        Serial.print("to station err\r\n");
    }

  if (wifi.joinAP(SSID, PASSWORD)) {
        Serial.print("Join AP success\r\n");
        Serial.print("IP: ");       
        Serial.println(wifi.getLocalIP().c_str());
    } else {
        Serial.print("Join AP failure\r\n");
    }
////////////////////ESTABLISHING TCP SERVER/////////////////////
    if (wifi.enableMUX()) {
        Serial.print("multiple ok\r\n");
    } else {
        Serial.print("multiple err\r\n");
    }
    
    if (wifi.startTCPServer(port)) {
        Serial.print("start tcp server ok\r\n");
        Serial.print("Port= ");
        Serial.println(port);
    } else {
        Serial.print("start tcp server err\r\n");
    }
    
    if (wifi.setTCPServerTimeout(100)) { 
        Serial.print("set tcp server timout 10 seconds\r\n");
    } else {
        Serial.print("set tcp server timout err\r\n");
    }


}

void loop() {
  String a=TCPRecieveData();
  String x= "THIS IS A TEST";
  if (a.length()>0){
  Serial.println(a);

     TCPSend(x);
  }

/*if (Serial.available()){
//  String ser=Serial.readString();
//  int ser_len=ser.length()-1;
//  char charBuff[ser_len];
//  ser.toCharArray(charBuff,ser_len);
//  Serial.println(charBuff);
  if (wifi.createTCP(mux_id, HOST_NAME, HOST_PORT)) {
        Serial.print("create tcp ok\r\n");
    } else {
        Serial.print("create tcp err\r\n");
    }
    
    char *charBuff = "Hello, this is client!";
//    if (wifi.send(mux_id, (const uint8_t*)charBuff, ser_len)) {
    if (wifi.send(mux_id, (const uint8_t*)charBuff, strlen(charBuff))) {
        Serial.println("send ok");
    } else {
        Serial.println("send err");
    }
    delay(5000);
  
}*/



  
 
    
  /*  uint32_t len = wifi.recv(&mux_id, buffer, sizeof(buffer), 100);
    if (len > 0) {
        Serial.print("Status:[");
        Serial.print(wifi.getIPStatus().c_str());
        Serial.println("]");
        
        Serial.print("Received from :");
        Serial.print(mux_id);
        Serial.print("[");
        for(uint32_t i = 0; i < len; i++) {
            Serial.print((char)buffer[i]);
        }
        Serial.print("]\r\n");
        
        if(wifi.send(mux_id, buffer, len)) {
            Serial.print("send back ok\r\n");
        } else {
            Serial.print("send back err\r\n");
        }
        
        if (wifi.releaseTCP(mux_id)) {
            Serial.print("release tcp ");
            Serial.print(mux_id);
            Serial.println(" ok");
        } else {
            Serial.print("release tcp");
            Serial.print(mux_id);
            Serial.println(" err");
        }
        
        Serial.print("Status:[");
        Serial.print(wifi.getIPStatus().c_str());
        Serial.println("]");
    }
*/

}

void TCPSend (String a){
    //char*charBuff;
    int ser_len=a.length()+1;
    char charBuff[ser_len];
    a.toCharArray(charBuff,ser_len);
    //char*charBuff = "Hello, this is client!";
    if (wifi.send(mux_id, (const uint8_t*)charBuff, strlen(charBuff))) {
        Serial.println("send ok");
    } else {
        Serial.println("send err");
    }
}

String TCPRecieveData(){
  String c="";
    uint32_t len = wifi.recv(&mux_id, buffer, sizeof(buffer), 100);
    if (len > 0) {
        //Serial.print("Status:[");
        //Serial.print(wifi.getIPStatus().c_str());
        //Serial.println("]");
        
        //Serial.print("Received from :");
        //Serial.print(mux_id);
        //Serial.print("[");
        for(uint32_t i = 0; i < len; i++) {
            c=c+(char)buffer[i];
            
        }
        //Serial.print("]\r\n");
        return c;
    }
}

