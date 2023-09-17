import React,{useState,useEffect} from 'react';
import {Text} from 'components';
import {ScrollView, StyleSheet, View, TouchableOpacity,Image} from 'react-native';
// import FeatureData from 'mocks/FeatureData'
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import {baseUrl,imageUrl} from '../../../../assets/common/baseUrl'
import axios from 'axios';
import  styles from './styles'
import {useIsFocused } from '@react-navigation/native';


const Feature = ({navigation}) => {
    const [feature, setFeature] = useState('')
    const isFocused = useIsFocused();

   useEffect(()=>{
      axios
      .get(`${baseUrl}get_featured_api`)
      .then((res)=>{
        setFeature(res.data.Data)
        console.log("get_featured_api")
      })
      .catch((error)=>{
        console.log(error)
      })
    },[isFocused])

 return (
    <>
        {feature && 
       <>
    <View style={styles.header}>
      <View style={styles.flash}>
        <Text style={{fontWeight:'700'}} font="h2">Feature Used Car</Text>
      </View>
        <TouchableOpacity onPress={() => navigation.navigate('Category', { title: 'Feature Used Car' ,isfor:'fCar',type:'featured'})}>
        <Text color='primaryAlt' weight="medium">View all</Text>
      </TouchableOpacity>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.products}>
     {feature.slice(0,10).map((item) => (
        <TouchableOpacity key={item.id} style={styles.container} onPress={() => navigation.navigate('ProductDetails',{pid: item.id,ProItem:item})}>
        <View style={styles.card}>
          <View style={styles.imgview}>
           <Image
             source={{uri:`${imageUrl}uploads/gallery/${JSON.parse(item.gallery)[0]}`}}
            resizeMode="cover"
            style={styles.image}
            />
         </View>
           <Text style={styles.nametxt}>
           {item.brand_name} {item.model_name}
          </Text>
          <Text style={styles.nametxt}>
            PKR, {Math.floor(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <Text style={[styles.nametxt,{fontSize:12,color:'gray'}]}>
            {item.state_name}
          </Text>
          <View style={{flexDirection:'row',marginBottom:scale(8)}}>
          <Text style={[styles.nametxt,{fontSize:11,color:'gray'}]}>
            {item.year} |
          </Text>
          {item.mileage &&
          <Text style={[styles.nametxt,{fontSize:11,color:'gray',marginLeft:5}]}>
            {item.mileage}km |
          </Text>
          }
          <Text style={[styles.nametxt,{fontSize:11,color:'gray',marginLeft:5}]}>
            {item.fuel_type} 
          </Text>
          </View>
        </View>
      </TouchableOpacity>
       ))}
    </ScrollView>
   </>
    }
  </>
 );
}

Feature.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Feature;
