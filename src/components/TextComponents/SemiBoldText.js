import React from 'react'
import { Text } from 'react-native'

export default function SemiBoldText({text,textStyle}) {
  return <Text style={[{fontFamily:'Lato-Bold'},textStyle]}>{text}</Text>
}