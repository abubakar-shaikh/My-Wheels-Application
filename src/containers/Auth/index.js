import React, { useState } from 'react';
import {View, TouchableOpacity, Image,ScrollView} from 'react-native';
import {Container,Button,KeyboardAvoidingView,Text,IconButton,Divider,TextField} from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import baseUrl from '../../../assets/common/baseUrl';
import axios  from 'axios';
import {BallIndicator} from 'react-native-indicators';
import styles from "./styles";
import {showMessage} from 'react-native-flash-message';

const validationsfields = {
  emailorphone: null,
}

const Auth = ({ navigation }) => {
  const [emailorphone, setPhone] = useState('');
  const [ec, setEc] = useState(validationsfields);
  const [show, setShow] = useState(false)

  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });
  
  const loginUser = () => {
    var d = {emailorphone: null}
    if (emailorphone == undefined || emailorphone == null || emailorphone == '' || emailorphone.length != 10) {
      d.emailorphone = "Please Provide Phone Number";
    }
   
    setEc(d)
    if (d.emailorphone != null){
      return
    }
    
    axios
      .post(`${baseUrl}login_api?emailorphone=0${emailorphone}`)
      .then((res) => {
        if (res.data.status == 200){
            setShow(true)
            notification(res.data.message, 'success');
            setTimeout(() => {
              setShow(false)
              navigation.navigate('OTP',{id : res.data.id,type:'login'});
            },2000)
            console.log("Response Data", res.data);
        }
        if (res.data.status == 400 || res.data.status == 404  ) {
          setShow(true)
          setTimeout(() => {
            setShow(false)
            notification(res.data.message, 'warning');
          },2000)
          console.log("Response Data", res.data)
        }
      })
      .catch((error) => {
           notification('Something Wrong Please Try Again','danger');
           console.log(error);
      });
  };

  const forPhone = (text) => {
    let d = { emailorphone: null };
    setEc(ec => ({
      ...ec,
      ...d
    }));
    setPhone(text)
  }
 
  return (
    <Container>
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('images/branding/logo_with_title.png')}
            style={styles.logo}
          />
        </View>
    
        <View style={styles.form}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.welcome}>
            <Text color='primary' style={{fontWeight:'bold',fontSize:23,fontFamily:'sans-serif'}}>Welcome to MyWheels</Text>
            <Text style={{paddingLeft:scale(3)}}>Please login with your Number to continue.</Text>
          </View>

          <TextField
              shownumber
              placeholder="31300111222"
              name={"emailorphone"}
              id={"emailorphone"}
              error={ec.emailorphone}
              isCustom={true}
              keyboardType='number-pad'
              customSet={(text) => forPhone(text)}
            />
          {show ?
            <BallIndicator color='red' animationDuration={1200} animating={show} />
            :
          <Button label="Continue With Mobile Number" onPress={() => loginUser()}/>
          }
          <Divider>
            <Text color="gray50">or</Text>
          </Divider>

          <View>
          </View>

         <TouchableOpacity onPress={() => navigation.navigate('EmailLogin')}  style={styles.socialContainer2}>
            <IconButton
              iconType="MaterialCommunityIcons"
              icon="email"
              color="gray75"
              style={styles.social2}
              size={24}
              onPress={() => navigation.navigate('EmailLogin')}
              />
              <Text>Continue With Email</Text>
         </TouchableOpacity>

          
          <View style={styles.socialContainer}>
            <IconButton
              iconType="MaterialCommunityIcons"
              icon="google"
              color="tertiary"
              style={styles.social}
              size={24}
            />
            <IconButton
              iconType="MaterialCommunityIcons"
              icon="facebook"
              color="blue"
              style={styles.social}
              size={24}
            />
            <IconButton
              iconType="MaterialCommunityIcons"
              icon="apple"
              color="gray75"
              style={styles.social}
              size={24}
            />
          </View>
          <View style={styles.signUpContainer}>
            <Text>{'Don\'t have an account?'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text weight="medium" color="primary"> Sign up now!</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

Auth.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Auth;
