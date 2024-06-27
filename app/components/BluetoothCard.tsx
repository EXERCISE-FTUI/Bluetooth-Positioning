import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type BluetoothCardProps = {
  filter: boolean;
  name: string;
  mac: string;
  rssi: string;
};

const BluetoothCard = ({ filter, name, mac, rssi }: BluetoothCardProps) => {
  return (
    <TouchableOpacity
      className="w-full bg-[#1E90FF] h-fit rounded-2xl px-10 py-3 flex flex-col mb-6"
      // onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="flex flex-row w-full">
        <View className="w-full relative">
          <Text className="text-xl my-1">{name}</Text>
          <Text className="my-1">
            MAC : {filter ? mac : "**************"}
          </Text>
          <Text className="my-1">
            RSSI : {filter ? rssi : "**************"}
          </Text>
          <View className="absolute right-0 top-8">
            <Text className="text-4xl opacity-90">{">"}</Text>
          </View>
        </View>
      </View>
      <View className="w-full h-0.5 bg-black my-2 opacity-60"></View>
    </TouchableOpacity>
  );
};

export default BluetoothCard;
