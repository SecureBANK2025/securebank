#include <Adafruit_Fingerprint.h>
#include <WebServer.h>
#include <Arduino.h>
#include <HardwareSerial.h>
#include <WiFi.h>





HardwareSerial mySerial(2); 


#define PACKET_START_CODE 0xEF01
#define COMMAND_PACKET 0x01
#define DATA_PACKET 0x02
#define UPLOAD_TEMPLATE 0x09
#define STORE_TEMPLATE 0x06

uint32_t sensorAddress = 0xFFFFFFFF; 



const char* ssid = "NoInternet";       
const char* password = "bahy015015"; 


const int serverPort = 80;
WebServer server(serverPort);

Adafruit_Fingerprint finger(&mySerial);

void setup() {
  Serial.begin(115200);                    
  mySerial.begin(57600, SERIAL_8N1, 16, 17);  

  Serial.println("Initializing fingerprint sensor...");

   
  finger.begin(57600);

  
  if (finger.verifyPassword()) {
    Serial.println("Fingerprint sensor initialized successfully!");
  } else {
    Serial.println("Fingerprint sensor initialization failed!");
    while (1) delay(1);  
  }

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  server.begin();
  Serial.println("Server started");
  server.on("/enroll", HTTP_POST, handleEnroll);
  server.on("/verify", HTTP_POST, searchFingerprint);
  server.on("/clear", HTTP_GET, clearAllFingers);
  server.on("/clearOne", HTTP_GET, deleteFingerprint);
}
// *************************************************
void loop() {
  server.handleClient();
}
// *************************************************
void testFunc(){
  Serial.println("Sending fingerprint ID to the client...");
  int id = 5 ;
  server.send(200, "application/json", "{ \"success\": true, \"fingerId\": " + String(id) + " }");
}
//**************************************************

int getNewFingerprintID() {
  for (int id = 1; id < 128; id++) {  // Database size is 128 (0–127)
    if (finger.loadModel(id) != FINGERPRINT_OK) {
      return id; 
    }
  }
  return -1; 
}
//**************************************************

 
void handleEnroll() {
  if (server.method() == HTTP_POST) {

   int id = getNewFingerprintID();  
   
    storeFingerprint(id);
  } else {
    server.send(405, "text/plain", "Method Not Allowed");
  }
}

//***************************************************
void storeFingerprint(int id) {
  if (id == -1) {
    Serial.println("Error: No available ID.");
    server.send(400, "text/plain", "Error: No available ID.");
    return;
  }

  Serial.print("Storing fingerprint at ID: ");
  server.send(200, "application/json", "{ \"success\": true, \"fingerId\": " + String(id) + " }");
  Serial.println(id);
  
  Serial.println("Waiting for the first fingerprint scan...");
  server.send(200, "text/plain", "Waiting for the first fingerprint scan...");
  while (finger.getImage() != FINGERPRINT_OK);   
  if (finger.image2Tz(1) == FINGERPRINT_OK) {
    Serial.println("First fingerprint template created.");
    server.send(200, "text/plain", "First fingerprint template created.");
  } else {
    Serial.println("Failed to create first fingerprint template.");
    server.send(400, "text/plain", "Failed to create first fingerprint template.");
    return ;
  }

  
  Serial.println("Remove your finger and place it again.");
  
  delay(2000);   

  
  Serial.println("Waiting for the second fingerprint scan...");
  
  while (finger.getImage() != FINGERPRINT_OK);   
  if (finger.image2Tz(2) == FINGERPRINT_OK) {
    Serial.println("Second fingerprint template created.");
    
  } else {
    Serial.println("Failed to create second fingerprint template.");
     
    return;
  }

   
  Serial.println("Creating fingerprint model...");
  
  if (finger.createModel() == FINGERPRINT_OK) {
    Serial.println("Fingerprint model created successfully.");
     
  } else {
    Serial.println("Failed to create fingerprint model. Ensure proper scans.");
   
    return;
  }

 
  Serial.println("Storing fingerprint model in database...");
   
  if (finger.storeModel(id) == FINGERPRINT_OK) {
    Serial.print("Fingerprint stored successfully at ID: ");
     server.send(200, "application/json", "{ \"success\": true, \"fingerId\": " + String(id) + " }");
    Serial.println(id);
  } else {
    Serial.println("Failed to store fingerprint model in the database.");
     
  }
}

//***************************************************
void searchFingerprint() {
  // String fileName;
  Serial.println("Searching for the fingerprint...");
  while (finger.getImage() != FINGERPRINT_OK);  // Wait for a valid image
  if (finger.image2Tz(1) == FINGERPRINT_OK) {
    Serial.println("First fingerprint template created.");
  } else {
    Serial.println("Failed to create first fingerprint template.");
    return;
  }

  // Step 2: Wait for the user to remove and place the finger again
  Serial.println("Remove your finger and place it again.");
  delay(2000);  // Give time to remove the finger

  // Step 3: Wait for a valid second fingerprint scan
  Serial.println("Waiting for the second fingerprint scan...");
  while (finger.getImage() != FINGERPRINT_OK);
  // Wait for a valid image
  if (finger.image2Tz(2) == FINGERPRINT_OK) {
    Serial.println("Second fingerprint template created.");
  } else {
    Serial.println("Failed to create second fingerprint template.");
    return;
  }

  // Step 4: Create a fingerprint model
  Serial.println("Creating fingerprint model...");
  if (finger.createModel() == FINGERPRINT_OK) {
    Serial.println("Fingerprint model created successfully.");
  } else {
    Serial.println("Failed to create fingerprint model. Ensure proper scans.");
    return;
  }

  int result = finger.fingerFastSearch();
  if (result == FINGERPRINT_OK) {
    Serial.print("Fingerprint found with ID: ");
    Serial.println(finger.fingerID);
    int id = finger.fingerID;
    server.send(200, "application/json", "{ \"success\": true, \"fingerId\": " + String(id) + " }");
    Serial.print("Confidence: ");
    Serial.println(finger.confidence);
  } else if (result == FINGERPRINT_NOTFOUND) {
    Serial.println("No matching fingerprint found.");
    server.send(400, "application/json", "{ \"Fingerprint Not found 1\"}");
  } else {
    server.send(400, "application/json", "{ \"Fingerprint Not found 2\" }");
  }
}
//***************************************************
void clearAllFingers() {
    uint8_t result = finger.emptyDatabase();
    
    if (result == FINGERPRINT_OK) {
        server.send(200, "application/json","All fingerprints cleared successfully.");
    } else {
        server.send(500, "application/json","Failed to clear fingerprints.");
    }
}
//***************************************************
void deleteFingerprint() {
    if (!server.hasArg("id")) {  // Check if 'id' parameter exists
        server.send(400, "application/json", "{\"status\": \"error\", \"message\": \"Missing 'id' parameter\"}");
        return;
    }

    uint16_t fingerID = server.arg("id").toInt(); // Get ID from API request
    uint8_t result = finger.deleteModel(fingerID);

    String jsonResponse = "{";
    if (result == FINGERPRINT_OK) {
        jsonResponse += "\"status\": \"success\", \"message\": \"Fingerprint deleted successfully.\"";
    } else if (result == FINGERPRINT_PACKETRECIEVEERR) {
        jsonResponse += "\"status\": \"error\", \"message\": \"Communication error with sensor.\"";
    } else if (result == FINGERPRINT_BADLOCATION) {
        jsonResponse += "\"status\": \"error\", \"message\": \"Invalid fingerprint ID.\"";
    } else if (result == FINGERPRINT_FLASHERR) {
        jsonResponse += "\"status\": \"error\", \"message\": \"Failed to delete fingerprint.\"";
    } else {
        jsonResponse += "\"status\": \"error\", \"message\": \"Unknown error occurred.\"";
    }
    jsonResponse += "}";

    server.send(200, "application/json", jsonResponse);
}