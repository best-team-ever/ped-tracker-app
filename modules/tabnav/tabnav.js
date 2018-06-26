import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from "native-base";
import Tills from './../tills/tills.js';
import Tpe from './../tpe/tpe.js';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Here the dashboard</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: {
        screen: Tpe,
        navigationOptions: {
            tabBarLabel:"TPE",
            tabBarIcon: () => <Icon type="FontAwesome" name="credit-card-alt" style={{fontSize:22, color:"#666666"}} />
        }},
  Tills: {
        screen: Tills,
        navigationOptions: {
            tabBarLabel:"Caisses",
            tabBarIcon: () => <Icon type="FontAwesome" name="desktop" style={{fontSize:22, color:"#666666"}}/>
        }},
  DASH: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel:"Dashboard",
            tabBarIcon: () => <Icon type="FontAwesome" name="dashboard" style={{fontSize:22, color:"#666666"}}/>
        }},
});
