'use strict';
import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  inputBox: {
      flexDirection: 'column',
      backgroundColor:'white',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
  },
  fistInput:{
    marginLeft:10,
    flexDirection: 'row',
    flex: 1,
    height:50,
    fontSize: 23,
    borderRadius: 8,
    color: '#000'
  },
  secondInput:{
    marginLeft:10,
    flexDirection: 'row',
    flex: 1,
    height:50,
    fontSize: 23,
    borderRadius: 8,
    color: '#000'
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
  },
});


export default (props) => {
        return(
          <View style={styles.inputBox}>
              <TextInput
                  style={styles.fistInput}
                  value={props.username}
                  placeholder="邮箱/用户名"
                  onChangeText={(text) => props.handleUsernameChange(text)}
                  keyboardType = { 'email-address'}
                  autoCorrect= { false}
                  returnKeyType={'next'}
              />

           <View style= {styles.separator}/>
            <TextInput
                style={styles.secondInput}
                value={props.password}
                placeholder="密码"
                onChangeText = {(text) => props.handlePassChange(text)}
                secureTextEntry = { true}
            />
         </View>
        )

}
