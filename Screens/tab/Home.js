import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';
import Map from '../../components/Maps';
// import Map from '../../components/Maps_test';

export default function Home({ navigation }) {
  return (
    <View>
      <Header />
      <Map />
    </View>
  );
}
