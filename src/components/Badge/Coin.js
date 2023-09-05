import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors, { colorProps } from 'themes/colors';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Coin = ({ size, color, style }) => (
  <View
    style={StyleSheet.flatten([
      styles.container,
      {
        width: scale(size),
        height: scale(size),
        borderRadius: scale(size / 2),
        borderColor: Colors[color],
      },
      style,
    ])}
  >
    <Icon
      name="dollar-sign"
      color={Colors[color]}
      size={size / 1.5}
    />
  </View>
);

Coin.propTypes = {
  size: PropTypes.number,
  color: PropTypes.oneOf(colorProps),
  style: PropTypes.any,
};

Coin.defaultProps = {
  size: 20,
  color: 'white',
  style: null,
};

export default Coin;
