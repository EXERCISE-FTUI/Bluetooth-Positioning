import { useEffect } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

import Device from "../components/BLEDevice";

import useBLE from "../hooks/useBLE";
import useLocationPrediction from "../hooks/useLocationPrediction";

const Admin = () => {
  const { scannedDevices } = useBLE();
  const { calculateFloor, floor } = useLocationPrediction();

  useEffect(() => {
    calculateFloor(scannedDevices);
  }, [scannedDevices]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2D32", "#131313FE"]}
        style={styles.gradient}
      />

      {scannedDevices.length > 0 ? (
        <View>
          <Text style={styles.title}>Floor prediction: {floor}</Text>

          <FlatList
            data={scannedDevices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Device item={item} />}
          />
        </View>
      ) : (
        <View style={styles.noDeviceContainer}>
          <Text style={styles.title}>No Device Scanned.</Text>
        </View>
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
});

export default Admin;
