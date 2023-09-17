import React, { useContext ,useState} from 'react';
import {View, TouchableOpacity, Image,ScrollView} from 'react-native';
import Text from '../../components/Text';
import TextField from '../../components/Form/TextField';
import Button from '../../components/Touchable/Button'
import IconButton from '../../components/Touchable/IconButton'
import Divider from '../../components/Layout/Divider'
import KeyboardAvoidingView from '../../components/Layout/KeyboardAvoidingView'
import Container from '../../components/Layout/Container'
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import { AuthContext } from 'contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';
import axios from 'axios';
// import Toast from 'react-native-toast-message';
import {showMessage} from 'react-native-flash-message';
import {BallIndicator} from 'react-native-indicators';
import styles from "./styles";


const validationsfields = {
  emailorphone: null,
  password: null,
}

const storeData = async (token) => {
  try {
    const jsonValue = (token)
    await AsyncStorage.setItem('@auth_token', jsonValue)
    console.log("saved token")
  } catch (e) {
    console.log("error in token")
  }
}

const EmailLogin = ({ navigation }) => {
  const { dispatch } = useContext(AuthContext);
  const [emailorphone, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ec, setEc] = useState(validationsfields);
  const [show, setShow] = useState(false)

  const notification = (message = 'Something went wrong', type) => showMessage({ message, type });

  const validateEmail = (emailorphone) => {

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailorphone);
  };

  const loginUser = () => {
    var d = { emailorphone: null, password: null }
    if (emailorphone == undefined || emailorphone == null || emailorphone == '') {
      d.emailorphone = "Please Provide emailorphone Address";
    }
    else {
      if (!validateEmail(emailorphone)) {
        d.emailorphone = "emailorphone not valid"
      }
    }
    if (password == null || password == undefined || password == '') {
      d.password = "Please Provide Passwoed";
    }
    setEc(d)
    if (d.emailorphone != null || d.password != null) {
      return
    }

    axios
      .post(`${baseUrl}login_api?emailorphone=${emailorphone}&password=${password}`)
      .then((res) => {
        console.log("Response Data",res.data)
        if (res.data.status == 200) {
          setShow(true)
          notification(res.data.message, 'success')
        //   Toast.show({
        //     type:'success',
        //     position:'bottom',
        //    text1:res.data.message,
        //    visibilityTime:1000,
        //    autoHide:true,
        //   onShow:() => {},
        //   onHide:() => {}
        // })
        setTimeout(() => {
          setShow(false)
          storeData(res.data.token)
          AsyncStorage.setItem("user_id",res.data.id)
          console.log("login sucess",)
          console.log("token get sucess",res.data.token)
          dispatch({ type: 'SIGN_IN' })
        },2000)
        }else if(res.data.status == 400) {
          setShow(true) 
          setTimeout(() => {
            setShow(false)
            notification("Incorrect Email or Password", 'warning');
            // Toast.show({
            //   type:'warning',
            //  position:'bottom',
            //  text1:'Incorrect Email or Password',
            //  visibilityTime:3000,
            //  autoHide:true,
            //  onShow:() => {},
            //  onHide:() => {}
            // })
          },2000)
          }
      })
      .catch((error) => {
        console.log('Catch Error',error)
        notification('Something Wrong Please Try Again','danger');

      });
  };

  const forEmail = (text) => {
    let d = { emailorphone: null };
    setEc(ec => ({
      ...ec,
      ...d
    }));
    setEmail(text)
  }
  const forPassword = (text) => {
    let d = { password: null };
    setEc(ec => ({
      ...ec,
      ...d
    }));

    setPassword(text)
  }

  const toastconfiq = {
    success : internalState =>(
      <View style={styles.toastcontainer}>
        <Text color='gray5'>{internalState.text1}</Text>
      </View>
    ),
    error: () => {},
    info: () => {},
    any_custom_type:() => {},
  };

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
          <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={styles.welcome}>
            <Text color='primary' style={{fontWeight:'bold',fontSize:23}}>Welcome to MyWheels</Text>
            <Text style={{paddingHorizontal:scale(3),textAlign:'center'}}>Please login with your emaill address and password to continue.</Text>
          </View>

          <TextField
              label="emailorphone address"
              name={"emailorphone"}
              id={"emailorphone"}
              error={ec.emailorphone}
              isCustom={true}
              customSet={(text) => forEmail(text)}
             />

            <TextField 
              label="Password"
              secureTextEntry
              name={"password"}
              id={"password"}
              error={ec.password}
              isCustom={true}
              customSet={(text) => forPassword(text)} />

          
          <View style={styles.forgot}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                weight="medium"
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {show ?
              <BallIndicator color='red' animationDuration={1200} animating={show} />
              :
            <Button label="Sign In" onPress={() => loginUser()} />
            }

          <Divider>
            <Text color="gray50">or</Text>
          </Divider>

          <View style={styles.socialContainer}>
            <IconButton
              iconType="MaterialCommunityIcons"
              icon="apple"
              color="gray75"
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
              icon="google"
              color="tertiary"
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
      {/* <Toast config={toastconfiq} refs={(ref) => {Toast.setRef(ref)}}/> */}
    </Container>
  );
};

EmailLogin.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EmailLogin;
