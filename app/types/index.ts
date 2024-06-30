import { Device } from "react-native-ble-plx";

export interface BLEDevice extends Device {
  lastSeen: number;
}
