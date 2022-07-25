import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, Image, TouchableHighlight } from 'react-native';
import RNLocation from 'react-native-location';


export default function GPS({ navigation }) {
    const [acc, _acc] = useState()
    const [mock, _mock] = useState()
    const [lat, _lat] = useState()
    const [long, _long] = useState()
    const [time, setTime] = useState(Date.now());


    useEffect(() => {
        RNLocation.configure({
            // distanceFilter: 10, // Meters
            desiredAccuracy: {
                android: 'highAccuracy',
            },
            androidProvider: 'playServices',
            interval: 3000, // Milliseconds
            fastestInterval: 1000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            allowsBackgroundLocationUpdates: true
        })
        RNLocation.getLatestLocation({ timeout: 60000 })
            .then((locations) => {
                // console.log(locations)
                _acc(locations.accuracy)
                _mock(locations.fromMockProvider)
                _lat(locations.latitude)
                _long(locations.longitude)
            })
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, [time])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>GPS accuracy test</Text>
            <Text style={styles.title}>Latitude : {lat}</Text>
            <Text style={styles.title}>Longitude : {long}</Text>
            <Text style={styles.title}>Accuracy : {acc}</Text>
            {/* <Text style={styles.title}>Mock : {mock}</Text> */}
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