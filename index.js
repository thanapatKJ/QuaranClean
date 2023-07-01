import 'react-native-gesture-handler';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PermissionsAndroid } from 'react-native';

import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

// Register the service
ReactNativeForegroundService.register();
// // Start Notification
// ReactNativeForegroundService.start({
//     id: 144,
//     title: "QuaranClean",
//     message: "Using GPS Location.",
// });


// PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_ฺBACKGROUND_LOCATION).then(response => {
//     console.log(response)
// })


// PushNotification.configure({
//     // onNotification: function (notification) {
//     //     console.log("NOTIFICATION:", notification);
        
//     // },
//     onAction: function (notification) {
//         console.log("ACTION:", notification.action);
//         console.log("NOTIFICATION:", notification);
//     },
//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: Platform.OS === 'ios',
// });

AppRegistry.registerComponent(appName, () => App);