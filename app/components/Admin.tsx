import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { Device as BLEDevice } from "react-native-ble-plx";
import { BluetoothDevice as ClassicDevice } from "react-native-bluetooth-classic";
import { SafeAreaView } from "react-native-safe-area-context";
import useBLE from "../../hooks/useBLE";
import BluetoothCard from "./BluetoothCard";

const Admin = ({ navigation }: { navigation: any }) => {
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

  const [isFiltered, setIsFiltered] = useState(false);

  const toggleSwitch = () => {
    setIsFiltered((previousState) => !previousState);
  };

  return (
    <SafeAreaView className="h-full bg-blackgray px-8 py-5">
      <TouchableOpacity onPress={() => navigation.navigate("SelectionPage")}>
        <Image
          source={require("./../../assets/arrow-left.png")}
          // className="w-10 h-10"
        />
      </TouchableOpacity>

      <Text className="text-5xl font-black text-white mt-8">
        Floor : {floor}
      </Text>
      <View className="flex-row items-center mb-6">
        <Text className="text-3xl text-white font-semibold">Filter : </Text>
        <Switch
          trackColor={{ false: "#464646", true: "#2fb8ff" }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#464646"
          onValueChange={toggleSwitch}
          value={isFiltered}
          className="ml-2"
        />
      </View>

      <ScrollView>
        <FlatList
          data={allDevices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: BLEDevice | ClassicDevice }) => (
            <BluetoothCard
              filter={isFiltered}
              name={item.name ?? ""}
              mac={item.id}
              rssi={item.rssi?.toString() ?? ""}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Admin;
