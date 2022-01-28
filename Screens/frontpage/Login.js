import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,TextInput } from 'react-native';

export default class Login extends Component {
  constructor(props){
    super(props);
  }
  sendLoginData = () => {
    // ส่งข้อมูล login 
    this.props.navigation.replace('Tab')
  }
  render(){
    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to QuaranClean</Text>
        <TextInput
            style={styles.input}
            placeholder="ID card Number"
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
          />
        <View>
          <Button
            title="Sign In"
            onPress={this.sendLoginData}
          />
        </View>
        <View style={styles.separator} />
        <View>
          <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      </SafeAreaView>
    );
  }
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
