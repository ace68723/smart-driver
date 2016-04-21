/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AlertIOS,
  Component,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  NativeAppEventEmitter,
  View,
  WebView,
} from 'react-native';
import AppActions from '../../Actions/AppActions';
import AuthStore from '../../Stores/AuthStore';
import WeChat from 'react-native-wechat-ios';
import Loading from '../Helpers/Loading';
import LoadingCanvas from '../Helpers/LoadingCanvas';
import AuthService from '../../Services/AuthService'
import AppConstants from '../../Constants/AppConstants';

let scope = 'snsapi_userinfo';
let state = 'wechat_sdk_test';
let appid = 'wx20fd1aeb9b6fcf82'

const ERROR_PASSWORD = AppConstants.ERROR_PASSWORD;
const ERROR_NETWORK = AppConstants.ERROR_NETWORK;
const ERROR_PASSWORD_MESSAGE = AppConstants.ERROR_PASSWORD_MESSAGE;
const ERROR_NETWORK_MESSAGE = AppConstants.ERROR_NETWORK_MESSAGE;
const ALERT_TITLE = AppConstants.ALERT_TITLE;
const STARTED = AppConstants.STARTED;



function show(title, msg) {
    AlertIOS.alert(title+'', msg+'');
}

class Login extends Component {

    componentDidMount() {
            this.registerApp();

            NativeAppEventEmitter.addListener(
              'didRecvAuthResponse',
              (response) => {
                  // AlertIOS.alert('res', JSON.stringify(response))
                  this.setState({
                     isLoading: false
                  });
              }
            );

            NativeAppEventEmitter.addListener(
                'didRecvMessageResponse',
                (response) => {
                    if (parseInt(response.errCode) === 0) {
                        alert('分享成功');
                    } else {
                        alert('分享失败');
                    }
                }
            );
            AuthService.doAuth()
              .then((res) => {
                console.log(res)
              })
              .catch((error) => {
                console.log(error)
              })
        }
    registerApp() {
        WeChat.registerApp(appid, (res) => {
            // show('registerApp', res);
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            username: 'ace68723',
            password: 'ace68723',
            isLoading:false,
        }

    }
    handleUsernameChange(text) {
        this.setState({
           username: text
        });
    }
    handlePassChange(text) {
        this.setState({
            password: text
        });
    }
    handleSubmit(event){
        this.setState({
           isLoading: true
        });
        AuthService.login(this.state.username,this.state.password)
            .then((res) => {
                this.setState({
                   isLoading: false
                });
                console.log(res)
            }).catch(res =>{
                if(res !== STARTED){
                    this.setState({
                       isLoading: false
                    });
                    if(res === ERROR_PASSWORD){
                        AlertIOS.alert('馋猫订餐',ERROR_PASSWORD_MESSAGE);
                    }
                    if(res === ERROR_NETWORK){
                        AlertIOS.alert('馋猫订餐',ERROR_NETWORK_MESSAGE);
                    }
                }else{
                  console.log(STARTED)
                }


            })
    }

    handleWecahtLogin(event){
        this.setState({
           isLoading: true
        });

        // WeChat.sendAuthReq(scope, state, (res) => {
        //     // alert(res); // true or false

        // });
        // WeChat.sendLinkURL({
        //     link: 'https://itunes.apple.com/us/app/chan-mao-ding-can/id888553991?mt=8',
        //     tagName: '馋猫',
        //     title: '馋猫app 2.0.1-a 微信分享接口测试',
        //     desc: '2.0.1-a',
        //     thumbImage: 'http://a5.mzstatic.com/us/r30/Purple69/v4/8c/bd/17/8cbd179e-00ff-0f54-5e44-1ed9446e8f9f/icon175x175.png',
        //     scene: 1
        // });
        // WeChat.sendImage({
        //     path: 'https://dn-qianlonglaile.qbox.me/static/pcQianlong/images/buy_8e82463510d2c7988f6b16877c9a9e39.png', //本地图片位置,可以用react-native-fs获取
        //     tagName: '钱隆',
        //     title: '哈哈哈哈哈哈',
        //     desc: '噢噢噢噢哦哦哦哦哦哦',
        //     scene: 1
        // },(res) => {
        //     console.log(res)
        // });
        // WeChat.isWXAppInstalled((res) => {
        //     alert('isWXAppInstalled: '+res); // true or false
        // });
        // WeChat.getApiVersion((res) => {
        //     alert('wechat version: ' + res);
        // })
        // WeChat.openWXApp()







        // onChangeText={this.handleEmailChange.bind(this)}
    }
    render(){
        return(

            <View style={styles.mainContainer}>
                <Text >Login</Text>

                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    placeholder="邮箱/用户名"
                    onChangeText={(text) => this.handleUsernameChange(text)}
                    keyboardType = { 'email-address'}
                    autoCorrect= { false}
                    returnKeyType={'next'}
                />
                <TextInput
                    style={styles.searchInput}
                    value={this.state.password}
                    placeholder="密码"
                    onChangeText = {(text) => this.handlePassChange(text)}
                    secureTextEntry = { true}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress = { this.handleSubmit.bind(this) }
                    underlayColor="white">
                       <Text style={ styles.buttonText }>Login </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress = { this.handleWecahtLogin.bind(this) }
                    underlayColor="white">
                       <Text style={ styles.buttonText }>微信登陆 </Text>
                </TouchableHighlight>


                <LoadingCanvas active={this.state.isLoading}/>
            </View>

        )
    }

}




let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

});

module.exports = Login;
