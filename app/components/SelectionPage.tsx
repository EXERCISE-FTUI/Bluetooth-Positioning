import React from "react";
import {
  View,
  Text,
  SafeAreaView,  
} from "react-native";

import CustomButton from "./CustomButton";

const SelectionPage = ({ navigation }: {navigation: any}) => {
  return (
    <>
      <SafeAreaView className="h-full bg-blackgray flex justify-center items-center">
        <View className="flex-col justify-center items-center">
            <Text className="text-center text-white text-2xl font-bold mb-4">
              Welcome, to Bluetooth-Positioning
            </Text>
          <View className="">
            <View>
              <Text className="text-white text-2xl font-bold text-center my-2">
                Login as
              </Text>
            </View>
            <CustomButton
              containerStyles="bg-dodgerblue rounded-2xl h-4 my-2 min-w-[40%]"
              textStyles="text-black text-lg text-center"
              title="User"
              handlePress={() => navigation.navigate("User")}
            />
            <View>
              <Text className="text-white text-2xl font-bold text-center my-2">
                Or
              </Text>
            </View>
            <CustomButton
              containerStyles="bg-dodgerblue rounded-2xl h-4 my-2 min-w-[40%]"
              textStyles="text-black text-lg"
              title="Admin"
              handlePress={() => navigation.navigate("Admin")}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SelectionPage;
