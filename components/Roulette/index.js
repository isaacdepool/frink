import React, { useEffect } from 'react'
import { Roulette } from './Roulette'

import AsyncStorage from '@react-native-async-storage/async-storage';
import useStateRef from 'react-usestateref';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var s = require('../../style');

export const RouletteScreen = ({route}) => {

  const routeParams = route.params;

  const [dataQuestions, setDataQuestions, dataQuestionsRef] = useStateRef(null);
  const [dataUsers, setDataUsers, dataUsersRef] = useStateRef(null);
  const [icons, setIcons, iconsRef] = useStateRef(null);
  const [bg_color, setBg_color, bg_colorRef] = useStateRef(null);
  const [title_color, setTitle_color, title_colorRef] = useStateRef(null);

  useEffect(() => {
    AsyncStorage.getItem('questions')
      .then(data =>{

        const obj = JSON.parse(data);
        const objData = obj.filter(item => item.id == routeParams?.idQuestions);
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

  useEffect(() => {
    if(routeParams){
      setBg_color(routeParams.bg_color);
      setTitle_color(routeParams.title_color)
    }
  }, [])//get params
  
  return (
    <>
      <KeyboardAwareScrollView
      style={[bg_colorRef.current ? bg_colorRef.current : s.bg_tertiary , s.pt5]}
      >
          {
            (dataQuestionsRef.current && dataUsersRef.current)&&
            <Roulette
              dataQuestions={dataQuestionsRef.current}
              dataUsers={dataUsersRef.current}
              Icon={routeParams.Icon}
              bg_color={bg_colorRef.current}
              title_color={title_colorRef.current}
            />
          }
      </KeyboardAwareScrollView>
    </>
  )
}