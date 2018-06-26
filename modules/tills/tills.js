import React from 'react';
import { Text, View, Button} from 'react-native';
import AccordionTills from './../accordion/accordion.js';

class Tills extends React.Component {
  render(){
    return(
      <View style={{flex:1}}>
        <AccordionTills navigation={this.props.navigation}/>
      </View>

    )
  }
}

export default Tills
