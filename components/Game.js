import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity ,ImageBackground} from 'react-native';
import images from '../data.js'

const emptyBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const filledBoard = [
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1]
]

export default function Game() {
  const [initialState, setInitialState] = useState(emptyBoard);
  const [questionImages, setQuestionImages] = useState(images[0]);
  const [currentRevealed, setCurrentRevealed] = useState({});
  // const [ifAnswer, setIfAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [usedImages, setUsedImages] = useState({});
  const [tip, setTip] = useState(4);
  const [next, setNext] = useState(false);

  useEffect(()=>{
    initBoard();
  },[])

  const initBoard = () =>{
    let photoNum = Math.floor(Math.random()*7);
    let img = images[photoNum];
    let used = {...usedImages};
    setNext(false);

    var board = emptyBoard.map(function(arr) {
      return arr.slice();
    });

    if(!used[photoNum]) {
      used[photoNum] = true;
      setUsedImages(used);
      setQuestionImages(img);
      revealed(board);
    } else {
      initBoard();
      return;
    }
  }

  const revealed = (board) => {
    let obj = {...currentRevealed}
    let i = Math.floor(Math.random()*5);
    let j = Math.floor(Math.random()*4);
    var array = board.map(function(arr) {
      return arr.slice();
    });
    array[i][j] = 1;
    // add tip count
      if(!currentRevealed[[i,j]]){
        obj[[i,j]] = true;
        setCurrentRevealed(obj);
      } else {
        revealed(board);
        return;
      }
      setTip(tip-1);
      setInitialState(array);
  }

  const handleOnChange = (text) => {
    if(text.toLowerCase() === questionImages.name.toLowerCase()) {
      alert('You are correct')
      // setIfAnswer(true);
      setScore(score + 10);
      setInitialState(filledBoard);
      setNext(true);

    }
  }

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    setCurrentRevealed({});
    initBoard();
    setTip(3);
  }

  return (
    <View style={styles.container}>

      <View style={[styles.box, styles.box1]}>
        <Text>{score}/100</Text>
        <Text>Question {questionNumber}</Text>
      </View>

      <View style={[styles.box, styles.box2]}>
       <ImageBackground source={questionImages.url} style={styles.image}>
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



      <View style={[styles.box, styles.box3]}>
        <TextInput
          style={{height:40}}
          placeholder='Type your guess HERE'
          onChangeText={(text) => handleOnChange(text)} />
      </View>

      <View style={[styles.box, styles.box4]}>

      </View>

      <View style={[styles.box, styles.box5]}>
        {tip === 0 ?
        <TouchableOpacity
          onPress={()=>revealed(initialState)}
          style ={[styles.button, styles.disabledButton]}
          disabled = {true}>
          <Text style={styles.buttonText}>No &#128161;</Text>
        </TouchableOpacity> :
        <TouchableOpacity
          onPress={()=>revealed(initialState)}
          style ={styles.button}>
          <Text style={styles.buttonText}>&#128161;({tip})</Text>
        </TouchableOpacity>
        }
        {next === true ?
          <TouchableOpacity
            onPress={()=>handleNext()}
            style ={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity> :
            <TouchableOpacity
            onPress={()=>handleNext()}
            style ={[styles.button, {display:'none'}]}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>}
      </View>

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

  box: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  },

  box1: {
    flex:0.5,
    backgroundColor: '#F9E104',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: '10px',
    paddingRight: '10px'
  },

  box2: {
    flex:8,
    backgroundColor: '#F99D07'
  },

  box3: {
    flex:1,
    backgroundColor: '#882FF6',
    flexDirection: 'row',

  },

  box4: {
    flex:1,
    backgroundColor: '#37B6F6',
    flexDirection: 'row'
  },

  box5: {
    flex:1,
    backgroundColor: 'grey',
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: '10px',
    paddingRight: '10px'
  },

  button: {
    backgroundColor: '#37B6F6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  disabledButton: {
    backgroundColor: "#CDCDCD"
  },
  tile: {
    borderWidth: 1,
    width: 85,
    height: 85,
    backgroundColor:'green',
  },

  revealed: {
    borderWidth: 1,
    width: 85,
    height: 85,
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center"
  },
});
