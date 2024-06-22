import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const User = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-4">User Page</Text>
    </SafeAreaView>
  );
};

export default User;
