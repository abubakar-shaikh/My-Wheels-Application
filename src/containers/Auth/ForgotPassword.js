import React, {useState} from 'react';
import {Container, NavBar, TextField, Text, Button} from 'components';
import {View, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import FormContaienr from './FormContainer';
import axios from 'axios';
import {baseUrl, imageUrl} from '../../../assets/common/baseUrl';
// import Toast from 'react-native-toast-message';
import styles from './styles';
import {showMessage} from 'react-native-flash-message';
import {BallIndicator} from 'react-native-indicators';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const notification = (message = 'Something went wrong', type) =>
    showMessage({message, type});

  const validateEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const forgetUserPassword = () => {
    var x = {email: null};
    if (email == undefined || email == null || email == '') {
      x.email = 'Please provide email Address';
    } else {
      if (!validateEmail(email)) {
        x.email = 'email not valid';
      }
    }
    setError(x);
    if (x.email != null) {
      return;
    }

    // let password={
    //   email: email
    // };

    axios
      .post(`${baseUrl}forget_passbymail_api?email=${email}`)
      .then(res => {
        if (res.data.status == 200) {
          notification(res.data.message, 'success');
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 2000);
          console.log('Send Email', res.data.message);
        }
      })
      .catch(error => {
        notification('Check Your Internet', 'danger');
        console.log('email not send', error);
      });
  };
  const forEmail = text => {
    let x = {email: null};
    setError(error => ({
      ...x,
    }));
    setEmail(text);
  };

  const toastconfiq = {
    success: internalState => (
      <View style={styles.toastcontainer}>
        <Text color="gray5">{internalState.text1}</Text>
      </View>
    ),
    error: () => {},
    info: () => {},
    any_custom_type: () => {},
  };
  return (
    <Container asGradient>
      <NavBar onLeftIconPress={() => navigation.goBack()} />
      {/* <Toast config={toastconfiq} refs={(ref) => {Toast.setRef(ref)}}/> */}
      <FormContaienr
        title="Forgot your password?"
        subtitle="We got your back! Let us know your email or phone number and we will send a 6-digits PIN for verification to reset your password.">
        <View style={{marginVertical: 30}}>
          <TextField
            label="Email address"
            name={'email'}
            id={'email'}
            error={error.email}
            isCustom={true}
            customSet={text => forEmail(text)}
          />
        </View>

        <SafeAreaView>
          <View style={styles.buttonContainer}>
            {show ? (
              <BallIndicator
                color="red"
                animationDuration={1200}
                animating={show}
              />
            ) : (
              <Button label="Continues" onPress={() => forgetUserPassword()} />
            )}
          </View>
        </SafeAreaView>
      </FormContaienr>
    </Container>
  );
};

ForgotPassword.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ForgotPassword;
