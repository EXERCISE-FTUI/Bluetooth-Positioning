import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectionPage from './components/SelectionPage';
import Admin from './components/Admin';
import User from './components/User';
import "../global.css";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectionPage">
        <Stack.Screen name="SelectionPage" component={SelectionPage} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
