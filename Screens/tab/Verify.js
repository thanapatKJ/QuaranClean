import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import Header from '../../components/Header';

import { Context } from '../../components/globalContext/globalContext';
import { _LogBoxInspectorContainer } from 'react-native/Libraries/LogBox/LogBoxInspectorContainer';
import FaceSDK, { Enum, FaceCaptureResponse, MatchFacesResponse, MatchFacesRequest, MatchFacesImage, MatchFacesSimilarityThresholdSplit, LivenessResponse } from '@regulaforensics/react-native-face-api'
import RNFetchBlob from 'rn-fetch-blob'
import RNLocation from 'react-native-location';
import PushNotification from 'react-native-push-notification';


export default function Verify({ navigation }) {
  const globalContext = useContext(Context)
  const { getToken, domain, token, _token } = globalContext;
  const [lat, _lat] = useState();
  const [long, _long] = useState();

  const [verified, _verified] = useState();
  const [unverified, _unverified] = useState();
  const [inactive, _inactive] = useState();
  const [none, _none] = useState();
  const [next_time, _next_time] = useState('');
  var serverImage = new MatchFacesImage()
  var photoImage = new MatchFacesImage()


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Verify Screen')
      getToken()
        .then(data => {
          _token(data)
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
            })
        })
        .catch(error => {
          Alert.alert("ERROR " + error)
        })
    })
    return unsubscribe;
  })

  function notify() {
    PushNotification.localNotification({
      channelId: "Outside",
      title: "Inactivate.",
      message: "Please verify yourself within 30 minutes",
      priority: "high",
    })
  }
  function sendVerify() {
    console.log("sendVerifylocation")
    fetch(domain + 'profile/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
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

        FaceSDK.startLiveness(result => {
          result = LivenessResponse.fromJson(JSON.parse(result))
          if (result.bitmap != null && result["liveness"] == 0) {
            photoImage.bitmap = result.bitmap
            photoImage.imageType = Enum.ImageType.LIVE
            console.log('bitmap')
            console.log('pass')
            RNFetchBlob.fetch('GET', domain + 'user_images/' + json.id_cards + '.jpg', {
            }).then((res) => {
              let status = res.info().status;

              if (status == 200) {
                serverImage.bitmap = res.base64()
                serverImage.imageType = Enum.ImageType.PRINTED

                if (serverImage == null || serverImage.bitmap == null || serverImage.bitmap == "" || photoImage == null || photoImage.bitmap == null || photoImage.bitmap == "")
                  return
                request = new MatchFacesRequest()
                request.images = [serverImage, photoImage]
                console.log('Passed Matching')
                FaceSDK.matchFaces(JSON.stringify(request), response => {
                  response = MatchFacesResponse.fromJson(JSON.parse(response))
                  FaceSDK.matchFacesSimilarityThresholdSplit(JSON.stringify(response.results), 0.98, str => {
                    var split = MatchFacesSimilarityThresholdSplit.fromJson(JSON.parse(str))
                    if (split.matchedFaces.length > 0) {
                      console.log(((split.matchedFaces[0].similarity * 100).toFixed(2) + "%"))
                      console.log('passed')
                      RNLocation.getLatestLocation({ timeout: 60000 })
                        .then((locations) => {
                          fetch(domain + 'verify/', {
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': 'Token ' + token
                            },
                            body: JSON.stringify({
                              'lat': locations.latitude,
                              'long': locations.longitude
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
                              if (json.status == 'success') {
                                console.log('success')
                                Alert.alert("Send Verify Signal to server.")
                                navigation.navigate('Home')
                              }
                            })
                        });

                    } else {
                      console.log('not correct')
                      Alert.alert('Face not correct. Please try again.')
                    }
                  }, e => { })
                }, e => { })
              }
            }).catch((errorMessage, statusCode) => { })
          }
        }, e => { })
      })
      .catch(error => {
        console.log("ERROR " + error)
      })
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
                  <Button
                    title="Press To Notify"
                    onPress={notify} />
                </View>
                : <>
                  {inactive
                    ?
                    <View>
                      <Text style={styles.title}>Your quarantine is inactive.</Text>
                      <Text style={styles.title}>Please contact the admin.</Text>
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