import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapBoxGL from "@rnmapbox/maps";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

import { leveledDeviceNames as deviceNames } from "../../constants";
import useBLE from "../../hooks/useBLE";

MapBoxGL.setAccessToken(
  "pk.eyJ1Ijoia2FtYWwtbWFrYXJpbSIsImEiOiJjbHh5dTZoZncwNGhzMmtxN2JoemRoZTA0In0.VpkrDahr2iDyB4yHr5B-RA"
);
MapBoxGL.setTelemetryEnabled(false);
// MapBoxGL.setWellKnownTileServer("mapbox");

const User = () => {
  const mapStyles = [
    "mapbox://styles/kamal-makarim/clxyu9pw3002901qp6w1fcqfp",
    "mapbox://styles/kamal-makarim/clxywcl3g002e01qp83b87szt",
    "mapbox://styles/kamal-makarim/clxywcl3g002e01qp83b87szt",
    "mapbox://styles/kamal-makarim/clxywcl3g002e01qp83b87szt",
  ];

  const { allDevices } = useBLE();
  const [floor, setFloor] = useState(0);
  const [mapStyle, setMapStyle] = useState(mapStyles[0]);

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
    setMapStyle(mapStyles[floor - 1]);
  };

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const getLocation = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 3000,
        distanceInterval: 0,
      },
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(newLocation);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, [location]);

  useEffect(() => {
    floorPrediction();
  }, [allDevices]);

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
