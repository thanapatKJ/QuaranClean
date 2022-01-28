import React, { Component } from 'react';
import { StyleSheet, Button, View, Text} from 'react-native';

export default class Map extends Component {
    render() {
        return (
            <View>
                <Text>Current Location Without Maps</Text>
                <Text>Latitude : 13.72791061004847</Text>
                <Text>Longitude : 100.55003259290271</Text>
            </View>
        );
    }
}