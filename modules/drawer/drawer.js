import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
// import { Icon } from 'react-native-elements';
import { Icon } from "native-base";
import TabNav from './../tabnav/tabnav.js';
import { Text, View } from 'react-native';


const Drawer = createDrawerNavigator({

  Main: {
    screen: TabNav,
    navigationOptions: {
      drawerLabel: 'Mes caisses',
      drawerIcon:()=><Icon type="FontAwesome" name="desktop" style={{fontSize:22, color:"#666666"}}/>,
    }
  },
  TPE: {
    screen: TabNav,
    navigationOptions: {
      drawerLabel: 'Mes TPE',
      drawerIcon:() => <Icon type="FontAwesome" name="credit-card-alt" style={{fontSize:22, color:"#666666"}} />,
    }
  },
  DASH: {
    screen: TabNav,
    navigationOptions: {
      drawerLabel: 'Dashboard',
      drawerIcon:() => <Icon type="FontAwesome" name="dashboard" style={{fontSize:22, color:"#666666"}} />,
    }
  },
  HISTO: {
    screen: TabNav,
    navigationOptions: {
      drawerLabel: 'Historique',
      drawerIcon:() => <Icon type="FontAwesome" name="history" style={{fontSize:22, color:"#666666"}} />,
    }
  },
  Help: {
    screen: TabNav,
    navigationOptions: {
      drawerLabel: 'Help',
      drawerIcon:() => <Icon type="FontAwesome" name="question-circle-o" style={{fontSize:22, color:"#666666"}} />,
    }
  },
  Logout: {
    screen: TabNav,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerIcon:() => <Icon type="FontAwesome" name="sign-out" style={{fontSize:22, color:"#666666"}} />,
    }
  },

}, {
  drawerWidth: 180,
  drawerBackgroundColor : '#FFF',
  initialRouteName : 'Main',
  headerMode: 'screen',

  headerTitle: 'Main Screen Header',

});

export default Drawer;
