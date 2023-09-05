import { StyleSheet } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from 'themes/colors';

export default StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: scale(14),
      paddingHorizontal: scale(14),
      justifyContent: 'space-between',
    },
    image: {
      width: scale(180),
      height: scale(120),
      
    },
    flash: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    products: {
      paddingVertical: scale(14),
      paddingLeft: scale(15),
    },
    card:{
      backgroundColor: Colors.white,
      shadowColor: Colors.gray50,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41, 
      elevation: 10,
      borderRadius: scale(10),
      overflow:'hidden',
    },
    container: {
      flexDirection: 'row',
      paddingVertical: verticalScale(5),
      marginRight:scale(15)
    },
    nametxt:{marginLeft:scale(10),marginVertical:scale(2),fontWeight:'bold',fontSize:15}
  });
  