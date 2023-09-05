import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Colors, { colorProps } from 'themes/colors';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(2),
  },
  font: {
    fontSize: scale(10),
  },
});

const Label = ({
  children, backgroundColor, textColor, style,
}) => (
  <View style={StyleSheet.flatten([
    styles.container,
    { backgroundColor: Colors[backgroundColor] },
    style,
  ])}
  >
    <Text color={textColor} style={styles.font}>{children}</Text>
  </View>
);

Label.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
  backgroundColor: PropTypes.oneOf(colorProps),
  textColor: PropTypes.oneOf(colorProps),
};

Label.defaultProps = {
  style: null,
  backgroundColor: 'gray10',
  textColor: 'gray75',
};
export default Label;
