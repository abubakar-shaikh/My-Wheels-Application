import React, {useContext, useState, useEffect} from 'react';
import {Container, Avatar, Text, ListItem, GradientBlock} from 'components';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Colors from 'themes/colors';
import {scale} from 'react-native-size-matters';
import {AuthContext} from 'contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl, imageUrl} from '../../../assets/common/baseUrl';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: scale(6),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  label: {
    padding: scale(14),
  },
  signOut: {
    paddingVertical: scale(18),
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
    marginBottom: scale(24),
  },
});

const More = ({navigation}) => {
  const {dispatch} = useContext(AuthContext);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchMyAPI() {
      const token = await AsyncStorage.getItem('@auth_token');
      const id = await AsyncStorage.getItem('user_id');
      setToken(token);
      console.log('id', id);
      axios
        .post(
          `${baseUrl}get_profile_data/${id}`,
          {},
          {headers: {Authorization: `Bearer ${token}`}},
        )
        .then(res => {
          if (res.data.status == 200) {
            console.log('res', res);
            setUser(res.data.data[0]);
            console.log('profile');
          }
        })
        .catch(error => {
          console.log('Catch Error', error);
        });
    }
    fetchMyAPI();
  }, [isFocused]);

  return (
    <Container>
      <LinearGradient
        start={{x: 1.2, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#dc333a', '#9a0e12']}
        style={{
          paddingBottom: widthPercentageToDP(10),
        }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </LinearGradient>
      <View style={styles.container}>
        <GradientBlock style={styles.header}>
          <View style={styles.header}>
            <View style={styles.profile}>
              <Avatar
                size={65}
                source={require('images/Myimages/no-image.jpg')}
              />
              <View style={styles.name}>
                <Text font="h1" weight="medium" color="white">
                  {user?.first_name}
                </Text>
                <Text font="h4" weight="medium" color="white">
                  {user?.user_name}
                </Text>
              </View>
            </View>
          </View>
        </GradientBlock>
        <ScrollView>
          <View style={styles.label}>
            <Text font="h3" weight="medium">
              Personal
            </Text>
          </View>
          <ListItem
            title="My Profile & Update"
            leftIcon="account-circle-outline"
            RightIcon="chevron-right"
            onPress={() => navigation.navigate('Myprofile', {user, token})}
          />
          <ListItem
            title="My Ads"
            leftIcon="google-ads"
            RightIcon="chevron-right"
            onPress={() => navigation.navigate('Ads')}
          />
          {/* <ListItem
            title="Saved Ads"
            leftIcon="cards-heart"
            RightIcon='chevron-right'
            onPress={() => navigation.navigate('Ads')}
          /> */}
          {/* <ListItem
            title="My Alert"
            leftIcon="bell-outline"
            RightIcon='chevron-right'
          /> */}

          <ListItem
            title="My Messages"
            leftIcon="message-minus-outline"
            RightIcon="chevron-right"
            onPress={() => navigation.navigate('Chats')}
          />

          <View style={styles.label}>
            <Text font="h3" weight="medium">
              Product
            </Text>
          </View>

          {/* <ListItem
            title="Used Cars"
            leftIcon="car-outline"
            RightIcon='chevron-right'
          /> */}

          {/* <ListItem
            title="New Cars"
            leftIcon="car"
            RightIcon='chevron-right'
          /> */}

          <ListItem
            title="Car Inspection"
            leftIcon="car-cog"
            RightIcon="chevron-right"
            onPress={() => navigation.navigate('Carinspection')}
          />

          <View style={styles.label}>
            <Text font="h3" weight="medium">
              Others
            </Text>
          </View>

          {/* <ListItem
            title="Videos"
            leftIcon="video"
            RightIcon='chevron-right'
          /> */}

          <ListItem
            title="Blogs"
            leftIcon="text-box-outline"
            RightIcon="chevron-right"
            onPress={() => navigation.navigate('Blog')}
          />
          {/*           
          <ListItem
            title="Car Finance"
            leftIcon="file-document-edit-outline"
            RightIcon='chevron-right'
            onPress={() => navigation.navigate('Chat')}
          /> */}
          {/* <ListItem
            title="Cool Insuarance"
            leftIcon="file-document-edit-outline"
            RightIcon='chevron-right'
          /> */}
          {/* <ListItem
            title="Cool Rides"
            leftIcon="file-document-edit-outline"
            RightIcon='chevron-right'
          /> */}
          {/* <ListItem
            title="Contact Us"
            leftIcon="contacts-outline"
            RightIcon='chevron-right'
          /> */}

          <View style={styles.label}>
            <Text centered font="h5" color="gray50">
              App version 1.0.0
            </Text>
          </View>
          <TouchableOpacity
            style={styles.signOut}
            onPress={() => [
              AsyncStorage.removeItem('@auth_token'),
              dispatch({type: 'SIGN_OUT'}),
            ]}>
            <Text color="primary">Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

More.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default More;
