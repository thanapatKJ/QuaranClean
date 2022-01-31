import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import { useIsFocused } from '@react-navigation/native';
import { Context } from '../../components/globalContext/globalContext';


export default function QuarantinePlace({ navigation }) {
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
          fetch('http://192.168.175.50:8000/api/profile/', {
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

  sendPlaceData = () => {

  }
  return (
    <SafeAreaView>
      <Header />
      <Text style={styles.title}>Quarantine Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
      // onChangeText={(text)=>this.setState({name:text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="numeric"
      // onChangeText={(text)=>this.setState({lati:text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Longtitude"
        keyboardType="numeric"
      // onChangeText={(text)=>this.setState({longi:text})}
      />
      <TextInput
        style={styles.input}
        placeholder="radius(meters)"
        keyboardType="number-pad"
      // onChangeText={(text)=>this.setState({detail:text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Detail"
      // onChangeText={(text)=>this.setState({detail:text})}
      />


      <Button title="Confirm" onPress={sendPlaceData} />
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
    fontSize: 36,
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
    color: 'black'
  },
});