import React from 'react';
import Drawer from './../drawer/drawer.js';
import { Text, View, Button } from 'react-native';
import { connect } from "react-redux";
import {mapStateToProps} from "./../../store/selector.js";
import {mapDispatchToProps} from "./../../store/handlers.js";
import Expo from 'expo';

class login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected:"no",
    }
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "543778070923-30lcvau13d7aqqnp93p91n90f836364i.apps.googleusercontent.com",
        iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile openid email'],
      })

      if (result.type === 'success') {
        this.props.connected(result.user.email);

        return result
      }
      return { cancelled: true }
    } catch (e) {
      return { error: e }
    }
  }


  onLoginPress = async () => {
    //this.setState({connected:"running"})
    const result = await this.signInWithGoogleAsync();

    // if there is no result.error or result.cancelled, the user is logged in
    // do something with the result
  }

  render() {
    if (this.props.loggedIn) {
      return (
          <View style={{flex:1}}>
            <Drawer/>
          </View>
      );
    }
    else {
      if (this.state.connected==="running") {
        return (
            <View style={{flex:1, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              <Text>En cours</Text>
            </View>
        );
      } else {
      return (
          <View style={{flex:1, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Text>Tu n'es pas encore connecté</Text>
            <Button onPress={this.onLoginPress} title="Login"></Button>
          </View>
      );
    }
    }

  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     connected : () => dispatch({type : "CONNECTED"}),
//   }
// }

export default connect(mapStateToProps,mapDispatchToProps)(login);
