import { useState } from "react";

import * as Location from "expo-location";

import { BLEDevice } from "../types";
import { MAP_STYLES, LEVELED_DEVICE_NAMES as deviceNames } from "../constants";

/**
 * Custom hook for floor prediction based on BLE device signals.
 *
 * This hook takes an array of BLE devices and provides floor prediction related state and functions.
 * It calculates the floor based on the received RSSI (Received Signal Strength Indicator) values from the devices.
 * The floor prediction is determined by finding the device with the highest RSSI value and mapping it to a specific floor.
 *
 * @param devices - An array of BLE devices.
 * @returns An object containing floor prediction related state and functions.
 */
function useLocationPrediction(devices: BLEDevice[]) {
  const [mapStyle, setMapStyle] = useState(MAP_STYLES[0]);
  const [floor, setFloor] = useState(0);

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const getLocation = async () => {
    const position = await Location.getCurrentPositionAsync({
      accuracy: 6,
    });
    if (
      (Math.abs(position.coords.latitude - location.latitude) < 0.0001 &&
        Math.abs(position.coords.longitude - location.longitude) < 0.0001) ||
      location.latitude === 0 ||
      location.longitude === 0
    ) {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(newLocation);
    }
  };

  const calculateFloor = () => {
    let rssiTotal: number[] = new Array(deviceNames.length).fill(0);

    for (let i = 0; i < devices.length; i++) {
      for (let j = 0; j < deviceNames.length; j++) {
        if (
          devices[i].name === deviceNames[j][0] ||
          devices[i].name === deviceNames[j][1]
        )
          rssiTotal[j] -= 1 / Number(devices[i].rssi);
      }
    }

    setFloor(rssiTotal.indexOf(Math.max(...rssiTotal)) + 1);
    setMapStyle(MAP_STYLES[floor - 1]);
  };

  return {
    floor,
    setFloor,
    calculateFloor,
    mapStyle,
    setMapStyle,
    location,
    setLocation,
    getLocation,
  };
}

export default useLocationPrediction;
