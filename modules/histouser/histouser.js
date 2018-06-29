import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import axios from "axios";
import { connect } from "react-redux";
import {mapStateToProps} from "./../../store/selector.js";
import {mapDispatchToProps} from "./../../store/handlers.js";
import PageHeader from "./../pageheader/pageheader.js";

class ShowUserEvents extends React.Component {
  render() {
    console.log("**** Hist :",this.props.hist)
    return (
      <View style={styles.histitem}>
        <View style={styles.histtitle}>
          <Text>
            {this.props.hist.createdAt.split("T")[0]}
          </Text>
          <Text style={{fontSize:10}}>
            {this.props.hist.createdAt.split("T")[1].split(".")[0]}
          </Text>
        </View>
        <View style={styles.histvalue}>

          <Text>{this.props.hist.message}</Text>

        </View>
      </View>
    )
  }
}

class histouser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      histo:[]
    }
  }

  componentDidMount(){
    console.log(this.props);
      console.log(`http://ped-tracker.herokuapp.com/api/users/${this.props.userId}/events/`)
    axios.get(`http://ped-tracker.herokuapp.com/api/users/${this.props.userId}/events/`)
    .then((response) => this.setState({histo: response.data}))
    }

  render() {
    return (
      <View>
        <PageHeader navigation={this.props.navigation}/>
        <ScrollView>
          <Text>Historique de {this.props.emailUser}</Text>
          {this.state.histo.map((hist, id) =>
            <ShowUserEvents key={id} hist={hist}/>)}
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  histo :{
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  histitem :{
    display:"flex",
    width:"96%",
    height:92,
    padding:8,
    margin:5,
    borderWidth:1,
    borderRadius:5,
    backgroundColor: '#f2F2F2',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  histtitle :{
    display:"flex",
    width:"100%",
    padding:0,
    margin:0,
    backgroundColor: '#f2F2F2',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  histvalue :{
    display:"flex",
    width:"100%",
    padding:8,
    margin:5,
    backgroundColor: '#D8DDF0',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(histouser);
