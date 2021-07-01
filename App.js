import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>What is it?</Text>

      <View style={{backgroundColor: "yellow"}}>

        <View style={{flexDirection: "row"}}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
          <View style={styles.tile} />
        </View>
      </View>

      <TouchableOpacity
        onPress={()=>alert('Hello world')}
        style ={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
  }
});
