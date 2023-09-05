import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';

const DEFAULT_SIZE = 80;
const DEFAULT_RADIUS = DEFAULT_SIZE / 2;

const styles = StyleSheet.create({
  container: {
    height: DEFAULT_SIZE,
    width: DEFAULT_SIZE,
    borderRadius: DEFAULT_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  avatarStyle: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
});

const Avatar = ({
  source, size, style,
}) => (
  <View style={StyleSheet.flatten([
    styles.container,
    { width: scale(size), height: scale(size), borderRadius: scale(size / 2) },
    style])}
  >
    <Image
      source={source}
      style={[styles.avatarStyle, { width: scale(size), height: scale(size) }]}
    />
  </View>
);

Avatar.propTypes = {
  source: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.any,
};

Avatar.defaultProps = {
  source: null,
  size: DEFAULT_SIZE,
  style: {},
};

export default Avatar;
