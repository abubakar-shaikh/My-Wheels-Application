import React,{useState,useEffect} from 'react';
import {Text} from 'components';
import {ScrollView, View, TouchableOpacity,Image} from 'react-native';
// import FeatureData from 'mocks/FeatureData'
import PropTypes from 'prop-types';
import styles from './styles';
import axios from 'axios';
import {baseUrl,imageUrl} from '../../../../assets/common/baseUrl';
import {useIsFocused } from '@react-navigation/native';

const Popular = ({ navigation }) => {
  const [NewCar, setNewCar] = useState('');
  const isFocused = useIsFocused();
   
  useEffect(()=>{
       axios
       .get(`${baseUrl}get_newcar_api`)
       .then((res)=>{
         setNewCar(res.data.Data)
         console.log("get_newcar_api")
       })
       .catch((error)=>{
         console.log(error)
        })
      },[isFocused])
 
 return(
   <>
   {NewCar &&
    <>
    <View style={styles.header}>
        <Text style={{fontWeight:'700'}} font="h2">New Cars</Text>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.products}>
       {NewCar.slice(0,10).map((item) => (
      <TouchableOpacity key={item.id} style={styles.card}  onPress={() => navigation.navigate('ProductDetails',{pid: item.id,ProItem:item})}>
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
          <Text color='primary'  style={styles.nametxt}>
            PKR, {Math.floor(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <Text style={[styles.nametxt,{fontSize:12,color:'gray',marginBottom:10}]}>
            {item.state_name}
          </Text>
      </TouchableOpacity>
    ))}
    </ScrollView>
    </>
   }
  </>
 )
}

Popular.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Popular;
