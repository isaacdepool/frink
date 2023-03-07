import React from 'react'
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

var s = require('../../style');

export const Header = () => {
  return (
    <>
        <View style={[styles.box, s.bg_secondary]}>
            <View style={[s.contenedorFlexSpaceBetween, s.m3]}>
                <Text>Logo</Text>
                <Text>Icon</Text>
            </View>
        </View>
    </>
  )
}
const styles = StyleSheet.create({
    box:{
        paddingTop: 50,
    }
});
