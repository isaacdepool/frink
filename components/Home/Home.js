import React from 'react'
import { View  } from 'react-native';
import { Buttons } from './components/Buttons';
import BeerIcon from '../../assets/icons/beer.svg';
import MargaritaIcon from '../../assets/icons/margarita.svg';
import ShotIcon from '../../assets/icons/shot.svg';

var s = require('../../style');

export const Home = () => {

  return (
    <>
        <View style={[s.mt5, {zIndex: 99}]}>
            <Buttons
            title='Drinking Questions'
            url='roulette'
            bgcolor={[s.bg_tertiary]}
            color={[s.Color_quarternary]}
            Icon={BeerIcon}
            idQuestions={1}
            />

            <Buttons
            title='Never have I ever'
            url='roulette'
            bgcolor={[s.bg_quarternary]}
            color={[s.colorWhite]}
            Icon={MargaritaIcon}
            idQuestions={2}
            />

            <Buttons
            title='Hot Shot'
            url='roulette'
            color={[s.colorRed]}
            Icon={ShotIcon}
            idQuestions={3}
            />
        </View>
    </>
  )
}
