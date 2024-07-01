import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import MapBoxGL, { UserTrackingMode } from "@rnmapbox/maps";

import { ACCESS_TOKEN } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

import useBLE from "../hooks/useBLE";
import useLocationPrediction from "../hooks/useLocationPrediction";

MapBoxGL.setAccessToken(ACCESS_TOKEN);
MapBoxGL.setTelemetryEnabled(false);

const User = () => {
  const { scannedDevices } = useBLE();
  const { floor, mapStyle, calculateFloor, getLocation, location } =
    useLocationPrediction();

  useEffect(() => {
    getLocation();
  }, [location]);

  useEffect(() => {
    calculateFloor(scannedDevices);
  }, [scannedDevices]);

  return (
    <View>
      <View style={styles.container}>
        <LinearGradient
          colors={["#2A2D32", "#131313FE"]}
          style={styles.floorContainer}
        >
          <Text style={styles.title}>Floor: {floor}</Text>
        </LinearGradient>

        <MapBoxGL.MapView
          style={styles.map}
          styleURL={mapStyle}
          logoEnabled={false}
          compassEnabled={true}
          compassPosition={{ bottom: 12, right: 12 }}
          attributionEnabled={false}
          scaleBarEnabled={false}
        >
          <MapBoxGL.Camera
            zoomLevel={18}
            followZoomLevel={18}
            followUserLocation={true}
            followUserMode={UserTrackingMode.Follow}
            animationMode="flyTo"
          />
          <MapBoxGL.UserLocation
            androidRenderMode="gps"
            showsUserHeadingIndicator={true}
            requestsAlwaysUse={true}
          />
        </MapBoxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floorContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    zIndex: 10,
    width: "auto",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  container: {
    padding: 0,
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
