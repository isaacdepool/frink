import React from 'react'
import { View  } from 'react-native';
import { Buttons } from './components/Buttons';
import BeerIcon from '../../assets/icons/beer.svg';
import MargaritaIcon from '../../assets/icons/margarita.svg';

var s = require('../../style');

export const Home = () => {

  return (
    <>
        <View style={[s.mt5, {zIndex: 99}]}>
            <Buttons
            title='Questions Drink'
            url='roulette'
            bgcolor={[s.bg_tertiary]}
            color={[s.Color_quarternary]}
            Icon={BeerIcon}
            />

            <Buttons
            title='Caso 1'
            url='/home'
            bgcolor={[s.bg_quarternary]}
            color={[s.colorWhite]}
            Icon={MargaritaIcon}
            />

            <Buttons
            title='Caso 1'
            url='/home'
            color={[s.Color_quarternary]}
            Icon={BeerIcon}
            />
        </View>
    </>
  )
}
