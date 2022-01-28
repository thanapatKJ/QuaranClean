import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,TextInput } from 'react-native';
import Header from '../../components/Header';


export default class QuarantinePlace extends Component {
  constructor(props){
    super(props);

    this.state = {
      name:"",
      lati:"",
      longi:"",
      detail:"",
    }
  }
  sendPlaceData = () => {
    fetch('http://localhost:8000/api/place_api/',{
      method: 'POST',
      body:JSON.stringify({
        "name":this.state.name,
        "lati":this.state.lati,
        "longi":this.state.longi,
        "detail":this.state.detail,
      })
    }).then((response)=>Alert.alert(JSON.stringify(response.json())))
    .then(()=>Alert.alert("Sent Data"))
    .catch((error)=>{Alert.alert(error.message)})
  }
  render(){
    return(
    <SafeAreaView>
      <Header />
      <Text style={styles.title}>Quarantine Place</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text)=>this.setState({name:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            keyboardType="numeric"
            onChangeText={(text)=>this.setState({lati:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Longtitude"
            keyboardType="numeric"
            onChangeText={(text)=>this.setState({longi:text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Detail"
            onChangeText={(text)=>this.setState({detail:text})}
          />
          <Button title="Confirm" onPress={this.sendPlaceData} />
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
    color: 'black'
  },
});