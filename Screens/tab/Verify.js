import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import { fonts } from 'react-native-elements/dist/config';
import Header from '../../components/Header';


export default function Verify({ navigation }) {
  sendVerify = () => {
    Alert.alert("Send Verify Signal to server")
  }
  return (
    <SafeAreaView>
      <Header />
      <Text style={styles.title}>Verify</Text>
      <Text style={styles.title}>Next time 16:00</Text>
      <Button
        title="Press To Verify"
        onPress={sendVerify} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 36,
  },
});