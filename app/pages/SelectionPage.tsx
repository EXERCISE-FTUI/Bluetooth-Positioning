import { useEffect } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

import usePermissions from "../hooks/usePermissions";
import ContainerBackground from "../components/ContainerBackground";
import Button from "../components/Button";

const SelectionPage = ({ navigation }: { navigation: any }) => {
  const {
    bluetoothGranted,
    locationGranted,
    checkBluetooth,
    checkLocation,
    bluetoothActivated,
    locationActivated,
    requestBluetoothAndLocation,
  } = usePermissions();

  useEffect(() => {
    requestBluetoothAndLocation();
  }, [bluetoothGranted, locationGranted]);

  useEffect(() => {
    checkBluetooth();
    checkLocation();
  }, [bluetoothActivated, locationActivated]);

  if (!bluetoothGranted || !locationGranted) {
    return (
      <SafeAreaView style={styles.container}>
        <ContainerBackground />

        <Text style={styles.title}>
          Grant bluetooth and location permissions first to use this app.
        </Text>
      </SafeAreaView>
    );
  } else if (!bluetoothActivated || !locationActivated) {
    return (
      <SafeAreaView style={styles.container}>
        <ContainerBackground />

        <Text style={styles.title}>
          Enable bluetooth and location service first to use this app.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ContainerBackground />

      <Text style={styles.title}>Welcome to GPS Tracker!</Text>
      <Text style={styles.login}>Login as</Text>

      <Button text="ADMIN" onPress={() => navigation.navigate("Admin")} />

      <Button text="USER" onPress={() => navigation.navigate("User")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 28, // text-2xl
    fontWeight: "bold", // font-bold
    textAlign: "center",
    marginBottom: 16, // mb-4
    color: "#FFFFFF",
  },
  login: {
    marginBottom: 16,
    fontSize: 24,
    color: "#FFFFFF",
  },
});

export default SelectionPage;
