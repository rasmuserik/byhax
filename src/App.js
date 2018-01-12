import React, {Component} from 'react';
import logo from './logo.svg';
import {Image, StyleSheet, Text, View} from 'react-native';
import {__} from './i18n';

const styles = StyleSheet.create({
  app: {},
  title: {
    fontSize: 40
  },
  logo: {
    height: 64
  }
});

function App(props) {
  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="React logo"
          source={logo}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>
          {__('ByHax (under development)')}
        </Text>
      </View>
    </View>
  );
}

export default App;
