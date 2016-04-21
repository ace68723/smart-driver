'use strict';
import React, {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  secondButtonBox:{
    flexDirection: 'row',
    height: 40,
    marginTop:15,
    // backgroundColor: '#aaaaaa'
  },
  button: {
      flex: 1,
      backgroundColor: '#fff',
      borderColor: '#76d5ff',
      borderWidth: 1,
      borderRadius: 8,
      alignItems:'center',
      justifyContent:'center',
  },
  buttonText: {
      fontSize: 15,
      color:'#76d5ff',
  },
});


export default (props) => {
        return(
          <View style={styles.secondButtonBox}>
             <TouchableHighlight
                style={styles.button}
                underlayColor="rgba(118,213,255,0.7)">
               <Text style={styles.buttonText}>
                 注册新用户
               </Text>
             </TouchableHighlight>
             <View style={{width:15}}>
             </View>
             <TouchableHighlight
                style={styles.button}
                underlayColor="rgba(118,213,255,0.7)">
               <Text style={styles.buttonText}>
                 忘记密码
               </Text>
             </TouchableHighlight>
         </View>
        )

}
