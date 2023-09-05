import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'components';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  button: {
    paddingVertical: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: verticalScale(2),
    backgroundColor: Colors.primary,
  },
});

const Control = ({ title, onPress, isSelected }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text
      color={isSelected ? 'primary' : 'gray75'}
      weight={isSelected ? 'medium' : 'regular'}
    >
      {title}
    </Text>
    {isSelected && <View style={styles.selected} />}
  </TouchableOpacity>
);

Control.propTypes = {
  isSelected: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

Control.defaultProps = {
  isSelected: false,
};

export default Control;
