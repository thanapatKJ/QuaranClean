import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Context } from "../../components/globalContext/globalContext";
import RNLocation from 'react-native-location';

import PushNotification from 'react-native-push-notification';

export default function Login({ navigation }) {
  const globalContext = useContext(Context)
  const {
    setIsLoggedIn,
    setUserObj, domain,
    setToken, getToken,
    _regImg } = globalContext;

  const [idcard, _idcard] = useState();
  const [password, _password] = useState("");
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _regImg(require('../../assets/images/portrait.png'))
      console.log('Login Screen')
      getToken()
        .then(data => {
          // console.log('token : ' + data)
          fetch(domain + 'check/', {
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


  // function notify() {
  //   PushNotification.localNotification({
  //     channelId: "Verify",
  //     title: "Verify yourself.",
  //     message: "Please verify yourself within 30 minutes"
  //   })
  // }
  function sendLoginData() {
    console.log(domain)
    console.log('sendLoginData')
    setError("")
    RNLocation.configure({
      // distanceFilter: 10, // Meters
      desiredAccuracy: {
        android: 'highAccuracy',
      },
      androidProvider: 'playServices',
      interval: 3000, // Milliseconds
      fastestInterval: 1000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      allowsBackgroundLocationUpdates: true
    })
    RNLocation.getLatestLocation({ timeout: 60000 })
      .then((locations) => {
        if (locations.fromMockProvider) {
          Alert.alert('Spoofing GPS location is deteced\nPlease uninstall it.')
        }
        else {
          let body = JSON.stringify({
            'username': idcard,
            'password': password
          })
          fetch(domain + 'login/', {
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
                console.log('not ok')
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
              setIsLoggedIn(true)
              navigation.replace('Tab')


            })
            .catch(error => {
              console.log(error)
            })

        }
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.text1Column}>
        <Text style={styles.text1}>Welcome to QuaranClean</Text>
        <View style={styles.rect1}></View>
        <Text style={styles.e}>{error}</Text>
        <View style={styles.username2}>
          <EvilIconsIcon name="user" style={styles.icon3}></EvilIconsIcon>
          <TextInput
            placeholder="ID card number"
            placeholderTextColor="rgba(74,74,74,1)"
            style={styles.usernameInput2}
            secureTextEntry={false}
            onChangeText={idcard => _idcard(idcard)}
            keyboardType="number-pad"
          ></TextInput>
        </View>
        <View style={styles.password1}>
          <EvilIconsIcon name="lock" style={styles.icon4}></EvilIconsIcon>
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(74,74,74,1)"
            secureTextEntry={true}
            style={styles.passwordInput1}
            onChangeText={password => _password(password)}
          ></TextInput>
        </View>
      </View>
      <View style={styles.text1ColumnFiller}></View>
      <View style={styles.rect1Column}>
        <TouchableOpacity
          onPress={sendLoginData}
          style={styles.button1}
        >
          <Text style={styles.singIn}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.button2}
        >
          <Text style={styles.singUp}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  e: {
    color: "rgba(255,0,0,1)",
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,139,1)"
  },
  text1: {
    color: "rgba(255,255,255,1)",
    fontSize: 46,
    width: '100%',
    height: 112,
    textAlign: "center",
    marginBottom: 30,

  },
  username2: {
    height: 50,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    flexDirection: "row",
    // marginTop: 40,
  },
  icon3: {
    color: "rgba(74,74,74,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  usernameInput2: {
    height: 35,
    color: "rgba(0,0,0,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 12
  },
  password1: {
    height: 50,
    backgroundColor: "rgba(253,251,251,1)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 28
  },
  icon4: {
    color: "rgba(74,74,74,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput1: {
    height: 35,
    color: "rgba(0,0,0,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 12
  },
  text1Column: {
    marginTop: 119,
    marginLeft: 41,
    marginRight: 40
  },
  text1ColumnFiller: {
    flex: 1
  },
  rect1: {
    height: 6,
    backgroundColor: "#25cdec",
    marginLeft: 4,
    marginRight: 5
  },
  button1: {
    height: 44,
    backgroundColor: "rgba(37,205,236,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 30,

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
