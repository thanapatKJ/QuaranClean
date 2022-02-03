import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import { Context } from '../../components/globalContext/globalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, route, props }) {
  const globalContext = useContext(Context)
  const {
    isLoggedIn, setIsLoggedIn,
    userObj, setUserObj,
    setToken, getToken } = globalContext;

  const [idcard, _idcard] = useState();
  const [password, _password] = useState("");
  const [result, _result] = useState();
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Login Screen')
      getToken()
        .then(data => {
          fetch('http://192.168.175.50:8000/api/check/', {
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
              console.log(json)
              // console.log('status ' + json.status)
              if (json.status === "success") {
                setUserObj(json)
                setIsLoggedIn(true)
                navigation.replace('Tab')
              }
            })
        })
        .catch(error => {
          console.log("ERROR " + error)
        })
    })
    return unsubscribe;
  })
  function sendLoginData() {
    setError("")
    let body = JSON.stringify({
      'username': idcard,
      'password': password
    })
    fetch('http://192.168.175.50:8000/api/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError("Invalid Credentials")
          throw res.json()
        }
      })
      .then(json => {
        setUserObj(json)
        setToken(json.token)
        getToken()
          .then(data => {
            console.log('data ' + data)
          })
          .then(value => {
            console.log('value ' + value)
          })
        setIsLoggedIn(true)
        navigation.replace('Tab')
      })
      .catch(error => {
        console.log(error)
      })

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to QuaranClean</Text>
      <Text style={{ color: '#cc0404' }}>{error}</Text>
      <TextInput
        style={styles.input}
        placeholder="ID card Number"
        keyboardType="number-pad"
        onChangeText={idcard => _idcard(idcard)}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={password => _password(password)}
      />
      <View>
        <Button
          title="Sign In"
          onPress={sendLoginData}
        />
      </View>
      <View style={styles.separator} />
      <View>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
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
  },
});