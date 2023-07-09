import React, { useContext, useEffect, useState } from 'react';
import { View, Alert } from "react-native";

import RNLocation from 'react-native-location';
import { Context } from '../globalContext/globalContext';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import Boundary, { Events } from 'react-native-boundary';
import moment from 'moment/moment';

import PushNotification from 'react-native-push-notification';

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
                
                console.log('Date : ', moment().utcOffset('+07:00').format('HH:mm:ss'))
                switch (moment().utcOffset('+07:00').format('HH:mm:ss')) {
                    case "09:00:00":
                    case "12:00:00":
                    case "15:00:00":
                    case "18:00:00":
                    case "21:00:00":
                    // case "03:47:20": //test
                    // case "03:37:00": //test

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
                                        if (json.quarantine_status === "unverified") {
                                            PushNotification.removeAllDeliveredNotifications();
                                            PushNotification.localNotification({
                                                channelId: "VerifyTime",
                                                title: "Please verify yourself.",
                                                message: "Please Verify yourself via QuaranClean Application inside your place within 30 minutes.",
                                                priority: "high",
                                            })
                                        }
                                    })
                            })
                            .catch(error => {
                                Alert.alert("ERROR " + error)
                            })
                        break;
                    case "00:00:10":
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
                                        if (json.usedStatus) {
                                            PushNotification.removeAllDeliveredNotifications();
                                            PushNotification.localNotification({
                                                channelId: "VerifyTime",
                                                title: "End of your quarantine.",
                                                message: "Congratulation, It's the end of your quarantine. God bless you",
                                                priority: "high",
                                            })
                                        }
                                    })
                            })
                            .catch(error => {
                            })
                        break;
                }
                RNLocation.getLatestLocation({ timeout: 60000 })
                    .then((locations) => {
                        console.log(locations)
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
                        if (json.status  && json.quarantine_status!="inactive") {
                            Boundary.add({
                                lat: parseFloat(json.lat),
                                lng: parseFloat(json.long),
                                radius: parseFloat(json.radius), // in meters
                                id: 'place',
                            })
                            Boundary.on(Events.ENTER, id => {
                                RNLocation.getLatestLocation({ timeout: 60000 })
                                    .then((locations) => {
                                        if (locations.accuracy <= 20) {
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
                                        if (locations.accuracy <= 20) {
                                            // PushNotification.removeAllDeliveredNotifications();
                                            PushNotification.localNotification({
                                                channelId: "Outside",
                                                title: "You are outside of your quarantine place.",
                                                message: "Please go inside your quarantine place in 5 minutes.",
                                                priority: "high",
                                            })
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