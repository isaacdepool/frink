import 'expo-dev-client';

if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


import Reactotron from 'reactotron-react-native'
Reactotron.log('hello rendering world')

import { registerRootComponent } from 'expo';
import {Text, TextInput} from 'react-native';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

//ADD this 
if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}