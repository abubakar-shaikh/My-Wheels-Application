import React,{useContext} from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { getScreenWidth} from 'utils/size';
import { scale, verticalScale } from 'react-native-size-matters';
import { Text } from 'components';
// import brands from 'mocks/brands';
import UserContext from 'contexts/UserContext';
import baseUrl from '../../../../assets/common/baseUrl';
import colors from 'themes/colors'

const Section1 = ({navigation}) => {
  const { browseCar,setBrowseCar} = useContext(UserContext);

  return (
    <View style={styles.container}>
    {browseCar &&
     browseCar.Brands.map((item) => (
      <TouchableOpacity key={item.id}
        onPress={() => navigation.navigate('Category', { title: item.id,name:item.name,isfor:"search",pmt:'make' })}>
        <View style={styles.button}>
          <Image
            source={{uri:`${baseUrl}uploads/car-icons/${item.icon}`}} 
            resizeMode="contain" style={styles.image}/>
          <Text style={{height:33,textAlign:'center',paddingTop:5}} color="gray75" font='h5'>
            {item.name}
          </Text>
        </View>
      
      </TouchableOpacity>
    ))}
  </View>
  )
}

export default Section1;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
      justifyContent:'center'
    },
    button: { 
      width: getScreenWidth() / 5.2,
      aspectRatio: 1 / 1.2,
      justifyContent: 'center',
      alignItems: 'center',
      margin:scale(9),
      backgroundColor: colors.white,
      shadowColor: colors.gray50,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41, 
      elevation: 2,
      borderRadius: scale(5),
    },
    image: {
      width: scale(50),
      height: scale(50),
      marginTop:scale(10)
    },
  });










