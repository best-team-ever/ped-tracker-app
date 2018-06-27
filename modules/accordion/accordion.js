import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Picker, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Accordion, Icon, Body, Left, Title, Subtitle, Right } from "native-base";
import { Button } from "react-native-elements";
import PageHeader from "./../pageheader/pageheader.js"
// import { datatill } from "./../data/data.js"
import {mapStateToProps} from "./../../store/selector.js";
import {mapDispatchToProps} from "./../../store/handlers.js";
import { connect } from "react-redux";
import axios from "axios";

class ShowTill extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewdetail:false,
    }
  }
  toggledetail() {
    this.setState({viewdetail:!this.state.viewdetail})
  }

  renderStatusIcon = (status) => {
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

  render() {
    console.log(this.props.tpe.id);
    return (
      <View>
      <TouchableHighlight
        style={styles.till}
        onPress={()=>this.toggledetail()}
        underlayColor="rgba(253,138,94,0.2)"
        >
        <View style={styles.tillbox}>
          <Text>
            Caisse {this.props.tpe.till_label}
          </Text>
          <Text>
            {this.props.tpe.status}
          </Text>
          <View style={styles.tillboxright}>
            <Text>
               {this.renderStatusIcon(this.props.tpe.status)}
            </Text>
            <Text>
              <Icon style={{ fontSize: 12 }} name="chevron-down" type="FontAwesome" />
            </Text>
          </View>
        </View>


      </TouchableHighlight>
      <TouchableHighlight
        style={(this.state.viewdetail) ? styles.view : styles.hide}
        >
          <View>
            <Text>Modèle : {this.props.tpe.model}</Text>
            <Text>N° Série : {this.props.tpe.serial_nr}</Text>
            <Text>Mise en service : {this.props.tpe.createdAt}</Text>
            <View style={styles.buttonbox}>
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
                title='Confirmer'
                onPress={() => this.props.confirmTpe(this.props.tpe.serial_nr)}
              />
              <Button
                light
                icon={{name: 'edit', type: 'font-awesome'}}
                buttonStyle={{
                  backgroundColor: "rgba(92, 99,216, 1)",
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5,
                  width: 100,
                  height: 40,
                  margin:5,

                }}
                title='Modifier' />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

class AccordionTills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: this.props.navigation,
      listDevices :[],
    }
  }

  componentDidMount(){
  // console.log(this.props.match.params.categoryId);
  // axios.get(`http://192.168.38.58:8000/api/devices`)
  axios.get(`https://ped-tracker.herokuapp.com/api/devices`)
  //.then((response) => console.log(response))
    .then((response) => this.props.initialState(response.data))
  // .then((response) => this.setState({listDevices: response.data}))
}


  showTpe() {
    if (this.state.listDevices !== []) {
      //console.log(this.state.listDevices[0])
      return this.state.listDevices.map((tpe, i) =>
      <ShowTill key={i} tpe={tpe}/>)
    }

  }

  render() {
    console.log("*** props :",this.props)
    return (
      <View style={styles.container}>

        <Container style={styles.padder}>
          <PageHeader navigation={this.props.navigation}/>
          <Content padder >
            <Text>Etat des caisses{console.log(this.props.loggedIn)}</Text>
              {this.showTpe()}
            {/* <Accordion
              dataArray={this.props.datatill}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
               /> */}
          </Content>
        </Container>
    </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccordionTills);

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
    marginBottom:15,
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
    width:"100%",
    flexWrap:"wrap",
    justifyContent:"flex-end",
  },
  till :{
    backgroundColor: "#FFFFFF",
    borderColor: "#AAAAAA",
    width:"100%",
    padding:15,
    margin:2,
    borderWidth:1,
    borderRadius:6,

  },
  tillbox:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  tillboxright:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:80,
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
  buttonbox:{
    display:"flex",
    flexDirection:"row",
  }
});
