import { useMemo, useState, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Device as BLEDevice,
} from "react-native-ble-plx";
import BluetoothClassic, { BluetoothDevice as ClassicDevice } from 'react-native-bluetooth-classic';
import * as ExpoDevice from "expo-device";

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  scanForClassicDevices(): Promise<void>;
  connectToDevice: (deviceId: BLEDevice) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: BLEDevice | null;
  allDevices: any[];
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<(BLEDevice | ClassicDevice)[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BLEDevice | null>(null);

  useEffect(() => {
    return () => {
      bleManager.stopDeviceScan();
    };
  }, [bleManager]);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: (BLEDevice | ClassicDevice)[], nextDevice: BLEDevice | ClassicDevice) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan Error:', error);
        return;
      }
      if (device) {
        setAllDevices((prevState) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const scanForClassicDevices = async () => {
    try {
      const devices = await BluetoothClassic.startDiscovery();
      setAllDevices((prevState) => {
        const newDevices = devices.filter(device => !isDuplicateDevice(prevState, device));
        return [...prevState, ...newDevices];
      });
    } catch (error) {
      console.log('Classic Scan Error:', error);
    }
  };

  const connectToDevice = async (device: BLEDevice) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    scanForClassicDevices,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
  };
}

export default useBLE;
