import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, Image, TouchableHighlight } from 'react-native';
import RNLocation from 'react-native-location';


export default function TestGPS({ navigation }) {
    const [acc, _acc] = useState()
    const [acc5, _acc5] = useState(0)
    const [acc58, _acc58] = useState(0)
    const [acc810, _acc810] = useState(0)
    const [acc10, _acc10] = useState(0)
    const [time, setTime] = useState(Date.now());

    RNLocation.configure({
        // distanceFilter: 10, // Meters
        desiredAccuracy: {
            android: 'highAccuracy',
        },
        androidProvider: 'playServices',
        interval: 3000, // Milliseconds
        fastestInterval: 1000, // Milliseconds
        maxWaitTime: 3500, // Milliseconds
        allowsBackgroundLocationUpdates: true
    })
    useEffect(() => {
        RNLocation.getLatestLocation({ timeout: 3000 })
            .then((locations) => {
                console.log(acc)
                _acc(locations.accuracy)
                if (parseFloat(acc) < 5.0) {
                    _acc5(acc5 + 1)
                } else if (parseFloat(acc) < 8.0) {
                    _acc58(acc58 + 1)
                } else if (parseFloat(acc) < 10.0) {
                    _acc810(acc810 + 1)
                } else if (parseFloat(acc) >= 10.0) {
                    _acc10(acc10 + 1)
                }
            })
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [time])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>GPS accuracy test</Text>
            <Text style={styles.title}>Estimated accuracy : {acc}</Text>
            <Text style={styles.title}>Accuracy less than 5 count : {acc5}</Text>
            <Text style={styles.title}>Accuracy 5-8 : {acc58}</Text>
            <Text style={styles.title}>Accuracy 8-10 count : {acc810}</Text>
            <Text style={styles.title}>Accuracy more than 10 count : {acc10}</Text>
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize: 30,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});