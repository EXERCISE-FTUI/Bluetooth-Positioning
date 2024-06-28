// useBLE.js
import { useEffect, useMemo, useState } from "react";
import {
  BleManager,
  Device as BLEDevice,
  State,
  ScanMode,
} from "react-native-ble-plx";
import { deviceNames } from "../constants";

interface DeviceWithTimestamp extends BLEDevice {
  lastSeen: number;
}

function useBLE() {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<DeviceWithTimestamp[]>([]);

  const SCAN_INTERVAL = 5000; // Cleanup interval in milliseconds
  const DEVICE_TIMEOUT = 500; // Device timeout in milliseconds

  const scanForPeripherals = async () => {
    const state = await bleManager.state();
    if (state !== State.PoweredOn) return;

    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        scanMode: ScanMode.Balanced,
      },
      (error, device) => {
        if (error) {
          console.log("Scan Error:", JSON.stringify(error));
          return;
        }

        if (device && deviceNames.includes(device.name as string)) {
          const currentTime = Date.now();

          setAllDevices((prevDevices: any) => {
            const updatedDevices = prevDevices.map((d: any) =>
              d.id === device.id ? { ...device, lastSeen: currentTime } : d
            );

            // Add the device if it doesn't already exist
            if (!updatedDevices.some((d: any) => d.id === device.id)) {
              updatedDevices.push({ ...device, lastSeen: currentTime });
            }

            return updatedDevices;
          });
        }
      }
    );

    // Cleanup function to stop scanning
    return () => {
      bleManager.stopDeviceScan();
    };
  };

  useEffect(() => {
    const cleanup = async () => {
      const stopScan = await scanForPeripherals();

      // Periodic cleanup of outdated devices
      const intervalId = setInterval(() => {
        setAllDevices((prevDevices) =>
          prevDevices.filter(
            (device) => Date.now() - device.lastSeen < DEVICE_TIMEOUT
          )
        );
      }, SCAN_INTERVAL);

      return () => {
        stopScan?.();
        clearInterval(intervalId);
      };
    };

    cleanup();

    // Cleanup on unmount
    return () => {
      bleManager.stopDeviceScan();
    };
  }, []);

  return { allDevices };
}

export default useBLE;
