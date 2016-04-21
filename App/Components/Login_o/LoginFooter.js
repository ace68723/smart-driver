'use strict';
import React, {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  thirdButtonBox:{
    bottom:0,
    height: 20,
    // backgroundColor: '#aaaaaa',
    alignItems:'center',
    justifyContent:'center',
  },
  copyright:{
    fontSize:15,
    backgroundColor:'rgba(0,0,0,0)',
  },
});


export default (props) => {
        return(
          <View style={styles.thirdButtonBox}>
            <Text style={styles.copyright}>Chanmao Inc. 版权所有</Text>
         </View>
        )

}
