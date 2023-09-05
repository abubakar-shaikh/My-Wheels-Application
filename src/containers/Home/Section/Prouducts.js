import React from 'react';
import {Text, Container} from 'components';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: scale(10), backgroundColor: '#fff',marginBottom:scale(30)},
  header: {paddingVertical: scale(14), paddingLeft: scale(5)},
  image: {width: scale(130), height: scale(110)},
  card: {
    shadowColor: Colors.gray50,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
    borderRadius: scale(10),
  },
  txt: {fontSize: scale(18), fontWeight: 'bold'},
  icon: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: scale(5),
  },
});

const Products = () => {
  const navigation = useNavigation(); 

  return(
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontWeight: '700'}} font="h2">
          MyWheels Product
        </Text>
      </View>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TryMywheelsForm')}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '50%', padding: scale(10)}}>
            <Text color="primary" weight="medium">
              MYWHEELS
            </Text>
            <Text style={styles.txt}>SEll IT FOR ME</Text>
            <Text color="gray50">
              We sell your car on your behalf and handle everything for you
            </Text>
          </View>
          <View>
            <Image
              source={require('images/download.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: scale(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="check" size={12} color="#fff" style={styles.icon} />
          <Text font="h5">Hassle Free</Text>
          <Icon name="check" size={12} color="#fff" style={styles.icon} />
          <Text font="h5">Secure</Text>
          <Icon name="check" size={12} color="#fff" style={styles.icon} />
          <Text font="h5">Best Price</Text>
          <View style={{marginLeft: scale(90)}}>
            <Icon name="chevron-right" size={32} color="gray" />
          </View>
        </View>
      </TouchableOpacity>
  
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity 
              onPress={() => navigation.navigate('Carinspection')}
              style={[styles.card,{width:'49%',marginTop:scale(10)}]} >
            <Image
              source={require('images/inspection.png')}
              resizeMode="contain"
              style={{alignSelf:'center',width: scale(120), height: scale(85)}}
              />
            <View style={{justifyContent:'center',paddingHorizontal:scale(10)}}>
              <Text color="primary" weight="medium">MYWHEELS</Text>
              <Text style={styles.txt}>CAR</Text>
              <View style={{justifyContent:'space-between',flexDirection:'row',paddingBottom:scale(10)}}>
                <Text style={styles.txt}>INSPECTION</Text>
                <Icon name="chevron-right" size={32} color="gray" />
              </View>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity   style={[styles.card,{width:'49%',marginTop:scale(10)}]}>
            <Image
              source={require('images/car-clinical.png')}
              resizeMode="contain"
              style={{alignSelf:'center',width: scale(120), height: scale(85)}}
              />
            <View style={{justifyContent:'center',paddingHorizontal:scale(10)}}>
              <Text color="primary" weight="medium">MYWHEELS</Text>
              <Text style={styles.txt}>CAR</Text>
              <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <Text style={styles.txt}>CLINICAL</Text>
                <Icon name="chevron-right" size={32} color="gray" />
              </View>
            </View>
        </TouchableOpacity>
       </View>
    </Container>
  );
}


Products.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Products;