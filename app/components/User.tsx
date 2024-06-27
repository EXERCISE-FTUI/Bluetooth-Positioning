import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import useBLE from "../../hooks/useBLE";
import Geolocation from "react-native-geolocation-service";

const User = () => {
  const {
    scanForPeripherals,
    scanForClassicDevices,
    requestPermissions,
    allDevices,
  } = useBLE();
  const [floor, setFloor] = useState(0);

  const deviceNames = [
    ["1A", "1B"],
    ["2A", "2B"],
  ];

  const floorPrediction = () => {
    var rssiTotal: number[] = new Array(deviceNames.length).fill(0);
    for (let i = 0; i < allDevices.length; i++) {
      for (let j = 0; j < deviceNames.length; j++) {
        if (
          allDevices[i].name === deviceNames[j][0] ||
          allDevices[i].name === deviceNames[j][1]
        ) {
          rssiTotal[j] -= 1 / Number(allDevices[i].rssi);
        }
      }
    }
    console.log(rssiTotal);
    setFloor(rssiTotal.indexOf(Math.max(...rssiTotal)) + 1);
  };

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [watchId, setWatchId] = useState(0);

  const getLocation = () => {
    console.log("getting location");
    const id = Geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log("Location: ", position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        interval: 3000,
        distanceFilter: 0,
        fastestInterval: 500,
      }
    );

    console.log(id);
    setWatchId(id);
  };

  useEffect(() => {
    const startBLE = async () => {
      const hasPermissions = await requestPermissions();
      if (hasPermissions) {
        scanForPeripherals();
        scanForClassicDevices();
        floorPrediction();
      } else {
        console.log("Permissions not granted");
      }
    };
    startBLE();
  }, [allDevices]);

  useEffect(() => {
    const getPermissions = async () => {
      const hasPermissions = await requestPermissions();
      if (hasPermissions) {
        getLocation();
      } else {
        console.log("Permissions not granted");
      }
    };

    getPermissions();

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2D32", "#131313FE"]}
        style={styles.gradient}
      />
      <Text style={styles.title}>Floor: {floor}</Text>
      <Text style={styles.subHeading}>Your Position: </Text>
      <Text style={styles.subHeading}>
        location: {location.latitude}, {location.longitude}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7fafc",
  },
  gradient: {
    display: "flex",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // font-bold
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 16, // mb-4
  },
  subHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 12,
  },
});

export default User;
