import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: Colors.gray50,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: scale(8),
  },
});

const Card = ({ children, style }) => (
  <View style={StyleSheet.flatten([styles.container, style])}>
    {children}
  </View>
);

Card.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
};

Card.defaultProps = {
  style: null,
};

export default Card;
