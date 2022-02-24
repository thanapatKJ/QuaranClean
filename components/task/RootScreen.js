import React, { useContext, useEffect, useState } from 'react';
import { View } from "react-native";

import { PermissionsAndroid } from 'react-native';
import RNLocation from 'react-native-location';
import { Context } from '../globalContext/globalContext';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

RNLocation.configure({
    distanceFilter: 10, // Meters
    desiredAccuracy: {
        android: 'highAccuracy',
    },
    androidProvider: 'playServices',
    interval: 5000, // Milliseconds
    fastestInterval: 1000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
});
let locationSubscription = null;

export default function RootScreen() {
    const globalContext = useContext(Context)
    const { domain, getToken } = globalContext;

    useEffect(() => {
        onStart()
        // check()
    }, [])

    const check = () => {
        console.log('check rootscreen')
        getToken().then(data => {
            fetch(domain + 'check/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + data
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw res.json()
                    }
                })
                .then(json => {
                    console.log(json)
                })
        })
    }

    // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
    const onStart = () => {
        console.log('onStart')
        if (ReactNativeForegroundService.is_task_running('taskid')) return;
        // Creating a task.
        console.log('add task taskid')
        ReactNativeForegroundService.add_task(
            () => {
                RNLocation.requestPermission({
                    android: {
                        detail: 'fine',
                    },
                }).then((granted) => {
                    // if has permissions try to obtain location with RN location
                    if (granted) {
                        locationSubscription = RNLocation.subscribeToLocationUpdates(
                            ([locations]) => {
                                // console.log(locations);
                                locationSubscription();
                            },
                        );
                    }
                    else {
                        locationSubscription && locationSubscription();
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