import React, { useContext } from 'react';
import { LogBox, View } from 'react-native';

import Navigator from './components/Navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { Context,Provider } from './components/globalContext/globalContext';

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