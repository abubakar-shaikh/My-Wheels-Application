import React from 'react';
import {Text} from 'components';
import {ScrollView, StyleSheet, View, TouchableOpacity,Image} from 'react-native';
import FeatureData from 'mocks/FeatureData'
import PropTypes from 'prop-types';
import styles from './styles';


const Upcoming = ({ navigation }) => (
  <View>
    <View style={styles.header}>
        <Text style={{fontWeight:'700'}} font="h2">Upcoming New Cars</Text>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.products}>
     {FeatureData.map((item) => (
      <TouchableOpacity key={item.id} style={styles.card}  onPress={() => navigation.navigate('ProductDetails',{item})}>
          <View style={styles.imgview}>
          <Image
            source={require('images/Myimages/upcoming.png')}
            resizeMode="cover"
            style={styles.image}
            />
         </View>
           <Text style={styles.nametxt}>
            {item.name}
          </Text>
          <Text color='primary'  style={styles.nametxt}>
            {item.price}
          </Text>
          <Text style={[styles.nametxt,{fontSize:12,color:'gray',marginBottom:10}]}>
            Coming in October 2022
          </Text>
       
      </TouchableOpacity>
  ))}
    </ScrollView>
  </View>
);

Upcoming.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Upcoming;
