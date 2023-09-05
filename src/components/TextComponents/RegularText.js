import React from 'react'
import { Text } from 'react-native'

export default function RegularText({text,textStyle}) {
  return <Text style={[{fontFamily:'Lato-Regular'},textStyle]}>{text}</Text>
}