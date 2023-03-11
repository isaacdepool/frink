import React, { useEffect } from 'react'
import { Roulette } from './Roulette'

import AsyncStorage from '@react-native-async-storage/async-storage';
import useStateRef from 'react-usestateref';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';

var s = require('../../style');

export const RouletteScreen = () => {

  const [dataQuestions, setDataQuestions, dataQuestionsRef] = useStateRef(null);
  const [dataUsers, setDataUsers, dataUsersRef] = useStateRef(null);

  useEffect(() => {
    AsyncStorage.getItem('questions')
      .then(data =>{

        const obj = JSON.parse(data);
        const objData = obj.filter(item => item.id == 1);
        setDataQuestions(objData[0]);

    }).catch(error =>  console.log(error , "error questions"));
  }, [])// get questions

  useEffect(() => {
    AsyncStorage.getItem('users').then(response => {

        if(response  != null) {  
        
            const data = JSON.parse(response);
            setDataUsers(data);
        }
    }).catch( error =>{
        console.log('Error',error);
    })
}, [])//get Users
  
  return (
    <>
      <KeyboardAwareScrollView
      style={[s.bg_tertiary, s.pt5]}
      >
          {
            (dataQuestionsRef.current && dataUsersRef.current)&&
            <Roulette
              dataQuestions={dataQuestionsRef.current}
              dataUsers={dataUsersRef.current}
            />
          }
      </KeyboardAwareScrollView>
    </>
  )
}