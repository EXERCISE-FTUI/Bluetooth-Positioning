#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

String receivedValue;

/**
 * @brief Callback class for handling characteristic write events.
 *
 * This class inherits from BLECharacteristicCallbacks and overrides the onWrite method
 * to handle events when a new value is written to the characteristic.
 */
class MyCallbacks : public BLECharacteristicCallbacks
{
  /**
   * @brief Called when a client writes a new value to the characteristic.
   *
   * @param pCharacteristic Pointer to the characteristic being written to.
   */
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    String value = pCharacteristic->getValue();

    if (value.length() > 0)
    {
      receivedValue = "";
      Serial.println("*********");
      Serial.print("New value: ");
      for (int i = 0; i < value.length(); i++)
      {
        Serial.print(value[i]);
        receivedValue += value[i];
      }

      Serial.println();
      Serial.println("*********");
    }
  }
};

/**
 * @brief Callback class for handling server connection events.
 * 
 * This class inherits from BLEServerCallbacks and overrides the onConnect method
 * to handle events when a client connects to the server.
 */
class MyServerCallbacks : public BLEServerCallbacks
{
  /**
   * @brief Called when a client connects to the server.
   * 
   * @param pServer Pointer to the BLE server.
  */
  void onConnect(BLEServer *pServer)
  {
    BLEDevice::startAdvertising();
    Serial.println("Connected to BLE client");
  };
};

/**
 * @brief Setup function for initializing BLE server and services.
 * 
 * This function initializes the BLE device, creates a server, a service,
 * and a characteristic, and starts advertising the BLE device.
 */
void setup()
{
  Serial.begin(115200);

  BLEDevice::init("A");     // Use Your Desired Beacon Name (1A, 1B, 2A, 2B, etc)
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  BLECharacteristic *pCharacteristic =
      pService->createCharacteristic(CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

  pCharacteristic->setCallbacks(new MyCallbacks());

  pService->start();

  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->start();
}

/**
 * @brief Loop function for handling dynamic device name changes.
 * 
 * This function checks if a new value has been written to the characteristic.
 * If a new value is received, it stops advertising, reinitializes the BLE device
 * with the new name, and starts advertising again.
 */
void loop()
{

  if (receivedValue != "")
  {

    BLEDevice::stopAdvertising();

    BLEDevice::deinit();

    BLEDevice::init(receivedValue);
    BLEServer *pServer = BLEDevice::createServer();
    pServer->setCallbacks(new MyServerCallbacks());

    BLEService *pService = pServer->createService(SERVICE_UUID);

    BLECharacteristic *pCharacteristic =
        pService->createCharacteristic(CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

    pCharacteristic->setCallbacks(new MyCallbacks());

    pService->start();

    BLEAdvertising *pAdvertising = pServer->getAdvertising();
    pAdvertising->start();

    receivedValue = "";

    delay(1000);
  }
}