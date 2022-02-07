import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';
// import Map from '../../components/Maps_test';
import Map from '../../components/Maps';

import MapView, { PROVIDER_GOOGLE, Marker, ProviderPropType, Circle } from 'react-native-maps';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";

import RNLocation from 'react-native-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.7279279;
const LONGITUDE = 100.5497879;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home({ navigation }) {
  const globalContext = useContext(Context)
  const { domain, getToken,
    name, _name,
    lat, _lat,
    long, _long,
    radius, _radius,
    status, _status } = globalContext;

  const [location, setLocation] = useState(null);

  // RNLocation.configure({
  //   distanceFilter: 5, // Meters
  //   desiredAccuracy: {
  //     ios: "bestForNavigation",
  //     android: "highAccuracy"
  //   },
  //   // Android only
  //   androidProvider: "auto",
  //   interval: 5000, // Milliseconds
  //   fastestInterval: 1000, // Milliseconds
  //   maxWaitTime: 5000, // Milliseconds
  // })
  // RNLocation.requestPermission({
  //   android: {
  //     detail: "fine",
  //     rationale: {
  //       title: "We need to access your location",
  //       message: "We use your location to show where you are on the map",
  //       buttonPositive: "OK",
  //       buttonNegative: "Cancel"
  //     }
  //   }
  // })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Home Screen')

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
                // setError("Invalid Credentials")
                throw res.json()
              }
            })
            .then(json => {
              // console.log(json)
              if (json.status) {
                // console.log('status eng')
                _lat(json.lat)
                _long(json.long)
                _radius(json.radius)
                _name(json.name)
              }
              _status(json.status)
              
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    })
    return unsubscribe;
  })
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        // initialRegion={onUserLocationChange}
        // onUser
        // ref = {(mapView) => {mapView}}

        >
          {status
            ? <>
              <Circle
                center={{
                  latitude: lat,
                  longitude: long,
                }} radius={radius} fillColor={'rgba(200,300,200,0.5)'}
              /></>
            : <></>
          }
        </MapView>

        <View style={styles.buttonContainer}>
          {status
            ? <></>
            : <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate('Place')}>
              <Text>Click here to go to quarantine screen.</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '92%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(102,248,161,0.35)',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
