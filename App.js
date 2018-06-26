import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';
import Login from './modules/login/login.js';
import { createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import store from './store/store.js';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <StatusBar hidden={true}/>
          <Login/>
        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
