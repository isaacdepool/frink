import React, { useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Home } from './Home'
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AddUsers } from './components/AddUsers';
import { Header } from '../General/Header';
import { Dimensions } from 'react-native';
import { Modals } from '../General/Modals';

import { Animated, Easing, ImageBackground } from 'react-native';

import backgroundImage from '../../assets/icons/burbujas.png';
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStateRef from 'react-usestateref';
import { ModalHook } from '../hooks/ModalHook';


var s = require('../../style');

export const HomeScreen = ({}) => {

  const showModal = useRef();
  const [numberOfUsers, setnumberOfUsers, numberOfUsersRef] = useStateRef(0);

  //Animation Burbu
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

  const refRBSheet = useRef();

  useEffect(() => {

    AsyncStorage.getItem('users').then(response => {

      if(response  != null) {  
        const data = JSON.parse(response);
        setnumberOfUsers(data.length);
      }  
    });
  }, []); //Get Users

  const handleAcceptAction = () =>{
    showModal.current.resetModal();
    
    setTimeout(() => {
      
      refRBSheet.current.open();
    }, 100);
  }

  return (
    <>
      <ModalHook
      ref={showModal}
      acceptAction={handleAcceptAction}
      />

      <View style={[{backgroundColor: '#E7B10A', minHeight: Dimensions.get('window').height + 50}]}>
        <AnimetedImage 
          resizeMode="repeat" 
          style={[styles.background,{
              transform: [
                  {
                    translateX: 0,
                  },
                  {
                    translateY: translateAnimation,
                  },
                ],
          }]}
          source={backgroundImage} />
        <Header/>

        <KeyboardAwareScrollView
        style={[{backgroundColor: 'transparent'}]}
        >
            <Home
              showModal={showModal}
              numberOfUsers={numberOfUsersRef.current}
              refRBSheet={refRBSheet}
            />
        </KeyboardAwareScrollView>

        {/* Button add users to open bottom-sheet */}
        <TouchableOpacity style={[styles.btn, s.contenedorCenter, s.bg_quarternary]}
          onPress={() => refRBSheet.current.open()}
        >
              <Text style={[s.fontSize30, s.colorWhite, s.fontWeightBold]}>+</Text>
        </TouchableOpacity>
        

        {/* bottom sheet  */}
        <View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            closeOnPressMask={true}
            keyboardAvoidingViewEnabled={true}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent"
              },
              draggableIcon: {
                backgroundColor: "#000"
              }
            }}
          >
            <AddUsers
              setnumberOfUsers={setnumberOfUsers}
            />
          </RBSheet>
        </View>
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  btn:{
      position: 'absolute',
      bottom: 20,
      right: 10,
      height: 70,
      width: 70,
      borderRadius: 100,
  },
  background: {
    position: 'absolute',
    width: 1200,
    height: 2500,
    top: 0,
    opacity: 0.2,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],      
  }, 
});
