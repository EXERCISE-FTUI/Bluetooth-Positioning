import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";

const SelectionPage = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#2A2D32", "#131313FE"]}
        style={styles.gradient}
      />

      <Text style={styles.title}>Welcome to GPS Tracker!</Text>
      <Text style={styles.login}>Login as</Text>

      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Admin")}
      >
        <Text style={styles.buttonText}>ADMIN</Text>
      </Pressable>

      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("User")}
      >
        <Text style={styles.buttonText}>USER</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    display: "flex",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
  container: {
    display: "flex",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 28, // text-2xl
    fontWeight: "bold", // font-bold
    textAlign: "center",
    marginBottom: 16, // mb-4
    color: "#FFFFFF",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#2FB8FF",
    marginBottom: 8, // mb-2
    borderRadius: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  login: {
    marginBottom: 16,
    fontSize: 24,
    color: "#FFFFFF",
  },
});

export default SelectionPage;
