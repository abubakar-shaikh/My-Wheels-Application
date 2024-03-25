import React, {useState, useEffect, useContext} from 'react';
import {Container, NavBar} from 'components';
import {getScreenWidth} from 'utils/size';
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import PropTypes from 'prop-types';
import SearchBar from './Section/SearchBar';
import UsedCar from './UsedCar';
import NewCar from './NewCar';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import {baseUrl, imageUrl} from '../../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../themes/colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
const screens = [
  {id: 1, name: 'Used Cars'},
  {id: 2, name: 'New Cars'},
  {id: 3, name: 'Bikes'},
  {id: 4, name: 'Auto Parts'},
];
const Home = ({navigation}) => {
  const [view, setView] = useState(1);
  const {
    userid,
    setUserid,
    brands,
    setBrands,
    location,
    setLocation,
    browseCar,
    setBrowseCar,
    setshow,
  } = useContext(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('index api Hit');
    async function fetchUserid() {
      const id = await AsyncStorage.getItem('user_id');
      setUserid(id);
    }
    fetchUserid();
    if (userid == 0 || location == '' || browseCar == '' || brands == '') {
      axios
        .get(`${baseUrl}brand_api`)
        .then(function (res) {
          setBrands(res.data.Brands);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(`${baseUrl}location_api`)
        .then(function (response) {
          setLocation(response.data.locations);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(`${baseUrl}browse_cat`)
        .then(function (res) {
          setBrowseCar(res.data);
          setshow(false);
        })
        .catch(function (error) {
          setshow(false);
          console.log(error);
        });
    }
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
      <NavBar
        variant="gradient"
        renderLeftComponent={() => <SearchBar navigation={navigation} />}
      />
      <LinearGradient
        start={{x: 1.2, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#dc333a', '#9a0e12']}
        style={styles.container}>
        {screens?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                {backgroundColor: view == item?.id ? '#fff' : '#b54545'},
              ]}
              onPress={() => setView(item?.id)}>
              <Text
                style={{
                  color: view == item?.id ? colors.primary : '#fff',
                  fontWeight: '500',
                }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
      {view == 1 ? (
        <UsedCar navigation={navigation} />
      ) : (
        <NewCar navigation={navigation} />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: widthPercentageToDP(5),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    // flexDirection: 'row',
    borderRadius: widthPercentageToDP(10),
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: getScreenWidth() / 2.3,
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(1),
  },
  image: {
    width: scale(40),
    height: scale(30),
    color: '#fff',
  },
});

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
