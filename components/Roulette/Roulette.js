import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native'
import useStateRef from 'react-usestateref';
import BeerIcon from '../../assets/icons/beer.svg';
import BackIcon from '../../assets/icons/Icon back - blanco.svg';

var s = require('../../style');

export const Roulette = ({
  dataQuestions, 
  dataUsers=[],
  Icon,
  bg_color,
  title_color
}) => {

  // console.log(Icon);

  const navigation = useNavigation();

  const [numberOfUsers, setNumberOfUsers, numberOfUsersRef] = useStateRef(0);
  const [numberOfQuestions, setNumberOfQuestions, numberOfQuestionsRef] = useStateRef(0);
  const [nameSelected, setNameSelected, nameSelectedRef] = useStateRef('');
  const [questionSelected, setQuestionSelected, questionSelectedRef] = useStateRef('');
  const [isInterval, setIsInterval, isIntervalRef] = useStateRef(false);
  const [isFirst, setisFirst, isFirstRef] = useStateRef(true);

  useEffect(() => {
    setNameSelected(dataUsers[0].name);
    setQuestionSelected(dataQuestions?.items[0]);
  }, []);

  const handleInit = () =>{
    setisFirst(false);
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
    <>
      <View style={[{minHeight: Dimensions.get('window').height, position: 'relative'}]}>
        <TouchableOpacity style={[styles.btnBack, s.mx3]}
        onPress={() => navigation.goBack()}
        >
          <BackIcon width={25} height={25}/>
        </TouchableOpacity>

        <Text style={[s.textCenter, s.fontSize40, title_color,s.fontFamily1, s.mx3, {marginTop: 0}, styles.text]}>{dataQuestions.title}</Text>
        {
          !isFirstRef.current &&
          <>
            <View style={[{alignItems: "center"}]}>
              <View style={[styles.box, s.bg_primary]}>
                <Text style={[s.fontSize32, s.fontFamily2]}>{nameSelectedRef.current}</Text>
              </View>

              <View style={[styles.boxQuestion]}>
                <Text style={[s.fontSize28, s.colorWhite, s.textCenter, s.fontFamily2, styles.question]}>{questionSelectedRef.current}</Text>
              </View>
            </View>
          </>
        }

          <View style={[!isFirstRef.current&&styles.boxIntoBtn]}>
            <View style={[styles.boxBtn]}>
              <TouchableOpacity style={[styles.btn, s.bg_primary]}
              onPress={handleInit}
              disabled={isIntervalRef.current}
              >
                <Text style={[s.fontSize30, s.fontFamily2]}>{isFirstRef.current? 'Start' : 'Again'}</Text>
              </TouchableOpacity>
            </View>
          </View>

        <Icon
        width= '45%'
        height='45%'
        style={[styles.icon]}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  text:{letterSpacing: 4, textShadowColor:'#000', 
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10},
  question:{
    letterSpacing: 3, 
    textShadowColor:'#000', 
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
  },
  icon:{
    position: 'absolute',
    bottom: 0,
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
  },
  btnBack:{
    width: 50,
    height: 50,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  }
});