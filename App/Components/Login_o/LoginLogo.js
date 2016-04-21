'use strict';
import React, {
  Image,
  StyleSheet,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  logoBox: {
      flexDirection: 'row',
      height: 100,

      // backgroundColor: '#aaaaaa',
      alignSelf: 'center',
  },
  logo:{
    width:240,
    height:80,
  },
});


export default (props) => {
        return(
          <View style={styles.logoBox}>
              <Image source={require('../../Image/logo.png')} style={styles.logo} />
         </View>
        )

}
