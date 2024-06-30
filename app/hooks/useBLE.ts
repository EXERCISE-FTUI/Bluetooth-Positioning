import { useEffect, useMemo, useState } from "react";
import {
  BleManager,
  ScanMode,
  ScanOptions,
  BleError,
  Device,
} from "react-native-ble-plx";

import { DEVICE_NAMES, DEVICE_TIMEOUT, SCAN_INTERVAL } from "../constants";
import { BLEDevice } from "../types";

import usePermissions from "./usePermissions";

function useBLE() {
  const manager = useMemo(() => new BleManager(), []);

  const [scannedDevices, setScannedDevices] = useState<BLEDevice[]>([]);

  const scanOptions: ScanOptions = {
    allowDuplicates: false,
    scanMode: ScanMode.Balanced,
  };

  /**
   * This function will scan all BLE devices with the same name as in {@link DEVICE_NAMES}
   * and will be executed continuously as long as the {@link manager.startDeviceScan()}
   * in {@link startBLEDeviceScan()} is running.
   *
   * This function will update all BLE properites (RSSI, NAME, etc.) for every
   * previously scanned devices in {@link scannedDevices} and also
   * keeping track the last time a device is scanned.
   *
   * @param error - The error object, if any.
   * @param device - The scanned BLE device, if available.
   *
   * @see {@link DEVICE_NAMES}, {@link BLEDevice}
   */
  const scanCallback = (error: BleError | null, device: Device | null) => {
    if (error) {
      console.log("Scan Error:", JSON.stringify(error));
      return;
    }

    // If device is available and is known device
    if (device && DEVICE_NAMES.includes(device.name as string)) {
      // Track current time.
      const currentTime = Date.now();

      console.log(device.name);

      setScannedDevices((prevDevices) => {
        /***** Updating already scanned device (old devices)
         * If the old scanned device is scanned again, meaning its still in range
         *    then update all of its properties and lastSeen
         * If NOT
         *    then just return the old scanned device without any changes
         */
        const updatedDevices: BLEDevice[] = prevDevices.map((d: BLEDevice) =>
          d.id === device.id
            ? ({ ...device, lastSeen: currentTime } as BLEDevice)
            : d
        );

        // Add new scanned device
        if (!updatedDevices.some((d: BLEDevice) => d.id === device.id)) {
          updatedDevices.push({
            ...device,
            lastSeen: currentTime,
          } as BLEDevice);
        }

        return updatedDevices;
      });
    }
  };

  const startBLEDeviceScan = async ({ ...scanOptions }: ScanOptions) => {
    // Check if bluetooth is activated
    // const { bluetoothActivated, checkBluetooth } = usePermissions();

    // console.log("KONTOL");

    // if (!bluetoothActivated) {
    //   await checkBluetooth();
    //   return;
    // }

    // console.log("KONTOL 2");

    // Scanning BLE devices
    manager.startDeviceScan(null, scanOptions, scanCallback);
  };

  const startScanning = async () => {
    await startBLEDeviceScan(scanOptions);

    // Periodic cleanup of outdated devices
    const interval = setInterval(() => {
      setScannedDevices((prevDevices) =>
        prevDevices.filter(
          (device) => Date.now() - device.lastSeen < DEVICE_TIMEOUT
        )
      );
    }, SCAN_INTERVAL);

    // Cleanup function
    return () => {
      // Stop device scanning so its not bloated
      manager.stopDeviceScan();
      // necessary setInterval() cleaning
      clearInterval(interval);
    };
  };

  useEffect(() => {
    startScanning();

    // Cleanup on unmount
    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  return { scannedDevices, manager, startScanning };
}

export default useBLE;
