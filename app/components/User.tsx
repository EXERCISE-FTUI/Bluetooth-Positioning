import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Rect, Circle } from "react-native-svg";
import useBLE from "../../hooks/useBLE";
import Geolocation from "react-native-geolocation-service";
import map2 from "./../../assets/map-pusgiwa.png";
import map1 from "./../../assets/map-pusgiwa.png";

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
    var rssiTotal = new Array(deviceNames.length).fill(0);
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
        interval: 1000,
        distanceFilter: 2,
        fastestInterval: 1000,
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

  const getPositionInBuilding = (latitude: number, longitude: number) => {
    const buildingCoords = {
      topLeft: {
        latitude: -6.365057675942874,
        longitude: 106.82418537481664,
      },
      topRight: {
        latitude: -6.365064093655577,
        longitude: 106.82472605124961,
      },
      bottomLeft: {
        latitude: -6.365660806695966,
        longitude: 106.8241676932336,
      },
      bottomRight: {
        latitude: -6.365675619543003,
        longitude: 106.82470571011808,
      },
    };

    const buildingWidth =
      buildingCoords.topRight.longitude - buildingCoords.topLeft.longitude;
    const buildingHeight =
      buildingCoords.topLeft.latitude - buildingCoords.bottomLeft.latitude;

    const relativeX =
      ((longitude - buildingCoords.topLeft.longitude) / buildingWidth) * 100;
    const relativeY =
      ((buildingCoords.topLeft.latitude - latitude) / buildingHeight) * 100;

    console.log(relativeX, relativeY);
    return { x: relativeX, y: relativeY };
  };

  const userPosition = getPositionInBuilding(
    location.latitude,
    location.longitude
  );

  const map = [map1, map2];

  return (
    <SafeAreaView>
      <Text style={styles.title}>Floor: {floor}</Text>
      <Text style={styles.subHeading}>Your Position: </Text>
      <Text>
        location: {location.latitude}, {location.longitude}
      </Text>
      <View style={styles.container}>
        <Image
          source={floor != 0 ? map[floor - 1] : map[0]}
          style={styles.map}
          resizeMode="contain"
        />
        <View
          style={[
            styles.marker,
            {
              left: `${userPosition.x}%`,
              top: `${userPosition.y}%`,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 32,
    textAlign: "left",
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 32,
    marginLeft: 32,
    textAlign: "left",
    marginBottom: 16,
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
