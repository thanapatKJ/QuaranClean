import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';

import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';

import RNLocation from 'react-native-location';

import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import PushNotification from 'react-native-push-notification';

const { width, height } = Dimensions.get('window');



const ASPECT_RATIO = width / height;
const LATITUDE = 13.7279279;
const LONGITUDE = 100.5497879;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home({ navigation }) {
  const [LATITUDE, _LATITUDE] = useState(13.7279279)
  const [LONGITUDE, _LONGITUDE] = useState(100.5497879)

  const globalContext = useContext(Context)
  const { domain, getToken,
    lat, _lat,
    long, _long,
    radius, _radius,
    status, _status,
    _name,
    getLocation, setLocation, removeLocation,
    getStatus, setStatus, removeStatus } = globalContext;
  RNLocation.getLatestLocation({ timeout: 60000 })
    .then((locations) => {
      _LATITUDE(locations.latitude)
      _LONGITUDE(locations.longitude)

      console.log(locations)
    })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Home Screen')
      RNLocation.getLatestLocation({ timeout: 60000 })
        .then((locations) => {
          _LATITUDE(locations.latitude)
          _LONGITUDE(locations.longitude)

          console.log(locations)
        })
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
                _lat(json.lat)
                _long(json.long)
                _radius(json.radius)
                _name(json.name)
                removeLocation().then()
                setLocation(json)
              }
              if (removeStatus()) {
                console.log('removeStatus')

                setStatus(json.status)
                _status(json.status)

                if (json.status) {
                  getLocation().then(data => {
                    console.log('location home ' + data['name'])
                  })
                }
              }
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    })
    return unsubscribe;
  })
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "Notify",
        channelName: "Notify"
      }
    )
  }
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
