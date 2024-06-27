import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const User = ( {navigation} : {navigation: any} ) => {
  const floor = "1";
  return (
    <SafeAreaView className="h-full bg-blackgray px-8 py-5">
        <TouchableOpacity onPress={() => navigation.navigate("SelectionPage")}>
          {/* <View></View> */}
          <Image
            source={require("./../../assets/arrow-left.png")}
            // className="w-10 h-10"
          />
        </TouchableOpacity>

        <Text className="text-5xl font-black text-white mt-8">
          Floor : {floor}{" "}
        </Text>

      <Text className="text-2xl text-white font-semibold mt-14">
        Your Position:
      </Text>
    </SafeAreaView>
  );
};

export default User;
