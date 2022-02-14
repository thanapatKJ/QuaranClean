import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native'; import { fonts } from 'react-native-elements/dist/config';
import Header from '../../components/Header';

import { Context } from '../../components/globalContext/globalContext';
import { _LogBoxInspectorContainer } from 'react-native/Libraries/LogBox/LogBoxInspectorContainer';

export default function Verify({ navigation }) {
  const globalContext = useContext(Context)
  const { getToken ,domain} = globalContext;

  const [verified, _verified] = useState();
  const [unverified, _unverified] = useState();
  const [inactive, _inactive] = useState();
  const [none, _none] = useState();
  const [next_time, _next_time] = useState('');


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Verify Screen')
      getToken()
        .then(data => {
          fetch(domain+'verify/', {
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
              _next_time('')
              if (json.status === 'verified') {
                console.log('verified')
                _verified(true)
                _unverified(false)
                _none(false)
                _inactive(false)
                _next_time(json.next_time)
              } else if (json.status === 'unverified') {
                console.log('unverified')
                _unverified(true)
                _verified(false)
                _none(false)
                _inactive(false)
              } else if (json.status === 'None') {
                console.log('none')
                _none(true)
                _unverified(false)
                _verified(false)
                _inactive(false)
              } else if (json.status === 'inactive') {
                console.log('inactive')
                _none(false)
                _unverified(false)
                _verified(false)
                _inactive(true)
              }
              console.log(json)
              if (none) {
                console.log('none')
              }
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    })
    return unsubscribe;
  })

  function sendVerify() {
    console.log('sendVerify')
    getToken()
      .then(data => {
        fetch(domain+'verify/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + data
          },
          body: JSON.stringify({
            'lat': '13.72791061004847',
            'long': '100.55003259290271'
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
            console.log(json)
            if (json.status == 'success') {
              console.log('success')
              navigation.navigate('Home')
              Alert.alert("Send Verify Signal to server")
            }
          })
      })
      .catch(error => {
        Alert.alert("ERROR " + error)
      })
    // Alert.alert("Send Verify Signal to server")
  }
  return (
    <SafeAreaView>
      <Header />
      <Text style={styles.title}>Verify</Text>

      {none
        ?
        <View>
          <Text style={styles.title}>You have to enter quarantine place first.</Text>
        </View>
        : <>
          {verified
            ?
            <View>
              <Text style={styles.title}>Next time : {next_time}</Text>
            </View>
            : <>
              {unverified
                ?
                <View>
                  <Text style={styles.title}>Please verify yourself.</Text>
                  <Button
                    title="Press To Verify"
                    onPress={sendVerify} />
                </View>
                : <>
                  {inactive
                    ?
                    <View>
                      <Text style={styles.title}>Your quarantine is inactive.</Text>
                    </View>
                    : <></>
                  }</>
              }</>
          }</>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 36,
  },
});