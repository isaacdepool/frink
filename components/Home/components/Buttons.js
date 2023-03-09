import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import useStateRef from 'react-usestateref';

var s = require('../../../style');

export const Buttons = ({title='Hola', url}) => {

    const navigation = useNavigation();
    const [touchIn, setTouchIn, touchInRef] = useStateRef(false);
  return (
    <>
        <TouchableOpacity style={[styles.box, s.mx3, s.my1, s.bg_primary, s.contenedorCenter, touchInRef.current&& styles.btn_hover]}
        onPress={() => navigation.navigate(url)}
        onPressIn={() => setTouchIn(!touchInRef.current)}
        onPressOut={() => setTouchIn(!touchInRef.current)}
        >
            <Text style={[s.fontSize32, s.colorWhite]}>{title}</Text>
        </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
    box:{
        height: 200,
        borderRadius: 10
    },
    btn_hover:{
        backgroundColor: '#537FE7'
    }
});
