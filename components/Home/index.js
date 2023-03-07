import React, { useRef } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Home } from './Home'
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AddUsers } from './components/AddUsers';

var s = require('../../style');

export const HomeScreen = () => {
  const refRBSheet = useRef();
  return (
    <>
      <KeyboardAwareScrollView
      style={[s.bg_quarternary]}
      >
          <Home/>
      </KeyboardAwareScrollView>

      
      <TouchableOpacity style={[styles.btn, s.contenedorCenter, s.bg_secondary]}
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
  }
});
