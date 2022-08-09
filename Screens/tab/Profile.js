import React, { useContext, useEffect, useState } from 'react';
import { Image, Button, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import Boundary from 'react-native-boundary';

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
          fetch(domain + 'profile/', {
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
          fetch(domain + 'logout/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data
            }
          })
          Boundary.remove('place')
            .then(() => console.log('Goodbye Chipotle :('))
            .catch(e => console.log('Failed to delete Chipotle :)', e))
          console.log('Token ' + data)
          // console.log(ReactNativeForegroundService.get_all_tasks());
          // ReactNativeForegroundService.remove_all_tasks();
          ReactNativeForegroundService.stop('taskid');
          ReactNativeForegroundService.remove_all_tasks();
          console.log(ReactNativeForegroundService.get_all_tasks());

          removeToken()
          setUserObj('')
          setIsLoggedIn(false)
          // if (ReactNativeForegroundService.is_task_running('taskid')) {
          //   console.log('remove_task')
          //   ReactNativeForegroundService.remove_task('taskid');
          // }
          navigation.replace('Login')
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <Image
        style={{
          aspectRatio: 1.5, resizeMode: 'contain', marginTop: 30, marginLeft: 45,
        }}
        source={{ uri: domain + 'user_images/' + idcard + '.jpg' }}
      />
      <Text style={styles.text1}>{name} {lastname}</Text>
      <Text style={styles.text3}>{idcard}</Text>
      <Text style={styles.text2}>{numbers}</Text>
      <Text style={styles.text2}>{email}</Text>
      <View style={styles.rect1Column}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.button1}
        >
          <Text style={styles.singIn}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={styles.button2}
        >
          <Text style={styles.singUp}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)"
  },
  text1: {
    color: "rgba(0,0,0,255)",
    fontSize: 30,
    width: '100%',
    // height: 112,
    textAlign: "center",
    marginTop: 30,
    // marginBottom: 20,
  },
  text3: {
    color: "rgba(0,0,0,255)",
    fontSize: 30,
    width: '100%',
    // height: 112,
    textAlign: "center",
    // marginTop: 30,
    marginBottom: 20,
  },
  text2: {
    color: "rgba(0,0,0,255)",
    fontSize: 20,
    width: '100%',
    textAlign: "center",
    marginBottom: 2,
  },
  button1: {
    height: 44,
    backgroundColor: "rgba(37,205,236,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,

  },
  singIn: {
    color: "rgba(0,0,0,1)",
    alignSelf: "center"
  },
  button2: {
    height: 44,
    backgroundColor: "rgba(37,205,236,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  singUp: {
    color: "rgba(0,0,0,1)",
    alignSelf: "center"
  },
  rect1Column: {
    marginBottom: 188,
    marginLeft: 41,
    marginRight: 41
  }
});