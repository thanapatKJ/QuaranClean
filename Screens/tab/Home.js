import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';
import { useIsFocused } from '@react-navigation/native';

// import Map from '../../components/Maps_test';
import Map from '../../components/Maps';

export default function Home({ navigation }) {
  const globalContext = useContext(Context)
  const {
    isLoggedIn, setIsLoggedIn,
    userObj, setUserObj,
    setToken, getToken,
    removeToken } = globalContext;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getToken()
        .then(data => {
          fetch('http://192.168.175.50:8000/api/quarantine/', {
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
                // setError("Invalid Credentials")
                throw res.json()
              }
            })
            .then(json => {
              console.log('EMAIL ' + json.email)
              _name(json.first_name)
              _lastname(json.last_name)
              _idcard(json.id_cards)
              _numbers(json.numbers)
              _email(json.email)
            })
        })
        .catch(error => {
          console.log("ERROR " + error)
        })
    }
  })
  return (
    <View>
      <Header />
      <Map />
    </View>
  );
}
