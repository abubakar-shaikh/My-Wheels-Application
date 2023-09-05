import React,{useContext,useState} from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { getScreenWidth} from 'utils/size';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text } from 'components';
import { useNavigation } from '@react-navigation/native';
import UserContext from 'contexts/UserContext';
import {BallIndicator} from 'react-native-indicators';
import { Skeleton } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent:'center',
    paddingVertical: verticalScale(5),
  },
  button: { 
    width: getScreenWidth() / 5.2,
    aspectRatio: 1 / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    margin:scale(8),
    // backgroundColor:'#fff',
    borderColor:'gray',
    borderRadius:5,
  },
  image: {
    width: scale(40),
    height: scale(40),
  },
  txt:{
    textAlign:'center',
    justifyContent:'center',
    fontSize:9,
    marginTop:scale(10),
    fontWeight:'bold'
  }
});

const City = () => {
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
    <CitySkeleton/>
    :
    <>
      {browseCar &&
      browseCar.City.map((item) => (
        <TouchableOpacity key={item.id}
          onPress={() => navigation.navigate('Category', { title: item.id,isfor:"search",name:item.name,pmt:'city' })}>
          <View style={styles.button}>
            <Image
              source={require('images/Myimages/city.png')} 
              resizeMode="contain" style={styles.image}/>
            <Text style={styles.txt} color="gray75" >
              {item.name}
            </Text>
          </View>
        
        </TouchableOpacity>
      ))}</>}
    </View>
  )
};

export default City;
const CitySkeleton  = () =>{
  return(
    <View style={styles.container}>
        {
   [{},{},{},{},{},{},{},{}].map((item) => (
   
      <Skeleton style={styles.button}/>
        
  ))}
    </View>
  )
}