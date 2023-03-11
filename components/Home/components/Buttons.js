import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import useStateRef from 'react-usestateref';

var s = require('../../../style');

export const Buttons = ({
    title='Hola', 
    url, 
    bgcolor=s.bg_primary, 
    color=s.colorWhite,
    Icon,
    idQuestions
}) => {

    const navigation = useNavigation();
    const [touchIn, setTouchIn, touchInRef] = useStateRef(false);

    const goToRoulette = () =>{

        const dataCache = {
            idQuestions: idQuestions,
            bg_color: bgcolor,
            title_color: color,
            Icon: Icon
        }
        navigation.navigate(url, dataCache);
    }

  return (
    <>
        <TouchableOpacity style={[styles.box, bgcolor, s.mx3, s.my1, s.contenedorCenter, touchInRef.current&& styles.btn_hover]}
        onPress={goToRoulette}
        onPressIn={() => setTouchIn(!touchInRef.current)}
        onPressOut={() => setTouchIn(!touchInRef.current)}
        >
            <Icon 
            width= '90%'
            height='90%'
            style={[styles.icon]}
            />
            <Text style={[s.fontSize32, s.textCenter, color, s.fontFamily1, styles.text]}>{title}</Text>
        </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
    text:{letterSpacing: 4, textShadowColor:'#000', 
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10},
    box:{
        height: 200,
        borderRadius: 10
    },
    btn_hover:{
        backgroundColor: '#537FE7'
    },
    icon:{
        position: 'absolute',
        bottom: 0,
        transform: [{ rotate: '20deg'}],
        left: '-20%',
        zIndex: -99
    },
});
