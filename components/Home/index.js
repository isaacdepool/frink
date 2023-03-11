import React, { useEffect, useRef } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Home } from './Home'
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AddUsers } from './components/AddUsers';
import { Header } from '../General/Header';
import { Dimensions } from 'react-native';

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


var s = require('../../style');

export const HomeScreen = () => {
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
  return (
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
          <Home/>
      </KeyboardAwareScrollView>

      <TouchableOpacity style={[styles.btn, s.contenedorCenter, s.bg_quarternary]}
        onPress={() => refRBSheet.current.open()}
      >
            <Text style={[s.fontSize30, s.colorWhite, s.fontWeightBold]}>+</Text>
      </TouchableOpacity>
      
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
          <AddUsers/>
        </RBSheet>
      </View>
    </View>
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
