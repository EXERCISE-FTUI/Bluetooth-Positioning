import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SelectionPage from "./app/components/SelectionPage";
import Admin from "./app/components/Admin";
import User from "./app/components/User";

import "./global.css";

const Stack = createStackNavigator();

const App = () => {
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
          options={{
            headerStyle: { backgroundColor: "#2A2D32" },
            headerTitleStyle: { color: "#FFFFFF" },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerStyle: { backgroundColor: "#2A2D32" },
            headerTitleStyle: { color: "#FFFFFF" },
            headerTintColor: "#FFFFFF",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
