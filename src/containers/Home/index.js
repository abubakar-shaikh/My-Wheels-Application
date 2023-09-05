import React,{useState,useEffect,useContext} from 'react';
import {Container,NavBar,Text} from 'components';
import { getScreenWidth } from 'utils/size';
import {Image, StyleSheet, View,StatusBar, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import SearchBar from './Section/SearchBar';
import UsedCar from './UsedCar';
import NewCar from './NewCar';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import baseUrl from '../../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused } from '@react-navigation/native';

const Home = ({ navigation })  => {
  const [view, setView] = useState('UsedCar');
  const {userid,setUserid,brands,setBrands,location,setLocation,browseCar,setBrowseCar,setshow} = useContext(UserContext)
  const isFocused = useIsFocused();
    
   useEffect(() => {
    console.log('index api Hit')
    async function fetchUserid() {
      const id = await (AsyncStorage.getItem('user_id'));   
        setUserid(id)
    }
    fetchUserid(); 
    if(userid == 0 || location == '' || browseCar == '' || brands == ''){
    axios
     .get(`${baseUrl}brand_api`)
      .then(function (res) {
        setBrands(res.data.Brands)
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${baseUrl}location_api`)
        .then(function (response){
          setLocation(response.data.locations)
        })
        .catch(function (error) {
          console.log(error);
        });
      
      axios
      .get(`${baseUrl}browse_cat`)
        .then(function (res){
          setBrowseCar(res.data)
          setshow(false)
        })
        .catch(function (error) {
          setshow(false)
          console.log(error);
        });
      }
    },[isFocused])

  return(
  <Container>
    <StatusBar backgroundColor="#a92226"/>
      <NavBar
        variant="gradient"
        renderLeftComponent={() => (
          <SearchBar navigation={navigation} />
        )}/>
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button,{backgroundColor:view == 'UsedCar' ? '#fff' :'#b54545'},]} 
            onPress={() => setView('UsedCar')}
            >
              <Image 
                source={require('images/categories/9.png')}
                resizeMode="contain" style={styles.image} tintColor={view == 'NewCar' ? '#E6E6E6' : '#a92226'} />
              <Text style={{fontWeight:'bold'}} color={view == 'NewCar' ? 'gray5' : 'primary'}  font='h3'>
                Used Car
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:view == 'NewCar' ? '#fff' : '#b54545'}]} 
            onPress={() => setView('NewCar')}
            >
              <Image
                source={require('images/categories/9.png')}
                resizeMode="contain"
                tintColor={view == 'UsedCar' ? '#E6E6E6' : '#a92226'}
                style={styles.image}
                />
              <Text style={{fontWeight:'bold'}} color={view == 'UsedCar' ? 'gray10' : 'primary'} font='h3'>
                New Car
              </Text>
            </TouchableOpacity>
        </View>
        {view == 'NewCar' ? <NewCar navigation={navigation} /> : <UsedCar  navigation={navigation}/>}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(13),
    backgroundColor:'#a92226',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  button: {
    flexDirection:'row',
    borderRadius:50,
    alignItems: 'center',
    justifyContent:'center',
    width :getScreenWidth() / 2.3
  },
  image: {
    width: scale(40),
    height: scale(30),
    color:'#fff'
  },
});


Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
