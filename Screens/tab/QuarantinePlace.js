import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import { useIsFocused } from '@react-navigation/native';
import { Context } from '../../components/globalContext/globalContext';


export default function QuarantinePlace({ navigation }) {
  const globalContext = useContext(Context)
  const {
    isLoggedIn, setIsLoggedIn,
    userObj, setUserObj,
    setToken, getToken,
    removeToken } = globalContext;
  const isFocused = useIsFocused();
  const [status, _status] = useState();
  const [name, _name] = useState('');
  const [lat, _lat] = useState('');
  const [long, _long] = useState('');
  const [radius, _radius] = useState('');
  const [address, _address] = useState('');

  useEffect(() => {
    if (isFocused) {
      getToken()
        .then(data => {
          fetch('http://192.168.175.50:8000/api/quarantine/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data
            },
          })
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                // setError("Invalid Credentials")
                throw res.json()
              }
            })
            .then(json => {
              _status(json.status)
              _name(json.name)
              _lat(json.lat)
              _long(json.long)
              _radius(json.radius)
              _address(json.address)
              console.log('status ' + status)
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    }
  })

  sendPlaceData = () => {

  }
  return (
    // <KeyboardAvoidingView
    //   behavior="padding" >
    <View>
      <Header />
      {/* <ScrollView> */}
        <Text style={styles.title}>Quarantine Place</Text>
        <Text>Place Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={name => _name(name)}
          editable={!status}
          defaultValue={name}
        />
        <Text>Latitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          onChangeText={lat => _lat(lat)}
          editable={!status}
          defaultValue={lat}
        />
        <Text>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="Longtitude"
          keyboardType="numeric"
          onChangeText={long => _long(long)}
          editable={!status}
          defaultValue={long}
        />
        <Text>Radius(meters)</Text>
        <TextInput
          style={styles.input}
          placeholder="radius(meters)"
          keyboardType="number-pad"
          onChangeText={radius => _radius(radius)}
          editable={!status}
          defaultValue={radius}
        />
        <Text>Address</Text>
        <TextInput
          multiline={true}
          numbersOfLine={4}
          style={styles.input}
          placeholder="Address"
          onChangeText={address => _address(address)}
          editable={!status}
          defaultValue={address}
        />
        {status
          ? <></>
          : <Button title="Confirm" onPress={sendPlaceData} />
        }
      {/* </ScrollView> */}
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
    color: 'black'
  },
});