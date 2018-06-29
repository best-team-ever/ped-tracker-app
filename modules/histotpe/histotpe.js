import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import axios from "axios";

class ShowEvents extends React.Component {
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

export default class histotpe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      histo:[]
    }
  }

  componentDidMount(){
      let tpe = this.props.navigation.getParam('tpe');
      console.log(`http://ped-tracker.herokuapp.com/api/devices/${tpe.id}/events/`)
    axios.get(`http://ped-tracker.herokuapp.com/api/devices/${tpe.id}/events/`)
    .then((response) => this.setState({histo: response.data}))
    }

  render() {
    let tpe = this.props.navigation.getParam('tpe');
    return (
      <ScrollView>
        <Button
          light
          icon={{name: 'undo', type: 'font-awesome'}}
          buttonStyle={{
            backgroundColor: "#666666",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            width: 200,
            height: 35,
            margin: 5,
          }}
          title='< Retour'
          onPress={() => this.props.navigation.goBack()}
        />
        <Text>Historique du TPE</Text>
        <Text>n° de série{tpe.serial_nr}</Text>
        {this.state.histo.map((hist, id) =>
          <ShowEvents key={id} hist={hist}/>)}
      </ScrollView>
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
