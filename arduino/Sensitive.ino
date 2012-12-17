#include <LiquidCrystal.h>
#include <LCDKeypad.h>

LCDKeypad lcd;

String inputString = "";  
boolean stringComplete = false;

String events[] = { "location", "motion", "orientation", "compass" };
int currentEvent = 0;

void setup() {
  
  Serial.begin(57600);
  inputString.reserve(200);
  
  lcd.begin(16, 2);
  lcd.clear();
  lcd.print(events[currentEvent]); 
  lcd.setCursor(0, 0);
}

void loop() {

  int buttonPressed = lcd.button();
  
  if(buttonPressed == KEYPAD_DOWN && currentEvent < 3) {
    currentEvent++;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(events[currentEvent]); 
    delay(300);
  } 
  else if(buttonPressed == KEYPAD_UP && currentEvent > 0) {
    currentEvent--;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(events[currentEvent]); 
    delay(300);
  } 
  
  if(stringComplete && watch(events[currentEvent])) {   
    
    int delimiter = inputString.indexOf(",");
    
    String firstLine = inputString.substring(0, delimiter);
    String secondLine = inputString.substring(delimiter + 1, inputString.length() - 1);
    
    lcd.setCursor(0, 0);
    lcd.print(firstLine + "      "); 
    
    lcd.setCursor(0, 1);
    lcd.print(secondLine + "      ");    
    
    inputString = "";
    stringComplete = false;
  }
  
  
}

void waitReleaseButton() {
  delay(50);
  while(lcd.button() != KEYPAD_NONE) {}
  delay(50);
}

boolean watch(String event) {

  if(inputString.startsWith(event + ".")) {
    inputString.replace(event + ".", "");
    return true;
  }
    
  return false;  
}

void serialEvent() {
  while (Serial.available()) {

    char inChar = (char) Serial.read(); 

    if(inChar == '\n') {
      stringComplete = true;      
    } 
    else {
      inputString += inChar;
    }
    
  }
}

