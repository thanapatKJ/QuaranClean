import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,TextInput, TextComponent } from 'react-native';

export default class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state  = {
      Opassword:"",
      Cpassword:"",
      Npassword:"",
    }
  }
  sendChangePassword = () => {
    if(this.state.Npassword==this.state.Cpassword){
      fetch('http://localhost:8000/api/user_id',{
        method:'PATCH',
        body:JSON.stringify({
          "oldPassword": this.state.Opassword,
          "newPasword":this.state.Npassword,
        })
      })
    }    
    Alert.alert("ChangePassword")
    this.props.navigation.navigate('Profile');
  }
  render(){
    return(
    <View>
        <Text style={styles.title}>ChangePassword</Text>
        <TextInput style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          onChangeText={(text)=> this.setState({Opassword})}
        />
        <TextInput style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          onChangeText={(text)=> this.setState({Npassword})}
        />
        <TextInput style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          onChangeText={(text)=>this.setState({Cpassword})}
        />
        <Button title="Confirm" onPress={this.sendChangePassword}/>
    </View>
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