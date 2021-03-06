import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
// import { Icon } from 'react-native-elements';
import { Icon } from "native-base";
import TabNav from './../tabnav/tabnav.js';
import { Text, View } from 'react-native';
import Tills from './../tills/tills.js';
import Listtills from './../listtills/listtills.js';
import Tpe from './../tpe/tpe.js';
import histotpe from './../histotpe/histotpe.js';
import modiftpe from './../modiftpe/modiftpe.js';
import histouser from './../histouser/histouser.js';
const Drawer = createDrawerNavigator({

  // Tpe: {
  //   screen: Tpe,
  //   navigationOptions: {
  //     drawerLabel: 'Mes TPE',
  //     drawerIcon:() => <Icon type="FontAwesome" name="credit-card-alt" style={{fontSize:22, color:"#666666"}} />,
  //   }
  // },
  Tpe: {
    screen: createStackNavigator({
          Home: {
                screen: Tpe,
                },
          modiftpe: modiftpe,
          histotpe: histotpe,
        },{
        headerMode:'none',
        navigationOptions: {
          drawerLabel: 'Mes tpe',
          drawerIcon:()=><Icon type="FontAwesome" name="desktop" style={{fontSize:22, color:"#666666"}}/>,
        }
        }),
    navigationOptions: {
      drawerLabel: 'Mes TPE',
      drawerIcon:()=><Icon type="FontAwesome" name="credit-card-alt" style={{fontSize:22, color:"#666666"}}/>,
    }
  },
  Tills: {
    screen: Listtills,
    navigationOptions: {
      drawerLabel: 'Mes caisses',
      drawerIcon:()=><Icon type="FontAwesome" name="desktop" style={{fontSize:22, color:"#666666"}}/>,
    }
  },
  // DASH: {
  //   screen: TabNav,
  //   navigationOptions: {
  //     drawerLabel: 'Dashboard',
  //     drawerIcon:() => <Icon type="FontAwesome" name="dashboard" style={{fontSize:22, color:"#666666"}} />,
  //   }
  // },
  HISTO: {
    screen: histouser,
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
  initialRouteName : 'Tpe',
  headerMode: 'screen',

  headerTitle: 'Main Screen Header',

});

export default Drawer;
