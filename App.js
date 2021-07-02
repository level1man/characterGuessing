import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,ImageBackground} from 'react-native';
import images from './data.js'
import Game from './components/Game.js'


export default function App() {
  const [startGame, setStartGame] = useState(false);
  // const [screen, setScreen] = useState('');

  const handlePress = () => {
    console.log('here')
    setStartGame(true);
    // setScreen(<Game />);
  }

  if(!startGame) {
    return (
      <View style={styles.container}>
        <Text>What is it?</Text>
        <TouchableOpacity
          onPress={()=>handlePress()}
          style ={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <Game />
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDCDCD',
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
});
