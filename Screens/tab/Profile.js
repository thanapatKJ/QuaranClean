import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

export default function Profile({ navigation, props }) {
  const globalContext = useContext(Context)
  const {
    setIsLoggedIn, domain,
    setUserObj,
    getToken,
    removeToken } = globalContext;

  const [name, _name] = useState('');
  const [lastname, _lastname] = useState('');
  const [idcard, _idcard] = useState('');
  const [numbers, _numbers] = useState('');
  const [email, _email] = useState('');

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Profile Screen')
      getToken()
        .then(data => {
          fetch(domain+'profile/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data
            }
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
    })
    return unsubscribe;
  })

  function logout() {
    try {
      getToken()
        .then(data => {
          console.log('getToken Data ' + data)
          fetch(domain+'logout/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data
            }
          })
          console.log('Token ' + data)
          removeToken()
          setUserObj('')
          setIsLoggedIn(false)
          ReactNativeForegroundService.stop();
          navigation.replace('Login')
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <Header />
      <Text>Name {name} {lastname}</Text>
      <Text>ID card Number: {idcard}</Text>
      <Text>Phone Number: {numbers}</Text>
      <Text>Email: {email}</Text>
      <Button
        title='change password'
        onPress={() => navigation.navigate('ChangePassword')}
      />
      <Button
        title='Sign Out'
        onPress={logout}
      />
    </SafeAreaView>
  );

}