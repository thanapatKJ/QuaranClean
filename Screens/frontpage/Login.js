import React, { Component, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';

export default function Login({ navigation }) {

  const [idcard, _idcard] = useState('');
  const [password, _password] = useState('');
  const [result, _result] = useState('');

  sendLoginData = () => {
    // ส่งข้อมูล login 
    // let post_data = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     // 'X-CSRFToken':  cookie.load('csrftoken')
    //   },
    //   body: JSON.stringify({
    //     'username': "1102002747935",
    //     'first_name': 'thanapat',
    //     'last_name': 'klayjamlang',
    //     'email': 'thanapatkjm@gmail.com',
    //     'password': "dra",
    //     'id_cards': '1102002747935',
    //     'numbers': '0945542613'
    //   })
    // }
    // fetch('http://192.168.175.50:8000/api/register/',post_data)
    //   .then(response => response.json())
    //   .then(data => { console.log(data) })
    //   .catch(error => { Alert.alert(error.message) })


    // Alert.alert(idcard + " " + password);
    // navigation.replace('Tab')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to QuaranClean</Text>
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