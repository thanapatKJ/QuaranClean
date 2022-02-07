import 'react-native-gesture-handler';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PermissionsAndroid } from 'react-native';

// Register the service
ReactNativeForegroundService.register();
// Start Notification
ReactNativeForegroundService.start({
    id: 144,
    title: "QuaranClean",
    message: "Using GPS Location.",
});


// PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_ฺBACKGROUND_LOCATION).then(response => {
//     console.log(response)
// })

AppRegistry.registerComponent(appName, () => App);