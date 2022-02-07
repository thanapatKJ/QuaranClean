import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { PermissionsAndroid } from 'react-native';
import RNLocation from 'react-native-location';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

RNLocation.configure({
    distanceFilter: 5, // Meters
    desiredAccuracy: {
        android: 'highAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 1000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
});
let locationSubscription = null;
let locationTimeout = null;

export default function RootScreen() {
    console.log('root')
    // request the permission before starting the service.
    useEffect(() => {
        // console.log('root')
        // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_ฺBACKGROUND_LOCATION).then(response => { 
        //     console.log(response)
        // })

        // const requestPermission = async () => {
        // const backgroundgranted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        //     {
        //         title: 'Background Location Permission',
        //         message:
        //             'We need access to your location ' +
        //             'so you can get live quality updates.',
        //         buttonNeutral: 'Ask Me Later',
        //         buttonNegative: 'Cancel',
        //         buttonPositive: 'OK',
        //     },
        // );
        if (PermissionsAndroid.RESULTS.GRANTED) {
            //do your thing!
            // console.log(PermissionsAndroid.RESULTS.GRANTED)
            // console.log('GRANTED')

            ReactNativeForegroundService.add_task(
                () => {
                    RNLocation.requestPermission({
                        android: {
                            detail: 'fine',
                        },
                    }).then((granted) => {
                        console.log('Location Permissions: ', granted);
                        // if has permissions try to obtain location with RN location
                        if (granted) {
                            locationSubscription = RNLocation.subscribeToLocationUpdates(
                                ([locations]) => {
                                    console.log('suv')
                                    locationSubscription();
                                    // locationTimeout && clearTimeout(locationTimeout);
                                    console.log(locations);
                                },
                            );
                        }
                        else {
                            locationSubscription && locationSubscription();
                            locationTimeout && clearTimeout(locationTimeout);
                            console.log('no permissions to obtain location');
                        }
                    });
                },
                {
                    delay: 1000,
                    onLoop: true,
                    taskId: 'taskid',
                    onError: (e) => console.log('Error logging:', e),
                },
            );
        }
        // }
        // requestPermission();
    }, [])
    return (
        <View>
            {/* <Text>Welcome to the location tracking application.</Text> */}
        </View>
    )
}