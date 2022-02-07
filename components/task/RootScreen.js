import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from "react-native";

import { PermissionsAndroid } from 'react-native';
import RNLocation from 'react-native-location';
import { Context } from '../globalContext/globalContext';

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
    const globalContext = useContext(Context)
    const { domain, getToken,
        getLocation, setLocation, removeLocation,
        getStatus, setStatus, removeStatus } = globalContext;
    useEffect(() => {
        onStart()
    }, [])

    // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
    const onStart = () => {
        console.log('onStart')
        if (ReactNativeForegroundService.is_task_running('taskid')) return;
        // Creating a task.
        ReactNativeForegroundService.add_task(
            () => {
                RNLocation.requestPermission({
                    android: {
                        detail: 'fine',
                    },
                }).then((granted) => {
                    // console.log('Location Permissions: ', granted);
                    // if has permissions try to obtain location with RN location
                    if (granted) {
                        locationSubscription = RNLocation.subscribeToLocationUpdates(
                            ([locations]) => {
                                // console.log('subscribe location')
                                // locationTimeout && clearTimeout(locationTimeout);
                                console.log(locations);
                                getStatus().then(data =>{
                                    console.log('root status get '+data)
                                })
                                getToken().then(data => {
                                    console.log('root token get '+data)
                                })
                                locationSubscription();
                            },
                        );
                    }
                    else {
                        locationSubscription && locationSubscription();
                        // locationTimeout && clearTimeout(locationTimeout);
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

        return ReactNativeForegroundService.start({
            id: 144,
            title: "QuaranClean",
            message: "You are online!",
        });
    }

    return (
        <View>
            {/* <Text>Welcome to the location tracking application.</Text> */}
        </View>
    )
}