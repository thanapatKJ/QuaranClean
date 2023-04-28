import React, { useContext, useEffect, useState } from 'react';
import { View, Alert } from "react-native";

import { PermissionsAndroid } from 'react-native';
import RNLocation from 'react-native-location';
import { Context } from '../globalContext/globalContext';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import Boundary, { Events } from 'react-native-boundary';

RNLocation.configure({
    distanceFilter: 10, // Meters
    desiredAccuracy: {
        android: 'highAccuracy',
    },
    androidProvider: 'playServices',
    interval: 5000, // Milliseconds
    fastestInterval: 1000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    allowsBackgroundLocationUpdates: true
})
// RNLocation.requestPermission({
//     ios: "whenInUse",
//     android: {
//         detail: "fine"
//     }
// }).then(granted => {
//     if (granted) {
//         this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
//             console.log(locations)
//         })
//     }
//     else {
//         console.log('false')
//     }
// })
export default function RootScreen() {
    const globalContext = useContext(Context)
    const { domain, getToken } = globalContext;

    useEffect(() => {
        onStart()
    }, [])
    const onStart = () => {
        console.log('onStart')
        if (ReactNativeForegroundService.is_task_running('taskid'))
            return;
        // Creating a task.
        console.log('add task taskid')
        ReactNativeForegroundService.add_task(
            () => {

                RNLocation.getLatestLocation({ timeout: 60000 })
                    .then((locations) => {
                        // console.log(locations.fromMockProvider)
                        if (locations.fromMockProvider) {
                            Alert.alert('Spoofing GPS location is deteced')
                        }
                    })
            },
            {
                delay: 1000,
                onLoop: true,
                taskId: 'taskid',
                onError: (e) => console.log('Error logging:', e),
            },
        );
        Boundary.remove('place')
            .then(() => console.log('Goodbye Chipotle :('))
            .catch(e => console.log('Failed to delete Chipotle :)', e))
        Boundary.off(Events.ENTER)
        Boundary.off(Events.EXIT)
        getToken()
            .then(data => {
                fetch(domain + 'quarantine/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + data
                    },
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                        } else {
                            throw res.json()
                        }
                    })
                    .then(json => {
                        if (json.status) {
                            Boundary.add({
                                lat: parseFloat(json.lat),
                                lng: parseFloat(json.long),
                                radius: parseFloat(json.radius), // in meters
                                id: 'place',
                            })
                            Boundary.on(Events.ENTER, id => {
                                RNLocation.getLatestLocation({ timeout: 60000 })
                                    .then((locations) => {
                                        if (locations.accuracy <= 15) {
                                            getToken().then(data => {
                                                fetch(domain + 'enterexit/', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Token ' + data
                                                    },
                                                    body: JSON.stringify({
                                                        'action': 'enter'
                                                    })
                                                }).then(res => {
                                                    if (res.ok) {
                                                        return res.json()
                                                    } else {
                                                        throw res.json()
                                                    }
                                                })
                                                    .then(json => { console.log(json) })
                                            })
                                        }
                                    })

                            });

                            Boundary.on(Events.EXIT, id => {
                                RNLocation.getLatestLocation({ timeout: 60000 })
                                    .then((locations) => {
                                        if (locations.accuracy <= 15) {
                                            getToken().then(data => {
                                                fetch(domain + 'enterexit/', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Token ' + data
                                                    },
                                                    body: JSON.stringify({
                                                        'action': 'exit'
                                                    })
                                                }).then(res => {
                                                    if (res.ok) {
                                                        return res.json()
                                                    } else {
                                                        throw res.json()
                                                    }
                                                })
                                                    .then(json => { console.log(json) })
                                            })
                                        }
                                    })
                            })
                        }
                    })
            })
        console.log('add place')
        return ReactNativeForegroundService.start({
            id: 144,
            title: "QuaranClean",
            message: "You are online!",
        });
    }

    return (
        <View>
        </View>
    )
}