import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';
import Header from '../../components/Header';

export default function Profile({ navigation }) {
  return (
    <SafeAreaView>
      <Header />
      <Text>Name LastName</Text>
      <Text>ID card Number</Text>
      <Text>Phone Number </Text>
      <Text>Email</Text>
      <Button title='change password'
        onPress={() => navigation.navigate('ChangePassword')}
      />
      <Button
        title='Sign Out'
        onPress={() => navigation.replace('Login')}
      />
    </SafeAreaView>
  );
}
