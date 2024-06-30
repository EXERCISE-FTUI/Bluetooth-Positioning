import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";

import SelectionPage from "./app/pages/SelectionPage";
import Admin from "./app/pages/Admin";
import User from "./app/pages/User";

import "./global.css";

const Stack = createStackNavigator();

const App = () => {
  const darkHeaderOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: "#2A2D32" },
    headerTitleStyle: { color: "#FFFFFF" },
    headerTintColor: "#FFFFFF",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectRole">
        <Stack.Screen
          name="SelectRole"
          component={SelectionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={darkHeaderOptions}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={darkHeaderOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
