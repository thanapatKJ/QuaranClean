import React, { Component, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';


export default function Register({ navigation }) {
  const [name, _name] = useState('');
  const [lastname, _lastname] = useState('');
  const [idcard, _idcard] = useState('');
  const [numbers, _numbers] = useState('');
  const [password, _password] = useState('');
  const [cpassword, _cpassword] = useState('');
  const [email, _email] = useState('');

  // const checkTextInput = () => {
  //   if (!)
  // }
  sendRegisterData = () => {
    if (password == cpassword) {
      let post_data = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'X-CSRFToken':  cookie.load('csrftoken')
        },
        body: JSON.stringify({
          'username': idcard,
          'first_name': name,
          'last_name': lastname,
          'email': email,
          'password': password,
          'id_cards': idcard,
          'numbers': numbers
        })
      }
      fetch('http://192.168.175.50:8000/api/register/', post_data)
        .then(response => response.json())
        .then(data => { console.log(data) })
        // .then({ navigate('Login')} )
        // .then({})
        .catch(error => { Alert.alert(error.message) })
      navigation.navigate('Login')
    } else {
      Alert.alert('Password does not match')
    }
    
    // if(this.state.Cpassword==this.state.password){
    //   // Alert.alert(this.state.name+'\n'+this.state.lastname)
    //   fetch('http://localhost:8000/api/user_api/',{
    //     method: 'POST',
    //     body:JSON.stringify({
    //       "user_id": this.state.user_id,
    //       "name": this.state.name,
    //       "lastname": this.state.lastname,
    //       "P_number": this.state.P_number,
    //       "Email": this.state.Email,
    //       "password": this.state.password,

    //     })
    //   }).then((response)=>Alert.alert(JSON.stringify(response.json())))
    //   .then(()=>this.props.navigation.navigate('Login'))
    //   .catch((error)=>{Alert.alert(error.message)})
    // }
    // else{Alert.alert("Confirm Password is incorrect.")}
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register QuaranClean</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={name => _name(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        onChangeText={lastname => _lastname(lastname)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Card Numbers"
        keyboardType="numeric"
        onChangeText={idcard => _idcard(idcard)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        onChangeText={numbers => _numbers(numbers)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={password => _password(password)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={cpassword => _cpassword(cpassword)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={email => _email(email)}
      />
      <View style={styles.separator} />
      <View>
        <Button
          title="Confirm"
          onPress={sendRegisterData}
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