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
    justifyContent:'center'
  },
  button: { 
    width: getScreenWidth() / 5.2,
    aspectRatio: 1 / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    margin:scale(9),
    // backgroundColor:'#fff',
    borderColor:'gray',
    borderRadius:5,
  },
  image: {
    width: scale(55),
    height: scale(55),
    marginTop:scale(10)
  },
});

const BodyType = () => {
  const navigation = useNavigation(); 
  const { browseCar,show, setshow} = useContext(UserContext);

  // setTimeout(() => {
  //   setshow(false)
  // }, 3000);

  return(
    <View style={styles.container}>
      {show ? 
      <BodyTypeSkeleton/>
      :
          <>
          {browseCar &&
          browseCar.BodyType.map((item) => (
          <TouchableOpacity key={item.id}
            onPress={() => navigation.navigate('Category',{ title: item.id,isfor:"search",name:item.title,pmt:'body_type' })}>
            
            <View style={styles.button}>
              <Image
                  source={{uri:`${baseUrl}uploads/car-icons/${item.featured_img}`}} 
                  resizeMode="contain" style={styles.image}/>
              <Text style={{height:33,textAlign:'center',justifyContent:'center'}} color="gray75" font='h5'>
                {item.title}
              </Text>
            </View>
          
          </TouchableOpacity>
        ))}
        </>
        }
  </View>
  )
};

export default BodyType;
const BodyTypeSkeleton  = () =>{
  return(
    <View style={styles.container}>
        {
   [{},{},{},{},{},{},{},{}].map((item) => (
   
      <Skeleton style={styles.button}/>
        
  ))}
    </View>
  )
}