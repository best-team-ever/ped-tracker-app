import React from 'react';
import {mapStateToProps} from "./../../store/selector.js";
import {mapDispatchToProps} from "./../../store/handlers.js";
import { connect } from "react-redux";
import { Text, View, ScrollView, TouchableHighlight, StyleSheet, Modal, TextInput} from 'react-native';
import { Icon, Form, Picker } from "native-base";
import PageHeader from "./../pageheader/pageheader.js";
import { SearchBar, ListItem, Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { dataped } from "./../data/data.js";
import axios from "axios";
import moment from "moment";
import {Select, Option} from "react-native-chooser";
// import fetch from "fetch";


class ShowTill extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewdetail:false,
      modalVisible: false,
      selectvalue : this.props.tpe.status,
      till_label:this.props.tpe.till_label,
      language: "not",
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setSelectValue(value) {
    this.setState({selectvalue: value.itemValue});
  }

  confirmTpe(tpe) {
      const currentDate = new Date();
      const stringDate = moment().format();
      const newTpe={...tpe,last_inspection_date: stringDate};
      console.log("*** TPE ",tpe)
      console.log("*** NEW TPE ",newTpe)
      fetch(`http://ped-tracker.herokuapp.com/api/devices/${newTpe.id}`,{
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({device: newTpe, userId: "1d72faa0-318a-44c1-a15a-87f583094d7f"}),
      })
      .then(this.props.updatereduxtpe(newTpe))

    }

  toggledetail() {
    this.setState({viewdetail:!this.state.viewdetail})
  }

  renderStatusIcon = (status) => {
    // active
    // wait
    // maintenance
    // transport
    // stored
    // retired
    // lost
    // forbidden
    // refused
    if (status === "active") {
      return <Icon style={{ fontSize: 18, color:"green" }} name="check" type="FontAwesome" />
    }
    if (status === "maintenance") {
      return <Icon style={{ fontSize: 18, color:"orange" }} name="warning" type="FontAwesome" />
    }
    else {
      return <Icon style={{ fontSize: 18, color:"red" }} name="close" type="FontAwesome" />
    }
  }
  rendertillname() {

      if (this.props.tpe.till_label) {
        return (<Text style={styles.titletill}>Caisse {this.props.tpe.till_label}</Text>)
      }
  }

  render() {
    if (this.props.tpe.till_label) {
      return (
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.tpe}
            onPress={()=>this.toggledetail()}
            underlayColor="rgba(253,138,94,0.2)"
            >
              <View style={styles.titleline}>
              <View style={styles.titleleft}>
                {this.rendertillname()}
                <Text style={styles.titlesn}>{this.props.tpe.serial_nr}</Text>


              </View>
              <Text>
                {this.props.tpe.status}
              </Text>
              <Text>
                 {this.renderStatusIcon(this.props.tpe.status)}
              </Text>
            </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={(this.state.viewdetail) ? styles.view : styles.hide}
              >
                <View>
                <View style={styles.tpeinfos}>
                  <Text>Modèle du TPE : {this.props.tpe.model}</Text>
                  <Text>Marque : {this.props.tpe.brand}</Text>
                  <Text>Numéro de série : {this.props.tpe.serial_nr}</Text>
                  <Text>Dernière inspection : {this.props.tpe.last_inspection_date}</Text>
                </View>
                <View style={styles.buttoncontain}>
                  <Button
                    light
                    icon={{name: 'edit', type: 'font-awesome'}}
                    buttonStyle={{
                      backgroundColor: "rgba(72, 167,74, 1)",
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 5,
                      width: 120,
                      height: 40,
                      margin: 5,
                    }}
                    title='Modifier'
                    // onPress={() => this.setModalVisible(true)}
                    onPress={() => this.props.navigation.navigate('modiftpe',{tpe : this.props.tpe})}
                  />
                  <Button
                    light
                    icon={{name: 'check-circle-o', type: 'font-awesome'}}
                    buttonStyle={{
                      backgroundColor: "rgba(72, 167,74, 1)",
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 5,
                      width: 150,
                      height: 40,
                      margin: 5,
                    }}
                    title='Confirmer TPE'
                    // onPress={() => this.setModalVisible(true)}
                    onPress={() => this.confirmTpe(this.props.tpe)}
                  />
                </View>
              </View>
              </TouchableHighlight>

        </View>
      )
    }
      else{
        return (
          <View></View>
        )
      }
  }
}

class Tpe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listDevices: this.props.listDevices,
      listDevicesSrc: this.props.listDevices,
      filtervalue:"",
      load:"no",
    }
  }

  sortList(list) {
    const sorted = list.sort( (a, b) => (a.till_label.localeCompare(b.till_label)));
    // console.log("*** LIST :", list);
    // console.log("*** SORTEDLIST :", sorted)
    return sorted
  }

  componentDidMount(){
    axios.get(`https://ped-tracker.herokuapp.com/api/locations/${this.props.storeUser}/devices`)
    .then((response) => this.props.setInitialState(response.data))
    .then(() => this.setState({listDevices: this.sortList(this.props.listDevices), listDevicesSrc: this.sortList(this.props.listDevices)}))
    // .then((response) => this.setState({listDevices: response.data, listDevicesSrc: response.data}))
  }

  updateState() {
    if (this.state.listDevices !== this.props.listDevices) {
      this.setState({listDevices: this.props.listDevices, listDevicesSrc: this.props.listDevices})
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <PageHeader navigation={this.props.navigation}/>
        <Text style={{margin:10}}>Etat des caisses</Text>
        <ScrollView>
          {
            this.props.listDevices.filter(Tpe => Tpe.serial_nr.includes(this.state.filtervalue)).map((tpe,i) => (
            <ShowTillConnected key={i} tpe={tpe} navigation={this.props.navigation}/>
            )
          )
          }
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container :{
    width:"100%",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexWrap:"wrap",
    justifyContent: 'flex-end',
  },
  titleline :{
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems:"center",
  },
  titleleft :{
    flexDirection:"column",
    justifyContent: "space-between",
  },
  titlesn :{
    fontWeight:"normal",
    fontSize:10,
    color:"#666666",
  },
  titletill :{
    fontWeight:"bold",
  },
  tpe :{
    backgroundColor: "#FFFFFF",
    borderColor: "#AAAAAA",
    width:"93%",
    padding:15,
    margin:2,
    borderWidth:1,
    borderRadius:6,

  },

  view :{
    overflow:"visible",
    margin: 10,
    padding:10,
    width: "90%",
    height: "auto",
    backgroundColor: "#F2F2F2",
  },
  hide :{
    height:0,
    overflow:"hidden",
  },
  modal :{
    top:0,
    backgroundColor:'rgba(0,0,0,0.8)',
    marginTop: 0,
    height:"100%",
    display:"flex",
    justifyContent:"center",


  },
  modalcontent :{
    padding:10,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    display:"flex",
  },
  buttoncontain :{
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-around",
    padding:7,
    width:"90%",
    marginTop:9,
  },
  picker :{
    height: 50,
    width: 300,
    backgroundColor:"#F2F2F2",
    borderWidth:1,
    borderColor:"#F2F2F2",
    borderRadius:5,
    marginBottom:5,
  },
  titletpe :{
    fontWeight:"bold",
    padding: 5,
  }
});

let ShowTillConnected=connect(null, mapDispatchToProps)(ShowTill);
export default connect(mapStateToProps, mapDispatchToProps)(Tpe);
