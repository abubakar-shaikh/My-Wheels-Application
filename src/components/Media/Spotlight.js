import React from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import borders from './borders';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  block: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  horizontalSpace: {
    paddingHorizontal: scale(2),
  },
  verticalSpacing: {
    paddingVertical: scale(2),
  },
  spotlight: {
    flex: 1,
    aspectRatio: 3 / 2,
  },
  bottomRow: {
    flexDirection: 'row',
    flex: 1,
  },
});

const Spotlight = ({ images }) => (
  <View style={styles.block}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.container}>
        <Image
          source={images[0]}
          style={[
            styles.spotlight,
            borders.top,
          ]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
    <View style={styles.verticalSpacing} />
    <View style={styles.bottomRow}>
      <TouchableOpacity style={styles.container}>
        <Image
          source={images[1]}
          style={[
            styles.image,
            borders.bottomLeft,
          ]}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.horizontalSpace} />
      <TouchableOpacity style={styles.container}>
        <Image
          source={images[2]}
          style={[
            styles.image,
          ]}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.horizontalSpace} />
      <TouchableOpacity style={styles.container}>
        <Image
          source={images[3]}
          style={[
            styles.image,
            borders.bottomRight,
          ]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  </View>
);

Spotlight.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Spotlight;
