import { useEffect, useState } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

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
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Floor: {floor}</Text>
        <MapBoxGL.MapView style={styles.map} styleURL={mapStyle}>
          <MapBoxGL.Camera
            zoomLevel={18}
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
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold", // font-bold
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 16, // mb-4
    marginTop: 16,
  },
  container: {
    padding: 0,
    backgroundColor: "#38b6ff",
    width: "100%",
    height: "100%",
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
