import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,ImageBackground} from 'react-native';
import images from '../data.js'

const emptyBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]];

export default function Game() {
  const [initialState, setInitialState] = useState(emptyBoard);
  const [questionImages, setQuestionImages] = useState(images[0]);
  const [currentRevealed, setCurrentRevealed] = useState({});

  useEffect(()=>{
    initBoard();
  },[])

  const initBoard = () =>{
    let photoNum = Math.floor(Math.random()*7);
    let img = images[photoNum].url;
    setQuestionImages(img);
    revealed(emptyBoard);
  }

  const revealed = (board) => {
    let i = Math.floor(Math.random()*5);
    let j = Math.floor(Math.random()*4);
    let array = board.slice(0);
    array[i][j] = 1;
    if(!currentRevealed[[i,j]]){
      let obj = {...currentRevealed}
      obj[[i,j]] = true;
      setCurrentRevealed(obj);
    } else {
      revealed(board);
    }
    setInitialState(array);
  }

  return (
    <View style={styles.container}>
      <Text>Question 1</Text>

      <View>
       <ImageBackground source={questionImages} style={styles.image}>

        <View style={{flexDirection: "row"}}>
          {initialState[0].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>

        <View style={{flexDirection: "row"}}>
          {initialState[1].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>

        <View style={{flexDirection: "row"}}>
          {initialState[2].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>

        <View style={{flexDirection: "row"}}>
          {initialState[3].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>

        <View style={{flexDirection: "row"}}>
          {initialState[4].map((item, index)=> {
            if(item === 0 ) {
              return <View style={styles.tile} key={index} />
            } else {
              return <View style={styles.revealed} key={index} />
            }
          })}
        </View>
       </ImageBackground>
      </View>

      <TouchableOpacity
        onPress={()=>revealed(initialState)}
        style ={styles.button}>
        <Text style={styles.buttonText}>Reavel MORE</Text>
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
    width: 80,
    height: 80,
    backgroundColor:'green',
  },

  revealed: {
    borderWidth: 1,
    width: 80,
    height: 80,
  },

  image: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
