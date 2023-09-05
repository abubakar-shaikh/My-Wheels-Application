import React,{useContext,useState} from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { getScreenWidth} from 'utils/size';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text } from 'components';
import { useNavigation } from '@react-navigation/native';
import UserContext from 'contexts/UserContext';
import baseUrl from '../../../../../assets/common/baseUrl';
import {BallIndicator} from 'react-native-indicators';
import { Skeleton } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingVertical: verticalScale(5),
  },
  button: { 
    width: getScreenWidth() / 5.2,
    aspectRatio: 1 / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    margin:scale(10),
    // backgroundColor:'#fff',
    borderColor:'gray',
    borderRadius:5,
  },
  image: {
    width: scale(45),
    height: scale(45),
    marginTop:scale(10)
  },
});

const Brand = () => {
  const navigation = useNavigation(); 
  const { browseCar,show, setshow} = useContext(UserContext);

  // setTimeout(() => {
  //   setshow(false)
  // }, 3000);

 return(
  <View style={styles.container}>

  {/* {show == false && browseCar == '' &&
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('images/Myimages/no-internet.png')} resizeMode='center'/>
      </View>
    } */}
        {show ?
    <BrandSkeleton/>
    :
    <>
    {browseCar &&
     browseCar.Brands.map((item) => (
      <TouchableOpacity key={item.id}
        onPress={() => navigation.navigate('Category', { title: item.id,name:item.name,isfor:"search",pmt:'make' })}>
        <View style={styles.button}>
          <Image
            source={{uri:`${baseUrl}uploads/car-icons/${item.icon}`}} 
            resizeMode="contain" style={styles.image}/>
          <Text style={{height:33,textAlign:'center',justifyContent:'center'}} color="gray75" font='h5'>
            {item.name}
          </Text>
        </View>
      
      </TouchableOpacity>
    ))}</>}
  </View>
    )
  };

export default Brand;
const BrandSkeleton  = () =>{
  return(
    <View style={styles.container}>
        {
   [{},{},{},{},{},{},{},{}].map((item) => (
   
      <Skeleton style={styles.button}/>
        
  ))}
    </View>
  )
}