'use strict';
import React, {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
const styles = StyleSheet.create({

    firstButtonBox:{
      flexDirection: 'row',
      marginTop:30,
      height: 50,
      // backgroundColor: '#aaaaaa'
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
    button: {
      flex:1,
      backgroundColor: '#76d5ff',
      borderColor: '#76d5ff',
      borderWidth: 1,
      borderRadius: 8,
      alignItems:'center',
      justifyContent:'center',
    },
});


export default (props) => {
        return(
          <View style={styles.firstButtonBox}>
            <TouchableHighlight
                style={styles.button}
                onPress = { props.handleSubmit }
                underlayColor="rgba(118,213,255,0.7)"
                activeOpacity={0.7}>
                   <Text style={ styles.buttonText }>登录 </Text>
            </TouchableHighlight>
         </View>
        )

}
