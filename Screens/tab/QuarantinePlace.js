import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView,
  Text,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';
import { PermissionsAndroid } from 'react-native';

import Boundary, { Events } from 'react-native-boundary';

import RNLocation from 'react-native-location';


export default function QuarantinePlace({ navigation }) {
  const globalContext = useContext(Context)
  const { domain, getToken,
    name, _name,
    lat, _lat,
    long, _long,
    radius, _radius,
    status, _status } = globalContext;
  const [canQuit, _canQuit] = useState();
  const [address, _address] = useState('');
  const [start_date, _start_date] = useState('');
  const [end_date, _end_date] = useState('');

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: 'Background Location Permission',
        message:
          'We need access to your location ' +
          'so you can get live quality updates.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      })
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('QuaranPlace Screen')
      getToken()
        .then(data => {
          fetch(domain + 'quarantine/', {
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
                _start_date(json.start_datetime)
                _end_date(json.end_datetime)
              } else {
                _status(json.status)
                _name('')
                _lat('')
                _long('')
                _radius('')
                _address('')
                _start_date('')
              }
            })
          fetch(domain + 'verify/', {
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
              if (json.status === 'inactive' || json.status === "unverified") {
                _canQuit(false)
              } else {
                _canQuit(true)
              }
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    });
    return unsubscribe;
  })
  function getPosition() {
    console.log('123456789')
      // RNLocation.requestPermission({
      //   android: {
      //     detail: 'fine',
      //   },
      // })
      RNLocation.getLatestLocation({ timeout: 60000 })
      .then((locations) => {
            _lat(locations.latitude)
            _long(locations.longitude)
            console.log(locations)
      });
  }
  function sendPlaceData() {
    if (name && lat && long && radius && address) {
      getToken()
        .then(data => {
          fetch(domain + 'quarantine/', {
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
                // Test Set Boundary
                Boundary.add({
                  lat: parseFloat(lat),
                  lng: parseFloat(long),
                  radius: parseFloat(radius), // in meters
                  id: name,
                })
                  .then(() => console.log("success!"))
                  .catch(e => console.error("error :(", e));

                Boundary.on(Events.ENTER, id => {
                  // Prints 'Get out of my Chipotle!!'
                  console.log(`Get out of my ${id}!!`);
                  getToken().then(data => {
                    fetch(domain + 'enterexit/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + data
                      },
                      body: JSON.stringify({
                        'action': 'enter'
                      })
                    }).then(res => {
                      if (res.ok) {
                        return res.json()
                      } else {
                        throw res.json()
                      }
                    })
                      .then(json => { console.log(json) })
                  })

                });

                Boundary.on(Events.EXIT, id => {
                  // Prints 'Ya! You better get out of my Chipotle!!'
                  console.log(`Ya! You better get out of my ${id}!!`)
                  getToken().then(data => {
                    fetch(domain + 'enterexit/', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + data
                      },
                      body: JSON.stringify({
                        'action': 'exit'
                      })
                    }).then(res => {
                      if (res.ok) {
                        return res.json()
                      } else {
                        throw res.json()
                      }
                    })
                      .then(json => { console.log(json) })
                  })
                })
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
        fetch(domain + 'quarantine/', {
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
              // Remove the events
              Boundary.off(Events.ENTER)
              Boundary.off(Events.EXIT)
              // Remove the boundary from native API´s
              // Boundary.remove('Chipotle')
              //   .then(() => console.log('Goodbye Chipotle :('))
              //   .catch(e => console.log('Failed to delete Chipotle :)', e))
              Boundary.removeAll()
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
            ? <>
              <View>
                <Text>Start Datetime : {String(start_date)}</Text>
                <Text>End Datetime : {end_date}</Text>
              </View>
              {canQuit
                ?
                <View>
                  <Button title="Quit" onPress={sendQuit} />
                </View>
                : <></>

              }</>
            :
            <View style={styles.fixToText}>
              <Button
                title="Get current position"
                color="#03C04A"
                onPress={getPosition}
              />
              <Button
                title="Confirm Quarantine"
                onPress={sendPlaceData}
              />
            </View>
            // <Button title="Confirm" onPress={sendPlaceData} />
          }
        </ScrollView>
      </View >
    </KeyboardAvoidingView >
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
  fixToText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});