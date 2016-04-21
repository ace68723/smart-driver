'use strict';
import React, {
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
const styles = StyleSheet.create({
  thirdButtonBox:{
    flexDirection: 'row',
    height: 80,
    marginTop:25,
    // backgroundColor: '#aaaaaa',
    alignItems:'center',
    justifyContent:'center',
  },
  logo:{
    width:150,
    height:45,
  },
});


export default (props) => {
        return(
          <TouchableHighlight
            style={styles.thirdButtonBox}
            onPress = { props.handleWecahtLogin }
            underlayColor="rgba(0,0,0,0)">
            <Image source={require('../../Image/wechat.png')} style={styles.logo} />
         </TouchableHighlight>
        )

}
