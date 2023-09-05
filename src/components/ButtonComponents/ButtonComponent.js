import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

// Internal Imports
import { primaryColor1, primaryColor3, textColor2 } from '../../utils/Theme'
import BoldText from '../TextComponents/BoldText'
import { h3, h4 } from '../../utils/Styles'

// External Imports
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {PulseIndicator   } from 'react-native-indicators';

export default function ButtonComponent({title,buttonStyle,textStyle,onPress,leftIcon,isLoading,disabled}) {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.buttonStyle,buttonStyle]} onPress={!isLoading ? onPress : ()=>console.log('')}>
      {
        isLoading ?
        <PulseIndicator    cator color='rgb(240, 242, 245)' animationDuration={1200} animating={isLoading} />

        :
        <>
          {leftIcon}
          <BoldText 
              text={title}
              textStyle={[{...h4,color:textColor2},textStyle]}
          />
        </>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:primaryColor1,
        borderRadius:wp(4),
        height:hp(7.5),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})