// useLocationServices.js
import { useEffect, useState } from "react";
import { Alert, Platform, Linking } from "react-native";
import Geolocation from "react-native-geolocation-service";
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from "react-native-permissions";

function useLocationServices() {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  const checkLocationServices = async () => {
    if (Platform.OS === "ios") {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (status === RESULTS.GRANTED) {
        setIsLocationEnabled(true);
      } else {
        const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (permission !== RESULTS.GRANTED) {
          Alert.alert(
            "Enable Location Services",
            "Location services are required to scan for Bluetooth devices. Please enable them in the settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
        }
      }
    } else {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          () => setIsLocationEnabled(true),
          () => setIsLocationEnabled(false),
          { enableHighAccuracy: true }
        );
      } else {
        const permission = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        if (permission !== RESULTS.GRANTED) {
          Alert.alert(
            "Enable Location Services",
            "Location services are required to scan for Bluetooth devices. Please enable them in the settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => Linking.openSettings(),
              },
            ]
          );
        } else {
          Geolocation.getCurrentPosition(
            () => setIsLocationEnabled(true),
            () => setIsLocationEnabled(false),
            { enableHighAccuracy: true }
          );
        }
      }
    }
  };

  useEffect(() => {
    checkLocationServices();
  }, []);

  return { isLocationEnabled, checkLocationServices };
}

export default useLocationServices;
