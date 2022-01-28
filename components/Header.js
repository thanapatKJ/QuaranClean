import React from 'react'
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,TextInput } from 'react-native';

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