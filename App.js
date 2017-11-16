import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, FlatList } from 'react-native';
import Playquiz from './src/components/playquiz';
import { mainStyles } from './src/styles/general';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={mainStyles.container}>
        <Playquiz />
      </View>
    );
  }
}

