import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';
import { Easing, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import Wave from '../../assets/icons/wave.png';

import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from '../utils/constants';

var s = require('../../style');

export const Header = () => {

   //Animation Burbu
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [0, 300],
  });

  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);


  return (
    <>
    <View
      style={styles.box}
    >
    {/* <Image source={Wave} style={[styles.img]} /> */}
    <AnimetedImage
            // resizeMode="repeat" 
            style={[styles.background,{
                transform: [
                    {
                      translateX: translateAnimation,
                    },
                    {
                      translateY: 0,
                    },
                  ],
            }]}
            source={Wave} />
    </View>
      <Text style={[styles.title, s.fontSize40, s.mx3, s.colorYellow, s.fontFamily2]}>FRINK</Text>
    </>
  )
}
const styles = StyleSheet.create({
    box:{
        // paddingTop: 50,
        height: 100,
        backgroundColor:'#fff'
    },
    title:{
        letterSpacing: 4, 
        textShadowColor:'#000', 
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:1
    },
    background: {
      position: 'absolute',
      width: '150%',
      height: 500,
      top: 50,
      left: -300,
      // opacity: 0.2,
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
