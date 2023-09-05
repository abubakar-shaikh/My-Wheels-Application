import { StyleSheet } from "react-native";
import Colors from 'themes/colors';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff'
    },
    header: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems:'center'
    },
    form: {
      flex: 1,
      paddingHorizontal: scale(14),
      paddingVertical: scale(14),
    },
    welcome: {
      marginBottom: scale(14),
      alignItems:'center'
    },
    signUpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginVertical: scale(14),
    },
    socialContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: scale(14),
      flex: 0.7,
      borderWidth:1,
      borderRadius:10
    },
    social2: {
      width: scale(50),
      height: scale(40),
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: scale(10),
      marginRight:scale(50)
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: scale(14),
      flex: 1,
    },
    social: {
      width: scale(50),
      height: scale(50),
      borderRadius: scale(25),
      backgroundColor: Colors.gray5,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: scale(5),
    },
    forgot: {
      alignItems: 'flex-end',
      flex: 1,
      margin:scale(8)
    },
    logo: {
      flex: 1,
      width: getScreenWidth() / 1.4,
      resizeMode: 'contain',
    },
    toastcontainer:{height:60,width:'95%',backgroundColor:'red',borderRadius:10,
    position:'absolute',justifyContent:'center',alignItems:'center'
  },
  divider: {
    marginBottom: scale(30),
  },
  buttonContainer: {
    paddingVertical: scale(14),
    position:'relative',
    top:40
  },
  });
  