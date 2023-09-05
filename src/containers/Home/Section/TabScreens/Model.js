import { StyleSheet, Text,FlatList,View,Pressable ,Image} from 'react-native'
import React,{useContext,useState}from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { getScreenWidth} from 'utils/size';
import UserContext from 'contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import {BallIndicator} from 'react-native-indicators';
import { Skeleton } from '@rneui/themed';

const Model = () => {
  const { browseCar,show, setshow} = useContext(UserContext);
  const navigation = useNavigation(); 

  // setTimeout(() => {
  //   setshow(false)
  // }, 3000);

  return (
    <View style={styles.container}>

   {/* {show == false && browseCar == '' &&
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('images/Myimages/no-internet.png')} resizeMode='center'/>
      </View>
    } */}
    
    {show ?
   <ModelSkeleton/>
    :
    <>
    {browseCar &&
      browseCar.Models.map((item,key) => (
        <Pressable style={styles.button} key={key}    
            onPress={() => navigation.navigate('Category', { title: item.id,isfor:"search",name:item.name,pmt:'model' })}>
          <Text style={styles.txt}>{item.name}</Text>
        </Pressable>
     ))}
     </>
     }
    </View>
  )
}

export default Model
const ModelSkeleton  = () =>{
  return(
    <View style={styles.container}>
        {
   [{},{},{},{},{},{},{},{}].map((item) => (
   
      <Skeleton style={styles.button}/>
        
  ))}
    </View>
  )
}

const styles = StyleSheet.create({
  txt:{color:'#000',fontWeight:'bold'},
  button: {
    width: getScreenWidth() / 5.2,
    aspectRatio: 1 / 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    margin:scale(8),
    // backgroundColor:'#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent:'center',
    flexWrap: 'wrap',
    flex: 1,
    paddingVertical: verticalScale(5),
  },
})