import React from 'react';
import { Text, View, ScrollView, TouchableHighlight, StyleSheet, Modal, TextInput} from 'react-native';
import { Icon, Form, Picker } from "native-base";
import { SearchBar, ListItem, Button } from 'react-native-elements';
import { connect } from "react-redux";
import {mapDispatchToProps} from "./../../store/handlers.js";


class ShowForm extends React.Component {
      constructor(props){
        super(props)

        console.log("****",this.props.tpe);
        this.state = {
          selectvalue : this.props.tpe.status,
          till_label:this.props.tpe.till_label,
        }
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
          .then(this.props.updatereduxtpe(newTpe))
          .then(this.props.navigation.navigate('Home'));

        }

      render() {

        return (

              <View style={styles.modal}>
                <View style={styles.modalcontent}>

                    <Text style={styles.titletpe}>TPE n° {this.props.tpe.serial_nr}</Text>
                    <Text>Etat du TPE :</Text>
                    <Picker
                      selectedValue={this.state.selectvalue}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => this.setSelectValue({itemValue})}>
                      <Picker.Item label="Active" value="active" />
                      <Picker.Item label="En attente" value="wait" />
                      <Picker.Item label="maintenance" value="maintenance" />
                      <Picker.Item label="En transit" value="transport" />
                      <Picker.Item label="En stock" value="stored" />
                      <Picker.Item label="Retiré" value="retired" />
                      <Picker.Item label="Perdu" value="lost" />
                      <Picker.Item label="Interdit" value="forbidden" />
                      <Picker.Item label="Refusé" value="refused" />
                    </Picker>

                    <Text>Numéro de caisse :</Text>
                    <TextInput
                      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                      onChangeText={(till_label) => this.setState({till_label})}
                      value={this.state.till_label}
                    />
                    <View style={styles.buttoncontain}>
                      <Button
                        light
                        icon={{name: 'undo', type: 'font-awesome'}}
                        buttonStyle={{
                          backgroundColor: "#666666",
                          borderColor: "transparent",
                          borderWidth: 0,
                          borderRadius: 5,
                          width: 100,
                          height: 40,
                          margin: 5,
                        }}
                        title='Annuler'
                        onPress={() => this.props.navigation.goBack()}
                      />
                      <Button
                        light
                        icon={{name: 'check-square-o', type: 'font-awesome'}}
                        buttonStyle={{
                          backgroundColor: "rgba(72, 167,74, 1)",
                          borderColor: "transparent",
                          borderWidth: 0,
                          borderRadius: 5,
                          width: 120,
                          height: 40,
                          margin: 5,
                        }}
                        title='Valider'
                        onPress={() => this.updateTpe(this.props.tpe)}
                        // onPress={() => this.props.navigation.navigate('updatetpe',{tpe : this.props.tpe})}
                      />
                    </View>



                </View>
              </View>
        );
      }
    }


export default class ModifTpe extends React.Component {

  render() {
    let tpe = this.props.navigation.getParam('tpe');
  console.log(tpe);
  return (
    <ShowFormConnected tpe={tpe} navigation={this.props.navigation}/>
  )

}
}

let ShowFormConnected=connect(null, mapDispatchToProps)(ShowForm);

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
