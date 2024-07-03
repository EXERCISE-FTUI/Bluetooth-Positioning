import { PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleManager, State } from "react-native-ble-plx";
import {
  PERMISSIONS,
  checkMultiple,
  openSettings,
} from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

function usePermissions() {
  const [bluetoothGranted, setBluetoothGranted] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [bluetoothActivated, setBluetoothActivated] = useState(false);
  const [locationActivated, setLocationActivated] = useState(false);

  const manager = new BleManager();

  const requestBluetoothAndLocation = async () => {
    if (bluetoothGranted && locationGranted) return;

    if (Platform.OS === "android") {
      const status = await PermissionsAndroid.requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (
        status["android.permission.BLUETOOTH_SCAN"] ===
          PermissionStatus.GRANTED &&
        status["android.permission.BLUETOOTH_CONNECT"] ===
          PermissionStatus.GRANTED
      )
        setBluetoothGranted(true);
      else setBluetoothGranted(false);

      if (
        status["android.permission.ACCESS_FINE_LOCATION"] ===
        PermissionStatus.GRANTED
      )
        setLocationGranted(true);
      else setLocationGranted(false);

      return bluetoothGranted && locationGranted;
    } else if (Platform.OS === "ios") {
      const status = await checkMultiple([
        PERMISSIONS.IOS.BLUETOOTH,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
      ]);

      if (status["ios.permission.BLUETOOTH"] === PermissionStatus.GRANTED)
        setBluetoothGranted(true);
      else setBluetoothGranted(false);

      if (status["ios.permission.LOCATION_ALWAYS"] === PermissionStatus.GRANTED)
        setLocationGranted(true);
      else setLocationGranted(false);

      return bluetoothGranted && locationGranted;
    }
  };

  const checkBluetooth = async () => {
    const state = await manager.state();

    if (state !== State.PoweredOn) {
      setBluetoothActivated(false);

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
      setBluetoothActivated(true);
    }
  };

  const checkLocation = async () => {
    Geolocation.getCurrentPosition(
      () => setLocationActivated(true),
      () => setLocationActivated(false),
      { enableHighAccuracy: true }
    );
  };

  return {
    bluetoothActivated,
    locationActivated,
    checkBluetooth,
    checkLocation,
    bluetoothGranted,
    locationGranted,
    requestBluetoothAndLocation,
  };
}

export default usePermissions;
