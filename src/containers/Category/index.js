import React, {useState, useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View,TouchableOpacity} from 'react-native';
import {Container, NavBar, ProductList,Noresult,Text} from 'components';
import {scale} from 'react-native-size-matters';
import Colors from 'themes/colors';
import Controls from './Controls';
//import Filter from './Filter';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';
import axios from 'axios';
import UserContext from 'contexts/UserContext';
import {BallIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    marginLeft: scale(5),
  },
});


const Category = ({navigation, route}) => {
  const {title, isfor = null,name,pmt,type} = route.params;
  const [display, setDisplay] = useState('grid');
  const {row, setRow} = useContext(UserContext);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isfor) {
      if (isfor == 'sCar') {
        axios
          .post(`${baseUrl}get_supervised_api`)
          .then(res => {
            console.log('get_supervised_api');
            setRow(res.data.Data);
            setShow(false)
          })
          .catch(error => {
            console.log('NOT send', error);
            setShow(false)
          });
      }
      if (isfor == 'fCar') {
        axios
          .get(`${baseUrl}get_featured_api`)
          .then(res => {
            setShow(false)
            console.log('get_featured_api');
            setRow(res.data.Data);
          })
          .catch(error => {
            setShow(false)
            console.log('catch error',error);
          });
      }
      if (isfor == 'uCar') {
        axios
          .post(`${baseUrl}get_usedcar_api`)
          .then(res => {
            console.log('Searching Respone Succesfull')
            setShow(false)
            setRow(res.data.Data);
          })
          .catch(error => {
            setShow(false)
            console.log('catch error2', error);
          });
      }
      if (isfor == 'search') {
        axios
          .post(`${baseUrl}search_api?${pmt}=${title}`)
          .then(res => {
            console.log('Searching Respone Succesfull');
            setRow(res.data.Data);
            setShow(false)
          })
          .catch(error => {
            setShow(false)
            console.log('catch error3', error);
          });
      }
    }
  }, []);

  setTimeout(() => {
    setShow(false)
  }, 3000);

  return (
    <Container backgroundColor="primary" asGradient>
      <NavBar
        title={name ? name : title}
        onLeftIconPress={() => navigation.goBack()}
        renderRightComponent={() => 
         <View style={{flexDirection:'row'}}>  
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter',{name:name ? name :title,type:type})}>
            <Icon name="filter" color={Colors.white} size={scale(20)} />
            <Text color="white" font="p1" weight="medium" style={styles.filter}>
              Filter
            </Text>
         </TouchableOpacity>
          <Controls onDisplayChange={setDisplay} />
        </View>
      }
      />
      <View style={styles.container}>
       {show == false && row == '' &&
        <Noresult/>
       }
     {show ?
      <BallIndicator color='red' animationDuration={1200} animating={show} />
       :
        <ProductList navigation={navigation} products={row} variant={display}/>
      }
      </View>
    </Container>
  );
};

Category.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Category;
