import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// Internal Imports
import {
  borderColor,
  errorColor,
  primaryColor2,
  textColor3,
} from '../../utils/Theme';
import RegularText from '../TextComponents/RegularText';
import {h4, h5, h6} from '../../utils/Styles';

// External Imports
import {Input} from '@rneui/themed';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PasswordInputComponent({
  label,
  value,
  placeholder,
  onChangeText,
  errorMessage,
  isError,
  containerStyle,
  keyboardType,
}) {
  let inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={containerStyle}>
      <RegularText text={label} textStyle={styles.labelStyle} />
      <Input
        ref={inputRef}
        value={value}
        keyboardType={keyboardType || 'default'}
        containerStyle={[
          styles.containerStyle,
          isError
            ? {borderWidth: 1, borderColor: errorColor}
            : isFocused
            ? {borderWidth: 1, borderColor: primaryColor2}
            : {borderWidth: 1, borderColor: borderColor},
        ]}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        errorMessage={errorMessage}
        errorStyle={styles.errorStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={isSecure}
        rightIcon={
          !isSecure ? (
            <TouchableOpacity onPress={() => setIsSecure(true)}>
              <Icon name="eye" size={wp(6)} color="#D0D2D1" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsSecure(false)}>
              <Icon name="eye-off" size={wp(6)} color="#D0D2D1" />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    ...h5,
    color: textColor3,
    marginLeft: wp(2),
    marginBottom: hp(0.75),
    textAlign: 'left',
  },
  containerStyle: {
    padding: 0,
    backgroundColor: 'white',
    height: hp(7),
    borderRadius: wp(4),
    shadowColor: 'rgb(113, 113, 113)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 5,
  },
  inputContainerStyle: {
    padding: 0,
    height: hp(7),
    borderBottomWidth: 0,
  },
  inputStyle: {
    height: hp(7),
    ...h4,
    textAlign: 'left',
  },
  errorStyle: {
    color: errorColor,
    ...h6,
    fontFamily: 'Lato-Regular',
  },
});
