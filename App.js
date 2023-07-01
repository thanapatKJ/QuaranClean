import React from 'react';
import {  View } from 'react-native';

import Navigator from './components/Navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from './components/globalContext/globalContext';

// import RootScreen from './components/task/RootScreen';
console.disableYellowBox = true;
// LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}