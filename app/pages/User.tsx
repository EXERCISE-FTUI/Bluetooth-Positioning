import { useEffect } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import MapBoxGL from "@rnmapbox/maps";

import { ACCESS_TOKEN } from "../constants";

import useBLE from "../hooks/useBLE";
import useLocationPrediction from "../hooks/useLocationPrediction";

MapBoxGL.setAccessToken(ACCESS_TOKEN);
MapBoxGL.setTelemetryEnabled(false);

const User = () => {
  const { scannedDevices } = useBLE();
  const { floor, mapStyle, calculateFloor, getLocation, location } =
    useLocationPrediction(scannedDevices);

  useEffect(() => {
    getLocation();
  }, [location]);

  useEffect(() => {
    calculateFloor();
  }, [scannedDevices]);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#2A2D32", "#131313FE"]}
        style={styles.gradient}
      />

      <Text style={styles.title}>Floor: {floor}</Text>
      <Text style={styles.subHeading}>Your Position: </Text>

      <View style={styles.container}>
        <MapBoxGL.MapView style={styles.map} styleURL={mapStyle}>
          <MapBoxGL.Camera
            zoomLevel={15}
            centerCoordinate={[location.longitude, location.latitude]}
          />
          <MapBoxGL.PointAnnotation
            id="pointAnnotation"
            coordinate={[location.longitude, location.latitude]}
          >
            <View style={styles.marker} />
          </MapBoxGL.PointAnnotation>
        </MapBoxGL.MapView>
      </View>
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
  title: {
    fontSize: 40,
    fontWeight: "bold", // font-bold
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 16, // mb-4
    marginTop: 16,
  },
  subHeading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#FFFFFF",
  },
  textLocation: {
    fontSize: 16,
    fontWeight: "bold", // font-bold
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 16, // mb-4
  },
  container: {
    padding: 0,
    backgroundColor: "#38b6ff",
    margin: 10,
    width: Dimensions.get("window").width - 20,
    height: (Dimensions.get("window").width - 20) * (46 / 40.67),
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});

export default User;
