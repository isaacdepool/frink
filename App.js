import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Header } from './components/General/Header';
import { HomeScreen } from './components/Home';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <>
    <StatusBar style="light" 
    />
    <Header/>
      <NavigationContainer>
          <Stack.Navigator initialRouteName='home'>
            <Stack.Screen 
            name="home" 
            component={HomeScreen}
            options={{headerShown: false, unmountOnBlur:true}}
            // initialParams={{setNavBarShow, completeForm, setCompleteForm}}
            />
          </Stack.Navigator>
  
      </NavigationContainer>
    </>
  );
}
