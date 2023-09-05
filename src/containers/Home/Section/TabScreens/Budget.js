import { StyleSheet, Text, View,FlatList,Pressable,Image } from 'react-native'
import React,{useContext,useState} from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { getScreenWidth} from 'utils/size';
import UserContext from 'contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import {BallIndicator} from 'react-native-indicators';
import { Skeleton } from '@rneui/themed';


const Budget = () => {
  const navigation = useNavigation(); 
  const { browseCar,show, setshow} = useContext(UserContext);

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
     <BudgetSkeleton/>
    :
    <>
    {browseCar &&
      browseCar.Budget.map((item,key) => (
          <Pressable style={styles.button} key={key}  onPress={() => navigation.navigate('Category', { title: item.id,isfor:"search",pmt:'budget' })}>
          <Text style={styles.txt}>{item.name}</Text>
        </Pressable>
          ))}
          </>
      }
      </View>
  )
}

export default Budget;
const BudgetSkeleton  = () =>{
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
  txt:{color:'#000',fontWeight:'bold',fontSize:13},
  button: {
    width: getScreenWidth() / 2.5 ,
    aspectRatio: 1 / 0.3,
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
  },})

