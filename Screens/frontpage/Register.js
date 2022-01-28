import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,TextInput } from 'react-native';


export default class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      user_id : "",
      name : "",
      lastname : "",
      P_number : "",
      Email : "",
      password : "",
      Cpassword:""
    }
  }
  
  sendRegisterData = () => {
    if(this.state.Cpassword==this.state.password){
      // Alert.alert(this.state.name+'\n'+this.state.lastname)
      fetch('http://localhost:8000/api/user_api/',{
        method: 'POST',
        body:JSON.stringify({
          "user_id": this.state.user_id,
          "name": this.state.name,
          "lastname": this.state.lastname,
          "P_number": this.state.P_number,
          "Email": this.state.Email,
          "password": this.state.password,

        })
      }).then((response)=>Alert.alert(JSON.stringify(response.json())))
      .then(()=>this.props.navigation.navigate('Login'))
      .catch((error)=>{Alert.alert(error.message)})
    }
    else{Alert.alert("Confirm Password is incorrect.")}
  }
  render(){
    return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register QuaranClean</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => this.setState({name:text})}
          /> 
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            onChangeText={(text) => this.setState({lastname:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="ID Card Numbers"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({user_id:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({P_number:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({Cpassword:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => this.setState({Email:text})}
          />
        <View style={styles.separator} />
        <View>
          <Button
            title="Confirm"
            onPress={this.sendRegisterData}
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