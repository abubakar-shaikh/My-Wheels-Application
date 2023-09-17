import React, {useState,useRef} from 'react';
import {Container, NavBar, TextField,Text,Button} from 'components';
import { scale, verticalScale } from 'react-native-size-matters';
import { getScreenWidth } from 'utils/size';
import {StyleSheet, View, TouchableOpacity ,ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';
import PhoneNumberInput from '../../components/Form/PhoneNumberInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';
// import Toast from 'react-native-toast-message';
import {showMessage} from 'react-native-flash-message';
import {BallIndicator} from 'react-native-indicators';
import TextInputCompnent from '../../components/Form/TextInputCompnent';
import PasswordInputComponent from '../../components/Form/PasswordInputComponent';
import RegularText from '../../components/TextComponents/RegularText';
import {
  Required,
  PasswordValidation,
  EmailValidation,
} from '../../utils/Validations';
import Toast from 'react-native-toast-message';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent';



const SignUp = ({ navigation }) => {

  const [view, setView] = useState('email');
  const [isLoading, setIsLoading] = useState(false)

   const [username, setUserName] = useState('');
  const [usernameErr, setUserNameErr] = useState(false);

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);

    const [dialCode, setDialCode] = useState('+92');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberErr, setMobileNumberErr] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);

  const [cPassword, setCPassword] = useState('');

  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });

  
  const signUp = () => {
       if (!Required('Name', name)) setNameErr(true);
       else if (!Required('User Name', username)) setUserNameErr(true);
      else if (view == "email" && !Required('Email', email)) setEmailErr(true);
      else if (view == "email" && !EmailValidation(email)) {
        Toast.show({
          type: 'error',
          text1:'error',
          text2: 'Email should be in correct format',
        });
      }
      else if (view == "email" && !Required('password', password)) setPasswordErr(true);
    else if (view == "email" && !PasswordValidation(password)) {
      Toast.show({
        type: 'error',
        text1:'error',
        text2: 'Password not in correct format',
      });
    } else if (view == "email" && password != cPassword) {
      Toast.show({
        type: 'error',
        text1:'error',
        text2: 'Password does not matched',
      });
    }
    else if (view == "phone" && !Required('Mobile Number', mobileNumber)) setMobileNumberErr(true);
else{
setIsLoading(true)
  var qs = require('qs');
  if(view == "email"){
    var data = qs.stringify({
      'name': name,
      'username': username,
      'email': email,
      'password': password,
  })
  
  }
  else if (view == "phone"){
    var data = qs.stringify({
      'name': name,
      'username': username,
      'phone': dialCode + mobileNumber,
  })
  }
  console.log("data",data);
  var config = {
    method: 'post',
    url: `${baseUrl}signup_api`,
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': 'ci_session=f4062273301edf619a59d8df78c4435e387ec335'
    },
    data : data
  };
  
  axios(config)
  .then(function (res) {
    console.log('responee not stringfy', res.data.status);
    if(res.data.status == 200){
      setIsLoading(false)
      notification(res.data.message, 'success')
     
    if(view == 'phone'){
        navigation.navigate('OTP',{id : res.data.id});
    }
      console.log('responee data', res.data);
    }else if(res.data.status ==  409 || res.data.status ==  400 ){
      setIsLoading(false)
      notification(res.data.message, 'warning')
    }
  })
  .catch(function (error) {
     notification('Check Your Internet', 'danger')
     setIsLoading(false)
     console.log(error);
   });
}

};
  
  return (
    <Container asGradient>
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
       <View style={styles.welcome}>
        <Text font="h2" weight="medium">Create an Account</Text>
        <Text color="gray75">Create an Account</Text>
        </View>
        <View style={styles.container}>

          <TouchableOpacity style={styles.button} onPress={() => setView('phone')}>
            <Text style={{fontWeight:'bold',fontSize:scale(11.5)}} color='gray5'>Signup With Phone</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={() => setView('email')}>
            <Text style={{fontWeight:'bold',fontSize:scale(11.5)}} color='gray5'>Signup With Email</Text>
          </TouchableOpacity>
        </View>

       
           <TextInputCompnent
            // label={'nameHead'}
            placeholder={'Name here'}
            value={name}
            onChangeText={val => (setName(val), setNameErr(false))}
            isError={nameErr}
            errorMessage=""
            containerStyle={{marginTop: hp(2)}}
            inputStyle={{textAlign:'left'}}
          />
            
      
          <TextInputCompnent
            // label={t('userName')}
            placeholder={'User Name'}
            value={username}
            onChangeText={val => (setUserName(val), setUserNameErr(false))}
            isError={usernameErr}
            errorMessage=""
            containerStyle={{marginTop: hp(2)}}
            inputStyle={{textAlign:'left'}}
          />

        {view == 'email' && 
        
          <TextInputCompnent
            // label={t('emailHead')}
            placeholder={'Email'}
            value={email}
            onChangeText={val =>
              EmailValidation(val)
                ? (setEmail(val), setEmailErr(false))
                : (setEmail(val), setEmailErr(true))
            }
            isError={emailErr}
            errorMessage=""
            containerStyle={{marginTop: hp(2)}}
            inputStyle={{textAlign:'left'}}
          />
          }

        {view == 'phone' && 
        <PhoneNumberInput
            // label={'mobilePlaceholder'}
            placeholder={'Mobile Number'}
            initialValue={'+92 🇵🇰'}
            // phoneInputContainerStyle={{ zIndex: -1}}
            value={mobileNumber}
            onChangeText={val => (
              setMobileNumber(val), setMobileNumberErr(false)
            )}
            length={dialCode == '+92'}
            onSelectData={val => (
              setDialCode(val),setMobileNumber('')
              )}
            isError={mobileNumberErr}
            phoneInputContainerStyle={{marginTop: hp(2), zIndex: -1}}
            inputStyle={{textAlign:'left'}}
          />
            }
        {view == 'email' &&
        <>
        <PasswordInputComponent
        // label={t('password')}
        placeholder={'Password'}
        value={password}
        onChangeText={val => (setPassword(val), setPasswordErr(false))}
        isError={passwordErr}
        errorMessage=""
        containerStyle={{marginTop: hp(2)}}
        inputStyle={{textAlign: 'left'}}
      />
      <RegularText
        text={'Password must contain minimum 8 characters with 1 capital letter, 1 small letter, 1 number and 1 special character, i.e  ( Abc@12345 )'}
        textStyle={{
          fontSize: wp(2.5),
          marginLeft: wp(2),
          marginTop: hp(0.5),
          zIndex: -1,
          textAlign:'left'
        }}
      />
      </>
         }
           {view == 'email' &&
           <PasswordInputComponent
          //  label={t('confirmpass')}
           placeholder={'Confirm Password'}
           value={cPassword}
           onChangeText={val => setCPassword(val)}
           errorMessage=""
           containerStyle={{marginTop: hp(2)}}
         />
        }

            
          <ButtonComponent
            title={'Sign up'}
            buttonStyle={
              styles.signUpButton
            }
            isLoading={isLoading}
            // disabled={!agree}
            onPress={signUp}
          />
          
       </ScrollView>
      </View>
      {/* <Toast config={toastconfiq} refs={(ref) => {Toast.setRef(ref)}}/> */}
     </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingBottom: verticalScale(13),
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  button: {
    flexDirection:'row',
    borderRadius:10,
    alignItems: 'center',
    justifyContent:'center',
    width :getScreenWidth() / 2.4,
    paddingVertical:scale(10),
    backgroundColor:Colors.primary
  },
  signUpButton: {
    width: wp(80),
    alignSelf: 'center',
    marginVertical:hp((4)),
    height: hp(8),
    backgroundColor:Colors.primary
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: scale(13),
    paddingHorizontal: scale(14),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  welcome: {
    marginBottom: scale(15),
  },
  buttonContainer: {
    paddingVertical: scale(14),
    marginVertical:hp((3))
  },
  toastcontainer:{height:60,width:'95%',backgroundColor:'red',borderRadius:10,
  position:'absolute',justifyContent:'center',alignItems:'center'}  
})


SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;
