import React from 'react';
import { StyleSheet, Text, View, StatusBar, Picker, BackHandler, Alert } from 'react-native';
import { Header, Icon, Body, Left, Right } from "native-base";
// import RNExitApp from 'react-native-exit-app';

function quitApp() {
    Alert.alert(
  'Quitter l\'application ?',
  '',
  [
  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  {text: 'OK', onPress: () => BackHandler.exitApp()},
  ],
  { cancelable: false }
  )
}

export default class PageHeader extends React.Component {
  render() {
    return(
      <Header style={styles.pageheader}>
        <Left>
          <Icon
            type="Entypo"
            name="menu"
            style={{fontSize: 40, color: 'white'}}
            onPress={() => this.props.navigation.openDrawer()}
          />
        </Left>
        <Body>
          <Text style={styles.pagetitle}>PED Tracker</Text>
      </Body>
        <Right>
          <Icon
            type="Entypo"
            name="log-out"
            style={{fontSize: 30, color: 'white'}}
            onPress={() => quitApp()}
          />{
          }
        </Right>
        </Header>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    padding: 16,
    marginBottom:2,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width:'100%',
    borderColor:'#A6B3C1',
    borderTopWidth:1,
  },
  pageheader: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0082C3",
    borderColor:'#A6B3C1',
    borderBottomWidth:1,
  },
  pagetitle: {
    fontWeight:"bold",
    fontSize:21,
    color:"white",
  },
  title: {
    fontSize:16,
    fontWeight:"bold",
  },
  content: {
    margin:10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    flex:1,
    flexWrap:"wrap",
    width:"93%",
  },
  padder: {
    display:"flex",
    flex:1,
    flexWrap:"wrap",
    justifyContent:"flex-end",
  },
});
