import React from 'react'
import { View  } from 'react-native';
import { Buttons } from './components/Buttons';

var s = require('../../style');

export const Home = () => {

  return (
    <>
        <View style={[s.mt5]}>
            <Buttons
            title='Caso 1'
            url='/home'
            />

            <Buttons
            title='Caso 1'
            url='/home'
            />

            <Buttons
            title='Caso 1'
            url='/home'
            />
        </View>
    </>
  )
}
