/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class Login extends Component {
    constructor(props){
      super(props)
      this.state = {
        username:'',
        password:'',
      }
      this._handleUsernameChange = this._handleUsernameChange.bind(this)
    }
    _handleUsernameChange(text){
       this.setState({
         username:text,
       })
       console.log(this.state)
    }
    _handlePasswordChange(text){
       this.setState({
         password:text,
       })
        console.log(this.state)
    }
    _handleSubmit(){
       const username = this.state.username;
       const password = this.state.password;
       const userInfo ={username,password}

        console.log('userInfo',userInfo)
    }

    render() {
      return(
        <View style={{flex:1}}>
          <Text>
            Hello login
          </Text>
          <View style={styles.inputBox}>
            <TextInput style={styles.textInput}
                      onChangeText={text=>this._handleUsernameChange(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput style={styles.textInput}
                      onChangeText={(text)=>{this._handlePasswordChange(text)}}
            />
          </View>
          <TouchableOpacity style={styles.submitButton}
                            activeOpacity={0.7}>
          </TouchableOpacity>
          <View style={styles.row}>
              <View style={styles.col}>
              </View>
              <View style={styles.col}>
              </View>
          </View>
        </View>
      )
    }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputBox:{
    marginTop:100,
    height:50,
    flexDirection: 'column',
    // backgroundColor:'red',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  textInput:{
    //  backgroundColor:'blue',
      // marginLeft:10,
      flexDirection: 'row',
      height:50,
      fontSize: 23,
      borderRadius: 8,
      color: '#000'
  },
  submitButton:{
    height:50,
    backgroundColor: 'red',
  },
  row:{
      height:70,
      flexDirection: 'row',
      backgroundColor:'blue',
    },
    col:{
        flex:1,
        margin:10,
        height:50,
        justifyContent:'center',
        backgroundColor:'red',
    },
});

module.exports = Login;
