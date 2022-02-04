import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

export default function Register(props) {
  return (
    <KeyboardAvoidingView
      behavior="padding" >
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.registerQuaranCleanColumn}>
            <Text style={styles.registerQuaranClean}>Register QuaranClean</Text>
            <View style={styles.username1}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput1}
              ></TextInput>
            </View>
            <View style={styles.username2}>
              <TextInput
                placeholder="Lastname"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput2}
              ></TextInput>
            </View>
            <View style={styles.username3}>
              <TextInput
                placeholder="ID card number"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput3}
              ></TextInput>
            </View>
            <View style={styles.username4}>
              <TextInput
                placeholder="Phone number"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput4}
              ></TextInput>
            </View>
            <View style={styles.username5}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput5}
              ></TextInput>
            </View>
            <View style={styles.username6}>
              <TextInput
                placeholder="Confirm password"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput6}
              ></TextInput>
            </View>
            <View style={styles.username7}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(74,74,74,1)"
                secureTextEntry={false}
                style={styles.usernameInput7}
              ></TextInput>
            </View>
          </View>
          <View style={styles.registerQuaranCleanColumnFiller}></View>
          <View style={styles.button1Column}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Channels")}
              style={styles.button1}
            >
              <Text style={styles.confirm1}>CONFIRM</Text>
            </TouchableOpacity>
            <View style={styles.rect1}></View>
          </View>
        </View>
      </ScrollView>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,139,1)"
  },
  registerQuaranClean: {
    color: "rgba(255,255,255,1)",
    fontSize: 27,
    marginLeft: 2
  },
  username1: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 24
  },
  usernameInput1: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  username2: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 26
  },
  usernameInput2: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  username3: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 26
  },
  usernameInput3: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  username4: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 26
  },
  usernameInput4: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  username5: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 26
  },
  usernameInput5: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  username6: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 26
  },
  usernameInput6: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  username7: {
    height: 44,
    backgroundColor: "rgba(251,247,247,1)",
    borderRadius: 5,
    marginTop: 26
  },
  usernameInput7: {
    height: 30,
    color: "rgba(0,0,0,1)",
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15
  },
  registerQuaranCleanColumn: {
    marginTop: 71,
    marginLeft: 41,
    marginRight: 40
  },
  registerQuaranCleanColumnFiller: {
    flex: 1
  },
  button1: {
    height: 44,
    backgroundColor: "rgba(37,205,236,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: -74,
    marginLeft: 25,
    marginRight: 24
  },
  confirm1: {
    color: "rgba(0,0,0,1)",
    alignSelf: "center"
  },
  rect1: {
    height: 4,
    backgroundColor: "#25cdec",
    marginBottom: 70
  },
  button1Column: {
    marginBottom: 46,
    marginLeft: 16,
    marginRight: 17
  }
});



