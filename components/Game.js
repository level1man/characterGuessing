import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity ,ImageBackground, SafeAreaView} from 'react-native';
import data from '../data.js'

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

const images = data.slice();

export default function Game() {
  const [initialState, setInitialState] = useState(emptyBoard);
  const [questionImages, setQuestionImages] = useState(images[0]);
  const [currentRevealed, setCurrentRevealed] = useState({});
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  // const [usedImages, setUsedImages] = useState({});
  const [tip, setTip] = useState(4);
  const [next, setNext] = useState(false);
  const [numberOfImages, SetNumberOfImages] = useState(20)

  useEffect(()=>{
    initBoard();
  },[])

  // const initBoard = () =>{
  //   let photoNum = Math.floor(Math.random()*20);
  //   let img = images[photoNum];
  //   let used = {...usedImages};
  //   setNext(false);

  //   var board = emptyBoard.map(function(arr) {
  //     return arr.slice();
  //   });

  //   if(!used[photoNum]) {
  //     used[photoNum] = true;
  //     setUsedImages(used);
  //     setQuestionImages(img);
  //     revealed(board);
  //   } else {
  //     initBoard();
  //     return;
  //   }
  // }

  const initBoard = () =>{
    let photoNum = Math.floor(Math.random()*numberOfImages);
    let img = images[photoNum];
    setNext(false);

    var board = emptyBoard.map(function(arr) {
      return arr.slice();
    });

    setQuestionImages(img);
    revealed(board);
    SetNumberOfImages(numberOfImages-1);
    images.splice(photoNum,1);
    console.log(images.length);

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

  const handleChoices = (text) => {
    console.log(text);
    if(text === questionImages.name) {
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
    <SafeAreaView style={styles.container}>

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
        {/* <TextInput
          style={{height:40}}
          placeholder='Type your guess HERE'
          onChangeText={(text) => handleOnChange(text)} /> */}
          {questionImages.answers.map((item, index) => {
            return <TouchableOpacity
            onPress={() => handleChoices(item)}
            style ={styles.choiceButton}
            key={index}>
              <Text style={styles.choiceText}>{item}</Text>
            </TouchableOpacity>
          })}

      </View>

      <View style={[styles.box, styles.box4]}>
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
    </SafeAreaView>
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
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  box2: {
    flex:8,
    backgroundColor: '#F99D07'
  },
  box3: {
    flex:2,
    backgroundColor: '#882FF6',
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  box4: {
    flex:1,
    backgroundColor: 'grey',
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    backgroundColor: '#37B6F6',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  disabledButton: {
    backgroundColor: "#CDCDCD"
  },
  choiceButton: {
    width:"95%",
    justifyContent:"center",
    backgroundColor:"yellow",
    textAlign: "center"
  },
  choiceText: {
    fontSize: 20,
    color: 'black',
  },
  tile: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: 90,
    height: 90,
    backgroundColor:'green',
  },

  revealed: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: 90,
    height: 90,
  },

  image: {
    resizeMode: "cover",
    justifyContent: "center"
  },
});
