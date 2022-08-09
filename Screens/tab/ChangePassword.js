import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, Button, View, Text, Alert, TextInput } from 'react-native';
import { Context } from '../../components/globalContext/globalContext';

import Header from '../../components/Header';

export default function ChangePassword({ navigation }) {
  const globalContext = useContext(Context)
  const {
    setIsLoggedIn,
    setUserObj,
    getToken, domain,
    removeToken } = globalContext;

  const [opassword, _opassword] = useState('');
  const [npassword, _npassword] = useState('');
  const [cpassword, _cpassword] = useState('');

  function sendChangePassword() {
    if (npassword === cpassword && (opassword && npassword && cpassword)) {
      getToken()
        .then(data => {
          fetch(domain + 'profile/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data
            },
            body: JSON.stringify({
              'opassword': opassword,
              'npassword': npassword
            })
          })
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                Alert.alert('Old password not correct.')
              }
            })
            .then(json => {
              console.log(json)
              if (json.status === 'success') {
                removeToken()
                setUserObj('')
                setIsLoggedIn(false)
                navigation.replace('Login')
                console.log('success')
              }
            })
        })
        .catch(error => {
          console.log("ERROR " + error)
        })
    } else {
      Alert.alert('Please fill All the box correctly.')
    }
  }
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text style={styles.text1}>ChangePassword</Text>
        <TextInput style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          onChangeText={opassword => _opassword(opassword)}
        />
        <TextInput style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          onChangeText={npassword => _npassword(npassword)}
        />
        <TextInput style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          onChangeText={cpassword => _cpassword(cpassword)}
        />
        <View style={styles.rect1Column}>
          {/* <Button title="Confirm" onPress={sendChangePassword} /> */}
          <TouchableOpacity
            onPress={sendChangePassword}
            style={styles.button1}
          >
            <Text style={styles.singIn}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)"
  },
  text1: {
    color: "rgba(0,0,0,255)",
    fontSize: 35,
    width: '100%',
    // height: 112,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
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
  rect1Column: {
    marginBottom: 188,
    marginLeft: 41,
    marginRight: 41
  }
});