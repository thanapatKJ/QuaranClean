import React from 'react'
import {Dimensions, StyleSheet, View, Text } from 'react-native';

const { width, height } = Dimensions.get('window');
const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>QuaranClean</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        height: 60,
        // height: '8.198%',
        paddingTop: 12,
        backgroundColor: 'darkblue',
    },
    text: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    }
})

export default Header;