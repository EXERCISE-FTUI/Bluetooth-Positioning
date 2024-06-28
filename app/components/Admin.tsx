import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Device as BLEDevice } from "react-native-ble-plx";
import { BluetoothDevice as ClassicDevice } from "react-native-bluetooth-classic";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import useBLE from "../../hooks/useBLE";
import { leveledDeviceNames as deviceNames } from "../../constants";

const Admin = () => {
  const { allDevices } = useBLE();

  const [floor, setFloor] = useState(0);

  const floorPrediction = () => {
    var rssiTotal: number[] = new Array(deviceNames.length).fill(0);
    for (let i = 0; i < allDevices.length; i++) {
      for (let j = 0; j < deviceNames.length; j++) {
        if (
          allDevices[i].name === deviceNames[j][0] ||
          allDevices[i].name === deviceNames[j][1]
        )
          rssiTotal[j] -= 1 / Number(allDevices[i].rssi);
      }
    }
    setFloor(rssiTotal.indexOf(Math.max(...rssiTotal)) + 1);
  };

  useEffect(() => {
    floorPrediction();
  }, [allDevices]);

  const renderItem = ({ item }: { item: BLEDevice | ClassicDevice }) =>
    item !== null && item.name?.length ? (
      <View style={styles.deviceContainer}>
        <Text style={styles.deviceText}>Name: {item.name}</Text>
        <Text style={styles.deviceText}>MAC: {item.id}</Text>
        {item.rssi && (
          <Text style={styles.deviceText}>RSSI: {item.rssi + ""}</Text>
        )}
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2D32", "#131313FE"]}
        style={styles.gradient}
      />
      {allDevices.length > 0 ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Text style={styles.title}>Floor prediction: {floor}</Text>
          <FlatList
            data={allDevices}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={styles.noDeviceContainer}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Text style={styles.title}>No Device Scanned.</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    display: "flex",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
  noDeviceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // font-bold
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 16, // mb-4
  },
  deviceContainer: {
    backgroundColor: "#ffffff", // bg-white
    padding: 16, // p-4
    marginVertical: 8, // my-2
    borderRadius: 8, // rounded-lg
    shadowColor: "#000000", // shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deviceText: {
    fontSize: 18, // text-lg
    marginBottom: 4, // mb-1
  },
});

export default Admin;
