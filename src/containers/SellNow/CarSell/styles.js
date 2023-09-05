import { StyleSheet } from "react-native";
import Colors from 'themes/colors';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';


export default StyleSheet.create({
    label: {padding: scale(14),marginLeft:scale(10)},
    labeltxt:{fontWeight:'bold'},
    inputContainer:{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',paddingVertical:scale(10)},
    inputicon:{borderRadius:50,marginHorizontal:scale(10),color:"#b4b4b4",backgroundColor:'whitesmoke',padding:8},
    inputview:{flex:1,borderBottomWidth:1,borderColor:'darkred'},
    input:{paddingBottom:0,paddingLeft:0},
    txt:{marginBottom:-10,fontWeight:'bold',color:'#000',fontSize:15},
    centeredView: {flex: 1,justifyContent: "center",alignItems: "center"},
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingTop: 20,
      shadowColor: "#000",
      width:'100%',
      marginTop: 'auto',
      height: '93%',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalhead:{justifyContent:'space-between',flexDirection:'row',marginBottom:scale(15 )},
    imgview:{height:scale(120),borderWidth:1,margin:scale(10),borderStyle:'dashed',borderColor:'red',flexDirection:'row',alignItems:'center',justifyContent:'center'},
    imgbox:{paddingHorizontal:scale(5),margin:scale(5),},
    txtView:{flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,borderColor:'gray',paddingVertical:10,justifyContent:'space-between'},
    btn:{borderRadius:0,paddingVertical:scale(20),backgroundColor:'#fff'}
  })
  