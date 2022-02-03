import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import { fonts } from 'react-native-elements/dist/config';
import { useEffect } from 'react/cjs/react.development';
import Header from '../../components/Header';


export default function Verify({ navigation }) {
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Verify Screen')
    })
    return unsubscribe;
  })

  function sendVerify(){
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