import React, {useEffect, useState} from "react";
import {View, Text, FlatList, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import useBLE from "../../hooks/useBLE";
import {Device as BLEDevice} from "react-native-ble-plx";
import {BluetoothDevice as ClassicDevice} from "react-native-bluetooth-classic";

const Admin = () => {
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

	const renderItem = ({item}: {item: BLEDevice | ClassicDevice}) => (
		<View style={styles.deviceContainer}>
			<Text style={styles.deviceText}>Name: {item.name}</Text>
			<Text style={styles.deviceText}>MAC: {item.id}</Text>
			{item.rssi && (
				<Text style={styles.deviceText}>RSSI: {item.rssi}</Text>
			)}
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Floor prediction: {floor}</Text>
			<FlatList
				data={allDevices}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f7fafc",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold", // font-bold
		textAlign: "center",
		marginBottom: 16, // mb-4
	},
	deviceContainer: {
		backgroundColor: "#ffffff", // bg-white
		padding: 16, // p-4
		marginVertical: 8, // my-2
		borderRadius: 8, // rounded-lg
		shadowColor: "#000000", // shadow
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: {width: 0, height: 2},
	},
	deviceText: {
		fontSize: 18, // text-lg
		marginBottom: 4, // mb-1
	},
});

export default Admin;
