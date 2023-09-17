import React,{useState,useEffect} from 'react';
import {Text} from 'components';
import {ScrollView,  View, TouchableOpacity,Image} from 'react-native';
// import ManageData from 'mocks/ManageData'
import {  scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import {baseUrl,imageUrl} from '../../../../assets/common/baseUrl'
import axios from 'axios';
import styles from './styles';
import {useIsFocused } from '@react-navigation/native';

const Manage = ({navigation}) => {
    const [manage, setManage] = useState('')
    const isFocused = useIsFocused();
    
   useEffect(()=>{
     axios
      .get(`${baseUrl}get_usedcar_api`)
      .then((res)=>{
        setManage(res.data.Data)
        console.log("get_usedcar_api")
      })
      .catch((error)=>{
        console.log(error)
      })
    },[isFocused])

 return (
    <>
     {manage && 
       <>
    <View style={styles.header}>
      <View style={styles.flash}>
        <Text style={{fontWeight:'700'}} font="h2">Used Cars</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Category', { title: 'Used Car' ,isfor:'uCar',type:'used'})}>
        <Text color='primaryAlt' weight="medium">View all</Text>
      </TouchableOpacity>
    </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.products}>
     {manage.slice(0,10).map((item) => (
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
            PKR, {Math.floor(item.price)}
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

Manage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Manage;
;
