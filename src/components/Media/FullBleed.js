import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: scale(8),
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    aspectRatio: 3 / 2,
  },
});

const FullBleed = ({ image }) => (
  <TouchableOpacity style={styles.container}>
    <Image source={image} style={styles.image} resizeMode="cover" />
  </TouchableOpacity>
);

FullBleed.propTypes = {
  image: PropTypes.any.isRequired,
};

export default FullBleed;
