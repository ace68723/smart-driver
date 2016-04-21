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
  NavigatorIOS,
  View,
  WebView,
} from 'react-native';
// import AppActions from '../../Actions/AppActions';

import WeChat from 'react-native-wechat-ios';

import AuthStore from '../../Stores/AuthStore';
import AuthService from '../../Services/AuthService'
import AppConstants from '../../Constants/AppConstants';
import AuthAction from '../../Actions/AuthAction';


import Loading from '../Helpers/Loading';
import LoadingCanvas from '../Helpers/LoadingCanvas';

import LoginInput from './LoginInput';
import LoginLogo from './LoginLogo';
import FirstButton from './FirstButton';
import SecondButton from './SecondButton';
import LoginWechat from './LoginWechat';
import LoginFooter from './LoginFooter';

import Tabs from '../Tabs';

const scope = 'snsapi_userinfo';
const state = 'wechat_sdk_test';
const appid = 'wx20fd1aeb9b6fcf82';

const ERROR_PASSWORD = AppConstants.ERROR_PASSWORD;
const ERROR_NETWORK = AppConstants.ERROR_NETWORK;
const ERROR_PASSWORD_MESSAGE = AppConstants.ERROR_PASSWORD_MESSAGE;
const ERROR_NETWORK_MESSAGE = AppConstants.ERROR_NETWORK_MESSAGE;
const ALERT_TITLE = AppConstants.ALERT_TITLE;
const STARTED = AppConstants.STARTED;



function show(title, msg) {
    AlertIOS.alert(title+'', msg+'');
}
const isAuthed = ()=>{
 return AuthStore.isAuthed()
}
class Login extends Component {
    constructor() {
        super();
        this.state = isAuthed()
        this._onChange = this._onChange.bind(this)
    }
    _showAlert(message){
        AlertIOS.alert(
         "title",
         message
        );
    }
    _onChange(){
      this.setState(isAuthed)
      console.log('login.js',this.state)
      if(this.state.errorMessage){
        this._showAlert(this.state.errorMessage)
      }
    }
    componentDidMount() {
            this.registerApp();
            NativeAppEventEmitter.addListener(
              'didRecvAuthResponse',
              (res) => {
                  // AlertIOS.alert('res', JSON.stringify(response))
                  AuthService.doWechatAuth(res.code)
                  console.log(res)
                  this.setState({
                     isLoading: false,
                     unAuth:true
                  });
              }
            );
            // NativeAppEventEmitter.addListener(
            //     'didRecvMessageResponse',
            //     (response) => {
            //         if (parseInt(response.errCode) === 0) {
            //             alert('分享成功');
            //         } else {
            //             alert('分享失败');
            //         }
            //     }
            // );
            AuthStore.addChangeListener(this._onChange);
            AuthService.doAuth()
    }
    componentWillUnmount(){
      AuthStore.removeChangeListener( this._onChange )
    }
    registerApp() {
        WeChat.registerApp(appid, (res) => {
            // show('registerApp', res);
        });
    }
    _listener(){
      console.log('_listener'+ AuthStore.isAuthed());

      // this.setState({
      //    isLoading: false,
      //    isAuthed:AuthStore.isAuthed()
      // });
    }

    showLoading(){
      if(this.state.isLoading)
        return(<Loading />)
    }
    handleSubmit(event){
        this.setState({
           isLoading: true
        });
        AuthService.doLogin(this.state.username,this.state.password)
        .catch((error) => {
            console.log(error)
        });



        // setTimeout(function () {
        //     AuthService.doAuth()
        // },3000)


        // console.log(event)
        // AuthAction.doLogin.bind(this);
    }

    handleWecahtLogin(event){
        this.setState({
           isLoading: true
        });

        WeChat.sendAuthReq(scope, state, (res) => {
            alert(res); // true or false

        });
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
        WeChat.isWXAppInstalled((res) => {
            alert('isWXAppInstalled: '+res); // true or false
        });
        // WeChat.getApiVersion((res) => {
        //     alert('wechat version: ' + res);
        // })
        // WeChat.openWXApp()







        // onChangeText={this.handleEmailChange.bind(this)}
        // <Image source={require('../../Image/logo.png')} style={styles.logo} />
    }

    renderLoginView () {
      // if(!this.state.isAuthed){
        return(
          <View style={styles.mainContainer}>
              <ScrollView scrollEnabled ={false}
                  style={styles.scrollView}>
                  <LoginLogo />
                  <LoginInput username = {this.state.username}
                              password = {this.state.password}
                              handleUsernameChange = {this.handleUsernameChange.bind(this)}
                              handlePassChange = {this.handlePassChange.bind(this)}
                  />
                  <FirstButton   handleSubmit = {this.handleSubmit.bind(this)}/>
                  <SecondButton />
                  <LoginWechat handleWecahtLogin = {this.handleWecahtLogin.bind(this)}/>
               </ScrollView>
               <LoginFooter />

          </View>

        )
      // }
    }
    renderTabs () {
      if(this.state.isAuthed){
        return(
          <NavigatorIOS
              style={styles.mainContainer}
              initialRoute={{
                  component: Loading,
                  title: 'Home',
                  navigationBarHidden: true,

              }}
          />
          // <Tabs />
        )
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
//   {this.renderTabs()}
    render(){
      return(
          <View style={styles.mainContainer}>
            {this.renderLoginView()}

            {this.showLoading()}
          </View>
      )



    }

}




let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView:{
    flex: 1,
    padding: 30,
    marginTop: 65,
  }

});

module.exports = Login;
