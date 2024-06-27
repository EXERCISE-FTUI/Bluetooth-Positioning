import React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native';

const SelectionPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Role</Text>
      <View style={styles.buttonContainer}>
        <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="User" onPress={() => navigation.navigate('User')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7fafc', // bg-gray-100
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold', // font-bold
    textAlign: 'center',
    marginBottom: 16, // mb-4
  },
  buttonContainer: {
    marginBottom: 8, // mb-2
  },
});

export default SelectionPage;
