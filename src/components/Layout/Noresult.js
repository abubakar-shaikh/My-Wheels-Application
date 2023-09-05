import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../Touchable/Button'

const Noresult = () => {
  return (
    <View style={styles.container}> 
      <Text>No Result Found</Text>
      <Button label='No Result '/>
    </View>
  )
}

export default Noresult;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:240,
        // justifyContent:'center',
        alignItems:'center'
    }
})