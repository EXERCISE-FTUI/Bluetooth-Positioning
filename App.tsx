import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useBLE from './hooks/useBLE';
import { Device as BLEDevice } from 'react-native-ble-plx';
import { BluetoothDevice as ClassicDevice } from 'react-native-bluetooth-classic';

const App = () => {
  const {
    scanForPeripherals,
    scanForClassicDevices,
    requestPermissions,
    allDevices
  } = useBLE();
  const [floor, setFloor] = useState(0);

  const deviceNames = [['1A', '1B'],['2A', '2B']]


  const floorPrediction = () => {
    var rssiTotal: number[] = [0, 0];
    for (let i = 0; i < allDevices.length; i++) {
      for (let j = 0; j < deviceNames.length; j++) {
        if (allDevices[i].name === deviceNames[j][0] || allDevices[i].name === deviceNames[j][1]) {
          rssiTotal[j] -= 1/allDevices[i].rssi;
        }
      }
    }

    setFloor(rssiTotal.indexOf(Math.max(...rssiTotal)) + 1);
  };

  useEffect(() => {
    const startBLE = async () => {
      const hasPermissions = await requestPermissions();
      if (hasPermissions) {
        scanForPeripherals();
        scanForClassicDevices();
      } else {
        console.log('Permissions not granted');
      }
    };

    startBLE();
    floorPrediction();
  }, []);

  const renderItem = ({ item }: { item: BLEDevice | ClassicDevice }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>Name: {item.name}</Text>
      <Text style={styles.deviceText}>MAC: {item.id}</Text>
      {item.rssi && <Text style={styles.deviceText}>RSSI: {item.rssi}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Floor prediction : {floor} </Text>
      <FlatList
        data={allDevices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  deviceContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  deviceText: {
    fontSize: 16,
    marginBottom: 4
  }
});

export default App;
