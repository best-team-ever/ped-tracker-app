import React from 'react';
import { Text, View, Button, ScrollView, TouchableHighlight, StyleSheet} from 'react-native';
import { Icon } from "native-base";
import PageHeader from "./../pageheader/pageheader.js";
import { SearchBar, ListItem } from 'react-native-elements';
import { dataped } from "./../data/data.js";
import axios from "axios";

class ShowTpe extends React.Component {
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
    if (status === "Active") {
      return <Icon style={{ fontSize: 18, color:"green" }} name="check" type="FontAwesome" />
    }
    if (status === "warning") {
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
                <Text>OK</Text>
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
                  title='Modifier'
                  onPress={() => this.props.modifTpe(content.serial)}
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
                  title='Historique'
                  onPress={() => this.props.modifTpe(content.serial)}
                />
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
      listDevices: [],
      listDevicesSrc: [],
    }
  }

  componentDidMount(){
    axios.get(`https://ped-tracker.herokuapp.com/api/devices`)
    .then((response) => this.setState({listDevices: response.data, listDevicesSrc: response.data}))
  }

  render(){
    return(
      <View style={{flex:1}}>
        <PageHeader navigation={this.props.navigation}/>
        <SearchBar
          lightTheme
          round
          searchIcon={{ size: 28 }}
          placeholder='Rechercher un TPE'
          onChangeText={(value) => this.setState({listDevices : this.state.listDevicesSrc.filter(Tpe => Tpe.serial_nr.includes(value))})}
          onClear={(value) => this.setState({listDevices : this.state.listDevicesSrc.filter(Tpe => Tpe.serial_nr.includes(value))})}
          style={{paddingBottom:10}}
          />
          <Text style={{margin:10}}>Liste des TPE du magasin</Text>
        <ScrollView>
          {
            this.state.listDevices.map((tpe,i) => (
              // <ListItem
              //   key={i}
              //   title={tpe.serial_nr}
              //   subtitle={"Caisse "+tpe.till_label}
              // />
            <ShowTpe key={i} tpe={tpe} />
            ))
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
});

export default Tpe
