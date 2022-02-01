import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import { Context } from '../../components/globalContext/globalContext';
import { useIsFocused } from '@react-navigation/native';

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
  const {
    isLoggedIn, setIsLoggedIn,
    userObj, setUserObj,
    setToken, getToken,
    removeToken } = globalContext;
  const isFocused = useIsFocused();
  const [status, _status] = useState();


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
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    }
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
            ?
            <Circle
              center={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
              }} radius={10} fillColor={'rgba(200,300,200,0.5)'}
            />
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
    backgroundColor: 'rgba(2,255,255,0.1)',
    paddingHorizontal: 18,
    paddingVertical: 12,
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
