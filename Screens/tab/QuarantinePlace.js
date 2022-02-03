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
  const [start_datetime, _start_datetime] = useState('');
  const [end_datetime, _end_datetime] = useState('');


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('QuaranPlace Screen')
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
                throw res.json()
              }
            })
            .then(json => {
              if (json.status) {
                _status(json.status)
                _name(json.name)
                _lat(json.lat)
                _long(json.long)
                _radius(json.radius)
                _address(json.address)
                _start_datetime(json.start_date)
                // _end_datetime(json.end_datetime)
                console.log('Name : ' + name)
                console.log('lat : ' + lat)
                console.log('long : ' + long)
                console.log('radius : ' + radius)
                console.log('address : ' + address)
                console.log('start : ' + start_datetime)
                console.log(json)
              } else {
                _status(json.status)
                _name('')
                _lat('')
                _long('')
                _radius('')
                _address('')
                _start_datetime('')
              }
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    });
    return unsubscribe;
  })

  function sendPlaceData() {
    // console.log('Press')
    // console.log('Name = ' + name)
    if (name && lat && long && radius && address) {
      // console.log('send data')
      getToken()
        .then(data => {
          fetch('http://192.168.175.50:8000/api/quarantine/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data
            },
            body: JSON.stringify({
              'name': name,
              'lat': lat,
              'long': long,
              'radius': radius,
              'address': address,
            })
          })
            .then(res => {
              if (res.ok) {
                return res.json()
              } else {
                throw res.json()
              }
            })
            .then(json => {
              if (json.status === 'success') {
                navigation.navigate('Home')
              }
              console.log(json)
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    }
  }

  function sendQuit() {
    getToken()
      .then(data => {
        fetch('http://192.168.175.50:8000/api/quarantine/', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + data
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              throw res.json()
            }
          })
          .then(json => {
            console.log(json)
            if (json.status === 'success') {
              navigation.navigate('Home')
            }
          })
      })
      .catch(error => {
        Alert.alert("ERROR " + error)
      })
  }
  return (
    <KeyboardAvoidingView
      behavior="padding" >
      <View>
        <Header />
        <ScrollView>
          <Text style={styles.title}>Quarantine Place</Text>
          <Text>Place Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={event => _name(event)}
            editable={!status}
            defaultValue={name}
          />
          <Text>Latitude</Text>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            keyboardType="numeric"
            onChangeText={event => _lat(event)}
            editable={!status}
            defaultValue={String(lat)}
          />
          <Text>Longitude</Text>
          <TextInput
            style={styles.input}
            placeholder="Longtitude"
            keyboardType="numeric"
            onChangeText={event => _long(event)}
            editable={!status}
            defaultValue={String(long)}
          />
          <Text>Radius(meters)</Text>
          <TextInput
            style={styles.input}
            placeholder="radius(meters)"
            keyboardType="number-pad"
            onChangeText={event => _radius(event)}
            editable={!status}
            defaultValue={String(radius)}
          />
          <Text>Address</Text>
          <TextInput
            multiline={true}
            numbersOfLine={4}
            style={styles.input}
            placeholder="Address"
            onChangeText={event => _address(event)}
            editable={!status}
            defaultValue={String(address)}
          />
          {status
            ?
            <View>
              <Text>Start Datetime : {String(start_datetime)}</Text>
              <Text>End Datetime : {end_datetime}</Text>
              <Button title="Quit" onPress={sendQuit} />
            </View>
            : <Button title="Confirm" onPress={sendPlaceData} />
          }
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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