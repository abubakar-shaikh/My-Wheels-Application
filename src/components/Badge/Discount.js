import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    padding: scale(8),
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    aspectRatio: 1 / 1,
  },
});

const Discount = ({ discount }) => (
  <View style={styles.container}>
    <Text color="white" weight="medium">{discount}</Text>
    <Text color="white" weight="medium">OFF</Text>
  </View>
);

Discount.propTypes = {
  discount: PropTypes.string.isRequired,
};

export default Discount;
