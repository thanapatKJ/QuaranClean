import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, TextComponent } from 'react-native';
import { Context } from '../../components/globalContext/globalContext';

export default function ChangePassword({ navigation }) {
  const globalContext = useContext(Context)
  const {
    isLoggedIn, setIsLoggedIn,
    userObj, setUserObj,
    setToken, getToken,
    removeToken } = globalContext;

  const [opassword, _opassword] = useState('');
  const [npassword, _npassword] = useState('');
  const [cpassword, _cpassword] = useState('');

  function sendChangePassword() {
    if (npassword === cpassword && (opassword && npassword && cpassword)) {
      getToken()
        .then(data => {
          fetch('http://192.168.175.50:8000/api/profile/', {
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
    <View>
      <Text style={styles.title}>ChangePassword</Text>
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
      <Button title="Confirm" onPress={sendChangePassword} />
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
});