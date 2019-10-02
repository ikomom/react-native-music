/**
 * @format
 */
if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
}

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
  'Remote debugger is in a background tab which may cause apps to perform slowly',
  'componentWillReceiveProps has been renamed',
  'AsyncStorage has been extracted',
]);

AppRegistry.registerComponent(appName, () => App);
