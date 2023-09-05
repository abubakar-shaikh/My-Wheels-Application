import { StyleSheet, View ,SafeAreaView,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {
    Text
  } from 'components';
import { scale } from 'react-native-size-matters';
import { ProgressBar} from 'react-native-paper';
import Colors  from 'themes/colors';

const ProgressForm = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={[styles.txt,{fontSize:18}]}>MyWheels Inspection Report</Text>
        <Text color='gray50'>inspected Date:08-11-2022</Text>
         <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:scale(10),borderBottomWidth:0.3,borderColor:'gray'}}>
           <Text style={styles.txt}>Overall Rating</Text>
           <Text color='primary'>8.3/10</Text>
         </View>

        <View style={styles.progview}>
            <Text>Exterior & Body</Text>
            <Text>83%</Text>
        </View>
        <ProgressBar progress={0.83} color='red'/>

        <View style={styles.progview}>
            <Text>Engine/Transmission/Clutch</Text>
            <Text>97%</Text>
        </View>
        <ProgressBar progress={0.97} color='red'/>


        <View style={styles.progview}>
            <Text>Suspension/Steering</Text>
            <Text>75%</Text>
        </View>
        <ProgressBar progress={0.75} color='red'/>

        <View style={styles.progview}>
            <Text>Interior</Text>
            <Text>82%</Text>
        </View>
        <ProgressBar progress={0.82} color='red'/>

        <View style={styles.progview}>
            <Text>AC/Heater</Text>
            <Text>100%</Text>
        </View>
        <ProgressBar progress={1} color='red'/>

        <View style={{paddingVertical:scale(20),flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={[styles.btn,{borderWidth:1}]}>
               <Text style={styles.btntxt}>Learn More</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.brightRed}]}>
               <Text color='gray10' style={styles.btntxt}>View Inspection Report</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ProgressForm

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:scale(23),
        padding:scale(5),
        backgroundColor:'whitesmoke'
    },
    txt:{
        fontSize:scale(15),
        fontWeight:'bold',
        paddingBottom:scale(5)
    },
    progview:{flexDirection:'row',justifyContent:'space-between',paddingVertical:scale(15)},
    btn:{padding:scale(10),paddingHorizontal:scale(20),alignItems:'center',justifyContent:'center',borderRadius:scale(5)},
    btntxt:{fontWeight:'700'}
})