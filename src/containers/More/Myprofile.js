import React, {useContext, useState} from 'react';
import {
  Container,
  NavBar,
  Avatar,
  Button,
  KeyboardAvoidingView,
  TextField,
} from 'components';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import {baseUrl, imageUrl} from '../../../assets/common/baseUrl';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {BallIndicator} from 'react-native-indicators';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    flex: 1,
  },
  form: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: scale(14),
    marginBottom: scale(24),
    width: 200,
  },
});

const Myprofile = ({navigation, route}) => {
  const {user, token} = route.params;
  const [firstname, setFirstname] = useState(user.first_name);
  const [email, setEmail] = useState(user.user_email);
  const [phone, setPhone] = useState(user.user_phone);
  const [username, setUsername] = useState(user?.user_name);
  const [lastname, setLastname] = useState(user.last_name);
  const [gender, setGender] = useState(user.gender);
  const [show, setShow] = useState(false);

  const notification = (message = 'Something went wrong', type) =>
    showMessage({message, type});

  const edit = () => {
    var config = {
      method: 'put',
      url: `${baseUrl}update_profile?id=${user.id}&user_name=${username}&email=${email}&phone=${phone}&f_name=${firstname}&l_name=${lastname}&gender=${gender}`,
      headers: {
        Authorization: `barer ${token}`,
        Cookie: 'ci_session=e386b30ade0ecdba22c7d7ece537d782897ad2f0',
      },
    };

    axios(config)
      .then(function (res) {
        if (res.data.status == 200) {
          notification(res.data.message, 'success');
          setShow(true);
          setTimeout(() => {
            navigation.navigate('More');
            setShow(false);
          }, 2000);
        }
      })
      .catch(function (error) {
        notification('Something Wrong Please Check Your Internet', 'danger');
        console.log(error);
      });
  };

  return (
    <Container backgroundColor="white">
      <NavBar title="My Profile" onLeftIconPress={() => navigation.goBack()} />
      <ScrollView>
        <KeyboardAvoidingView contentContainerStyle={styles.container}>
          <View style={styles.form}>
            <Avatar
              source={require('../../../assets/images/users/solution.png')}
              size={100}
              style={styles.avatar}
            />

            <TextField
              label={user?.first_name}
              initialValue={user?.first_name}
              name={'firstname'}
              id={'firstname'}
              isCustom={true}
              customSet={text => setFirstname(text)}
            />

            <TextField
              label="Email address"
              initialValue={user.user_email}
              name={'email'}
              id={'email'}
              isCustom={true}
              customSet={text => setEmail(text)}
            />

            <TextField
              label="phone"
              initialValue={user.user_phone}
              name={'phone'}
              id={'phone'}
              isCustom={true}
              customSet={text => setPhone(text)}
            />
            <TextField
              label="User Name"
              initialValue={user?.user_name}
              name={'user_name'}
              id={'user_name'}
              isCustom={true}
              customSet={text => setUsername(text)}
            />
            <TextField
              label="Last Name"
              initialValue={user.last_name}
              name={'last_name'}
              id={'last_name'}
              isCustom={true}
              customSet={text => setLastname(text)}
            />

            <TextField
              label="Gender"
              initialValue={user.gender}
              name={'gender'}
              id={'gender'}
              isCustom={true}
              customSet={text => setGender(text)}
            />
          </View>
          {show ? (
            <BallIndicator
              color="red"
              animationDuration={1200}
              animating={show}
            />
          ) : (
            <Button label="Update" onPress={() => edit()} />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

Myprofile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Myprofile;
