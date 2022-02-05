import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';
// import Map from '../../components/Maps_test';
import Map from '../../components/Maps';

import MapView, { PROVIDER_GOOGLE, Marker, ProviderPropType, Circle } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 13.72791061004847;
const LONGITUDE = 100.55003259290271;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home({ navigation }) {
  const globalContext = useContext(Context)
  const { domain, getToken } = globalContext;
  const [status, _status] = useState();
  const [lat, _lat] = useState();
  const [long, _long] = useState();
  const [radius, _radius] = useState();



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
              console.log(json)
              if (json.status) {
                console.log('status eng')
                _lat(json.lat)
                _long(json.long)
                _radius(json.radius)
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
          // ref={map => this._map = map}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {status
            ?<>
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
