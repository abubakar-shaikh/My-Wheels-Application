import React, {useState, useContext } from 'react';
import {StyleSheet,View,SafeAreaView, Keyboard} from 'react-native';
import {BallIndicator,} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from 'contexts/AuthContext';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Container,NavBar,Text,Button} from 'components'
import FormContaienr from './FormContainer'
// import Toast from 'react-native-toast-message';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

Feather.loadFont();
Icon.loadFont();

const storeData = async (token) => {
  try {
    const jsonValue = (token)
    await AsyncStorage.setItem('@auth_token', jsonValue)
    console.log("saved token")
  } catch (e) {
    console.log("error in token")
  }
}

const OTP = ({ navigation,route }) => {

  const {id,type} = route.params;
  const [otp, setOtp] = useState('');
  const { dispatch } = useContext(AuthContext);
  // const [toastmsg,setToastMsg] = useState('');
  // const [toastshow,setToastShow] = useState(false);
  const [show, setShow] = useState(false);


  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });

//   React.useEffect(() => {
//    RNOtpVerify.getHash()
//     .then(  console.log)
//     .catch(console.log);

//     RNOtpVerify.getOtp()
//     .then(p => RNOtpVerify.addListener(otpHandler))
//     .catch(p => console.log(p));

//    return () =>  RNOtpVerify.removeListener();
//   }, [])
  
//  const otpHandler = (message) => {
//     console.log("Message",message);
//     const otp = /(\d{6})/g.exec(message)[1];
//     setOtp(otp);
//     RNOtpVerify.removeListener();
//     Keyboard.dismiss();
//   }

  // if(toastshow){
  //   Toast.show({
  //     type:'success',
  //      position:'top',
  //      text1:toastmsg,
  //      visibilityTime:1000,
  //      autoHide:true,
  //      onShow:() => {},
  //      onHide:() => {}
  //     });
  //  }

  const anotherFunc = (val) => {
    setOtp('');
  }
  
  function Userlogin(){
    console.log('this is otp', otp);
    if(otp == undefined || otp == '' || otp == null){
        // setToastMsg('Please Fill OTP');
        // setToastShow(true)
        notification("Please Fill OTP", 'warning');
        return
      }

      axios
      .post(`${baseUrl}verify_login_api/${id}?otp=${otp}`)
      .then(function (res) {
        console.log("DATA IS",res.data)
        if(res.data.status == 200) {
          console.log("DATA IS",res.data)
          notification(res.data.message, 'success');
          // setToastMsg(res.data.message)
          // setToastShow(true);
          setShow(true)
          setTimeout(() => {
          storeData(res.data.token);
          AsyncStorage.setItem("user_id",id)
          setShow(false)
          dispatch({ type: 'SIGN_IN' })
          navigation.navigate('Home')
          },2000)
          
        }else if(res.data.status == 409 || res.data.status == 400){
          setShow(true)
          notification(res.data.message, 'warning');
          // setToastMsg(res.data.message)
          // setToastShow(true);
          setTimeout(() => {
            setShow(false)
            console.log("DATA IS",res.data)
          },2000)
        }
      })
      .catch(function (error){
        setShow(true)
        setTimeout(() => {
          setShow(false)
        },2000)
        console.log('Catch Error',error);
        notification('Something Wrong Please Try Again','danger');
        // setToastShow(true);
        // setToastMsg("Please Check Your Enternt")
      });
  }

  // function Usersignup(){
  //   console.log('this is otp', otp);
  //   console.log('this is id', id);

  //     axios
  //     .post(`${baseUrl}verify_otp_api/${id}?otp=${otp}`)
  //     .then(function (res) {
  //       console.log("DATA ISqqqww",res.data)
  //       if(res.data.status == 200) {
  //         console.log("DATA IS",res.data)
  //         setShow(true)
  //         setTimeout(() => {
  //           storeData(res.data.token)
  //           setShow(false)
  //           setToastMsg(res.data.message)
  //           setToastShow(true);
  //           navigation.navigate('SignIn')
  //         },2000)
  //       }
  //       else if(res.data.status == 409 || res.data.status == 400){
  //         setShow(true)
  //         setTimeout(() => {
  //           setShow(false)
  //           setToastMsg(res.data.message)
  //           console.log("DATA IS",res.data)
  //           setToastShow(true);
  //         },2000)
  //       }
  //     })
  //     .catch(function (error){
  //       setShow(true)
  //       setTimeout(() => {
  //         setShow(false)
  //       },2000)
  //       console.log('Catch Error',error);
  //       setToastShow(true);
  //       setToastMsg("Please Check Your Enternt")
  //     });
  // }

  return (
    <Container asGradient>
        <NavBar
            onLeftIconPress={() => navigation.goBack()}
          />

          <FormContaienr
            title="OTP Verification"
            subtitle="We have sent a 6-digits PIN to your phone number for verifcaiton purposes.">
              
            <View style={styles.otpBox}>
             <OTPInputView
                style={{width: '90%', height: 130}}
                code={otp}
                pinCount={6}
                onCodeChanged = {val => { setOtp(val)}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(otp) => {
                  console.log(`Code is ${otp}, you are good to go!`)
                }}
                keyboardAppearance='default'
                keyboardType='number-pad'
                placeholderCharacter='*'
                placeholderTextColor='#7a7a7a'
            />
              </View>
          <SafeAreaView>
          <View style={styles.buttonContainer}>
           {show ?
              <BallIndicator color='red' animationDuration={1200} animating={show} />
            :
              <Button
                label='Continues'
                onPress={() => {Userlogin(), anotherFunc(otp)}}
                // onPress={() => 
                // {if(type == 'login'){
                //   {Userlogin(), anotherFunc(otp)}
                //   console.log("check",type)
                // }else if(type == 'signup'){
                //   {Usersignup(), anotherFunc(otp)}
                //   console.log("check2",type)
                // }}}
              />
            }
          </View>
          </SafeAreaView>
          </FormContaienr>
           {/* <Toast refs={(ref) => {Toast.setRef(ref)}}/> */}
        </Container>
  );
};

export default OTP;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
  },
  otpBox: {
    alignItems:'center'
  },
  underlineStyleBase: {
    fontSize:22,
    color:"#000",
    borderBottomColor:"#e62e2d",
    borderWidth: 0,
    borderBottomWidth: 5,
  },
  underlineStyleHighLighted: {
    borderColor: "#000",
  },
  buttonContainer: {
    paddingVertical: scale(14),
    position:'relative',
    top:40
  },
  toastcontainer:{height:100,width:'95%',backgroundColor:'red',borderRadius:10,
  position:'absolute',justifyContent:'center',alignItems:'center'}
});

