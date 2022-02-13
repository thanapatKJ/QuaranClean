import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput, Image, TouchableHighlight } from 'react-native';
import { Context } from "../../components/globalContext/globalContext";

export default function Register({ navigation }) {
  const globalContext = useContext(Context)
  const {
    domain,
    regName, _regName,
    regLastname, _regLastname,
    regIDcard, _regIDcard,
    regNumber, _regNumber,
    regPassword, _regPassword,
    regCpassword, _regCpassword,
    regEmail, _regEmail,
    regImg, _regImg } = globalContext;
  sendRegisterData = () => {
    if (!(regName && regLastname && regIDcard && regNumber && regPassword && regCpassword && regEmail)) {
      Alert.alert('Please fill all the boxes above.')
    }
    else if (regCpassword == regPassword) {
      let form = new FormData();
      form.append("image", {
        'name': String(regIDcard) + ".jpg",
        'uri': regImg.uri,
        'type': "image/jpg"
      })
      form.append("username", regIDcard)
      form.append("first_name", regName)
      form.append("last_name", regLastname)
      form.append("email", regEmail)
      form.append("password", regPassword)
      form.append("id_cards", regIDcard)
      form.append("numbers", regNumber)
      let post_data = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: form
      }
      fetch(domain + 'register/', post_data)
        .then(response => response.json())
        .then(data => {
          if (data.status == "success") {
            Alert.alert('Register success !!!')
            navigation.navigate('Login')
          }
        })
        // .then({ navigate('Login')} )
        // .then({})
        .catch(error => { Alert.alert(error.message) })
      // navigation.navigate('Login')
    } else {
      Alert.alert('Password does not match')
    }
  }
  pickImage = () => {
    navigation.navigate('RegisterCam')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register QuaranClean</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={name => _regName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        onChangeText={lastname => _regLastname(lastname)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Card Numbers"
        keyboardType="numeric"
        onChangeText={idcard => _regIDcard(idcard)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        onChangeText={numbers => _regNumber(numbers)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={password => _regPassword(password)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={cpassword => _regCpassword(cpassword)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={email => _regEmail(email)}
      />
      <View style={styles.separator} />
      <View style={{ flexDirection: "column", alignItems: "center", padding: 5 }}>
        <TouchableHighlight onPress={pickImage}>
          <Image
            style={{
              height: 150,
              width: 200,
            }}
            source={regImg}
            resizeMode="contain" />
        </TouchableHighlight>
      </View>
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