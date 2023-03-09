import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native'
import useStateRef from 'react-usestateref';
import BeerIcon from '../../assets/icons/beer.svg';

var s = require('../../style');

export const Roulette = ({dataQuestions, dataUsers=[]}) => {

  const [numberOfUsers, setNumberOfUsers, numberOfUsersRef] = useStateRef(0);
  const [numberOfQuestions, setNumberOfQuestions, numberOfQuestionsRef] = useStateRef(0);
  const [nameSelected, setNameSelected, nameSelectedRef] = useStateRef('');
  const [questionSelected, setQuestionSelected, questionSelectedRef] = useStateRef('');
  const [isInterval, setIsInterval, isIntervalRef] = useStateRef(false);

  useEffect(() => {
    setNameSelected(dataUsers[0].name);
    setQuestionSelected(dataQuestions?.items[0]);
  }, []);

  const handleInit = () =>{
    setIsInterval(true);
    setNumberOfUsers(dataUsers?.length || 0);
    setNumberOfQuestions(dataQuestions?.items?.length || 0);
    handleInterval(); 
  }

  const handleInterval = () =>{

    const myInterval = setInterval(myTimer, 50);
    
    setTimeout(() => {
      
      clearInterval(myInterval);
      setIsInterval(false);
    }, 5000);
  }
  
  const myTimer = () => {
    const numberUser = Math.floor(Math.random() * numberOfUsersRef.current);
    const numberQuestion = Math.floor(Math.random() * numberOfQuestionsRef.current);
    setNameSelected(dataUsers[numberUser].name);
    setQuestionSelected(dataQuestions?.items[numberQuestion]);
  }

  return (
    <View style={[{minHeight: Dimensions.get('window').height, position: 'relative'}]}>
      <Text style={[s.textCenter, s.fontSize40, s.Color_quarternary,s.fontFamily1, s.mx3, {marginTop: 40}]}>{dataQuestions.title}</Text>
      <View style={[{alignItems: "center"}]}>
        <View style={[styles.box, s.bg_primary]}>
          <Text style={[s.fontSize32, s.fontFamily2]}>{nameSelectedRef.current}</Text>
        </View>

        <View style={[styles.boxQuestion]}>
          <Text style={[s.fontSize32, s.colorWhite, s.textCenter, s.fontFamily2]}>{questionSelectedRef.current}</Text>
        </View>
      </View>

        <View style={[styles.boxIntoBtn]}>
          <View style={[styles.boxBtn]}>
            <TouchableOpacity style={[styles.btn, s.bg_primary]}
            onPress={handleInit}
            disabled={isIntervalRef.current}
            >
              <Text style={[s.fontSize24, s.fontFamily2]}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>

      <BeerIcon
      width= '200'
      height='200'
      style={[styles.icon]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon:{
    position: 'absolute',
    bottom: '18%',
    transform: [{ rotate: '20deg'}],
    right: '-5%',
    zIndex: -99
  },
  box:{
    marginTop: 20,
    width: '80%',
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  boxQuestion:{
    marginTop: 0,
    width: '80%',
    height: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  btn:{
    marginTop: 70,
    height: 150,
    width: 150,
    padding: 10,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  boxBtn:{
    justifyContent: "center",
    alignItems: "center",
    position: 'relative'
  },
  boxIntoBtn:{
    position:'absolute',
    bottom: 0,
    left: '30%'
  }
});