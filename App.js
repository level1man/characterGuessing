import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,ImageBackground, SafeAreaView} from 'react-native';
import Game from './components/Game.js'
import AppLoading from 'expo-app-loading';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import background from './assets/background.png';
// import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  const [startGame, setStartGame] = useState(false);

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handlePress = () => {
    setStartGame(true);
  }

  if(!startGame) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.image}>
        <Text style={styles.title}>Who am I?</Text>
        <TouchableOpacity
          onPress={()=>handlePress()}
          style ={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />

        </ImageBackground>
      </SafeAreaView>
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
    backgroundColor: '#fcd5ce',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection:'column'
  },
  image:{
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: "flex-end"

  },
  title:{
    fontFamily:'Pacifico_400Regular',
    fontSize: 50,
    paddingLeft: 10,
    paddingRight: 15,

    color:'#ffbe0b',
    // borderRadius:10,
    // backgroundColor: '#9c89b8',
    textShadowColor: '#FFFFFF',
    textShadowOffset:{width:2, height:2},
    textShadowRadius:1,
  },
  button: {
    backgroundColor: "#ED657E",
    padding: 10,
    borderRadius: 5,
    marginBottom: 60,
    marginTop:10
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
