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
import {Select, Option} from "react-native-chooser";
// import fetch from "fetch";


class ShowTpe extends React.Component {
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

  updateTpe(tpe) {
      const newTpe={...tpe,status:this.state.selectvalue, till_label:this.state.till_label};
      fetch(`http://ped-tracker.herokuapp.com/api/devices/${newTpe.id}`,{
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({device: newTpe, userId: "1d72faa0-318a-44c1-a15a-87f583094d7f"}),
      })
      .then(this.setModalVisible(!this.state.modalVisible));

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
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.tpe}
          onPress={()=>this.toggledetail()}
          underlayColor="rgba(253,138,94,0.2)"
          >
            <View style={styles.titleline}>
            <View style={styles.titleleft}>
              <Text style={styles.titlesn}>{this.props.tpe.serial_nr}</Text>
              {this.rendertillname()}

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
                <Text>Modèle : {this.props.tpe.model}</Text>
                <Text>Marque : {this.props.tpe.brand}</Text>
                <Text>Caisse associée : {this.props.tpe.till_label}</Text>
                <Text>Numéro de série : {this.props.tpe.serial_nr}</Text>
                <Text>Dernier relevé : {this.props.tpe.last_inspection_date}</Text>
                <Text>Dernière MAJ : {this.props.tpe.updatedAt}</Text>
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
                  icon={{name: 'history', type: 'font-awesome'}}
                  buttonStyle={{
                    backgroundColor: "#564321",
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5,
                    width: 100,
                    height: 40,
                    margin: 5,
                  }}
                  title='Historique'
                  onPress={() => this.props.modifTpe(content.serial)}
                />
              </View>
            </View>
            </TouchableHighlight>

      </View>
    )
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

  componentDidMount(){
    axios.get(`https://ped-tracker.herokuapp.com/api/locations/${this.props.storeUser}/devices`)
    .then((response) => this.props.setInitialState(response.data))
    .then(() => this.setState({listDevices: this.props.listDevices, listDevicesSrc: this.props.listDevices}))
    // .then((response) => this.setState({listDevices: response.data, listDevicesSrc: response.data}))
  }

  updateState() {
    if (this.state.listDevices !== this.props.listDevices) {
      this.setState({listDevices: this.props.listDevices, listDevicesSrc: this.props.listDevices})
    }
  }

  render(){
    console.log("*************** Props ",this.props);
    return(
      <View style={{flex:1}}>
        <PageHeader navigation={this.props.navigation}/>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 28 }}
          placeholder='Rechercher un TPE'
          onChangeText={(value) => this.setState({filtervalue : value})}
          onClear={(value) => this.setState({filtervalue : value})}
          style={{paddingBottom:10}}
          />
          <Text style={{margin:10}}>Liste des TPE du magasin</Text>
        <ScrollView>
          {/* {this.updateState()} */}
          {

            this.props.listDevices.filter(Tpe => Tpe.serial_nr.includes(this.state.filtervalue)).map((tpe,i) => (
            <ShowTpe key={i} tpe={tpe} navigation={this.props.navigation}/>
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
    fontWeight:"bold",
  },
  titletill :{
    fontWeight:"normal",
    fontSize:10,
    color:"#666666",
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
    width:"80%",
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

export default connect(mapStateToProps, mapDispatchToProps)(Tpe);
