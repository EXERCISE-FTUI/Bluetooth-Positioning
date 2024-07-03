import { StyleSheet, Text, View } from "react-native";

import { BLEDevice as Device } from "../types";

function BLEDevice({ item }: { item: Device }) {
  return item !== null && item.name?.length ? (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>Name: {item.name}</Text>
      <Text style={styles.deviceText}>MAC: {item.id}</Text>
      {item.rssi && (
        <Text style={styles.deviceText}>RSSI: {item.rssi + ""}</Text>
      )}
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
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

export default BLEDevice;
