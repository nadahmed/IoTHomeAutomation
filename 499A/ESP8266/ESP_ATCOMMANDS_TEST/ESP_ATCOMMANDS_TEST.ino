#include <SoftwareSerial.h>

SoftwareSerial esp(11,10);

void setup() {
  Serial.begin(9600);
  while(!Serial){
    ;
      }

  esp.begin(9600);
  Serial.println("ESP8266 Connected");
}

void loop() {
  if(esp.available()){
    Serial.write(esp.read());
  }

  if (Serial.available()){
    esp.write(Serial.read());
  }

}
