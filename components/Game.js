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

var images = data.slice();

export default function Game() {
  const [initialState, setInitialState] = useState(emptyBoard);
  const [questionImages, setQuestionImages] = useState(data[0]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [tip, setTip] = useState(4);
  const [next, setNext] = useState(false);
  const [choiceButton, setChoiceButton] = useState(false);
  const [tipButton, setTipButton] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState(20)

  useEffect(()=>{
    initBoard(numberOfImages);
  },[])

  const initBoard = (allImages) =>{
    let photoNum = Math.floor(Math.random()*allImages);
    console.log(photoNum);
    let img = images[photoNum];
    setNext(false);

    var board = emptyBoard.map(function(arr) {
      return arr.slice();
    });

    setQuestionImages(img);
    revealed(board);
    allImages -= 1;
    setNumberOfImages(allImages);
    images.splice(photoNum,1);

  }

  const revealed = (board) => {
    // let obj = {...currentRevealed}
    let i = Math.floor(Math.random()*5);
    let j = Math.floor(Math.random()*4);
    var array = board.map(function(arr) {
      return arr.slice();
    });
    if(array[i][j] === 0) {
      array[i][j] = 1;
      if(tip !== 0) {
        setTip(tip-1);
      }
      if(tip === 1) {
        setTipButton(true);
      }
      setInitialState(array);
    } else {
      console.log(tip, i, j)
      revealed(array);
    }
  }

  const handleChoices = (text) => {
    if(text === questionImages.name) {
      alert('You are correct')
      setScore(score + 10);
    } else {
      alert('WRONG Answer!');
    }
    setChoiceButton(true);
    setTipButton(true);
    setInitialState(filledBoard);
    setNext(true);
  }

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    setChoiceButton(false);
    initBoard(numberOfImages);
    // setCurrentRevealed({});
    setTip(3);
    setTipButton(false);
  }

  const handleReplay = () => {
    images = data.slice();
    console.log(images.length)
    setInitialState(emptyBoard);
    setNumberOfImages(20);
    setQuestionNumber(1);
    setChoiceButton(false);
    setScore(0);
    initBoard(20);
    setTip(3);
    setTipButton(false);
  }

  if(questionNumber > 10) {
    return (
      <View style={styles.container}>
        <Text>Game Over</Text>
        <Text>Your Score:</Text>
        <Text>{score}</Text>
        <TouchableOpacity
          onPress={()=>handleReplay()}
          style ={styles.button}>
          <Text style={styles.buttonText}>Play Agian</Text>
          </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  } else {
  return (
    <SafeAreaView style={styles.container}>

      <View style={[styles.box, styles.box1]}>
        <Text>Question {questionNumber}</Text>
        <Text>{score}/100</Text>
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
          {/* {questionImages.answers.map((item, index) => {
            return <TouchableOpacity
            onPress={() => handleChoices(item)}
            style ={styles.choiceButton}
            disabled= {choiceButton}
            key={index}>
              <Text style={styles.choiceText}>{item}</Text>
            </TouchableOpacity>
          })} */}
            <TouchableOpacity
              onPress={() => handleChoices(questionImages.answers[0])}
              style ={styles.choiceButton}
              disabled= {choiceButton}>
                <Text style={styles.choiceText}>{questionImages.answers[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChoices(questionImages.answers[1])}
              style ={styles.choiceButton}
              disabled= {choiceButton}>
                <Text style={styles.choiceText}>{questionImages.answers[1]}</Text>
            </TouchableOpacity>
      </View>

      <View style={[styles.box, styles.box3]}>
            <TouchableOpacity
                onPress={() => handleChoices(questionImages.answers[2])}
                style ={styles.choiceButton}
                disabled= {choiceButton}>
                  <Text style={styles.choiceText}>{questionImages.answers[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleChoices(questionImages.answers[3])}
                style ={styles.choiceButton}
                disabled= {choiceButton}>
                  <Text style={styles.choiceText}>{questionImages.answers[3]}</Text>
              </TouchableOpacity>
      </View>

      <View style={[styles.box, styles.box4]}>
        <TouchableOpacity
          onPress={()=>revealed(initialState)}
          style ={styles.button}
          disabled = {tipButton}>
          <Text style={styles.buttonText}>&#128161;({tip})</Text>
        </TouchableOpacity>
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
}}

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
    backgroundColor: '#F2EB8D',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  box2: {
    flex:8,
    backgroundColor: '#ECC1D9'
  },
  box3: {
    flex:1,
    backgroundColor: '#ECC1D9',
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  box4: {
    flex:0.8,
    backgroundColor: '#F2EB8D',
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
    width:"45%",
    padding: 10,
    // borderWidth:1,
    borderRadius: 5,
    justifyContent:"center",
    // backgroundColor:"rgba(255, 255, 255, 0.3)",
    backgroundColor:"#ED657E",
    alignItems: "center"
  },
  choiceText: {
    fontSize: 18,
    padding: 2,
    color: 'white',
  },
  tile: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: 90,
    height: 90,
    backgroundColor:'#E2C7E8',
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
