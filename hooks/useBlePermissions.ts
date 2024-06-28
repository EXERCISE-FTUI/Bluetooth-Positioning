// useBLEPermissions.js
import { useEffect, useState } from "react";
import { Platform, Alert, Linking, PermissionsAndroid } from "react-native";
import { BleManager, State } from "react-native-ble-plx";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";
import useLocationServices from "./useLocationServices";

function useBLEPermissions() {
  const [isBluetoothEnabled, setBluetoothEnabled] = useState(false);
  const { isLocationEnabled, checkLocationServices } = useLocationServices();

  const bleManager = new BleManager();

  const requestBluetooth = async () => {
    const status = await PermissionsAndroid.request(
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED)
      setBluetoothEnabled(true);
    else setBluetoothEnabled(false);
  };

  const checkBluetooth = async () => {
    const state = await bleManager.state();
    if (state !== State.PoweredOn) {
      Alert.alert(
        "Enable Bluetooth",
        "Bluetooth is required to scan for devices. Please enable Bluetooth.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => openSettings(),
          },
        ]
      );
    } else {
      setBluetoothEnabled(true);
    }
  };

  const checkPermissions = async () => {
    await requestBluetooth();
    await checkBluetooth();
    await checkLocationServices();
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return { isBluetoothEnabled, isLocationEnabled };
}

export default useBLEPermissions;
