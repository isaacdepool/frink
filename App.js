import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';


import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { Header } from './components/General/Header';
import { HomeScreen } from './components/Home';
import { RouletteScreen } from './components/Roulette';
import jsonData from './jsonData';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
const customFonts = {
  ClimateCrisisRegular: require('./assets/Fonts/ClimateCrisis-Regular.ttf'),
  LibreBaskervilleRegular: require('./assets/Fonts/LibreBaskerville-Regular.ttf'),
};

export default function App() {
  
  const dataQuestions = [
    {
      id: 1,
      title: 'Drinking Questions',
      items: jsonData.questionsDrink
    },
    {
      id: 2,
      title: 'Never have i ever',
      items: jsonData.never
    },
  ]

  useEffect(() => {

    // AsyncStorage.removeItem('questions');

    AsyncStorage.getItem('questions').then(response => {

      if(response  == null) {  
        AsyncStorage.setItem('questions', JSON.stringify(dataQuestions)).then().catch(error =>  console.log(error , "error questions"));
      }  
    });
  }, []); //Get Questions
  
  const [isLoaded] = useFonts(customFonts);

    if (!isLoaded) {
      return;
    }

  return (
    <>
    <StatusBar style="dark" 
    />
    {/* <Header/> */}
      <NavigationContainer>
          <Stack.Navigator initialRouteName='home'>
            <Stack.Screen 
            name="home" 
            component={HomeScreen}
            options={{headerShown: false, unmountOnBlur:true}}
            // initialParams={{setNavBarShow, completeForm, setCompleteForm}}
            />
            <Stack.Screen 
            name="roulette" 
            component={RouletteScreen}
            options={{
              headerShown: false,
              unmountOnBlur:true,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation:'slide_from_right'
            }}
            // initialParams={{setNavBarShow, completeForm, setCompleteForm}}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
