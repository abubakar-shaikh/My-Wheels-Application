import React from 'react'
import { Text } from 'react-native'

export default function BoldText({text,textStyle}) {
  return <Text style={[{fontFamily:'Lato-Bold'},textStyle]}>{text}</Text>
}