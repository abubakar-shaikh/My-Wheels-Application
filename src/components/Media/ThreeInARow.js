import React, { Fragment } from 'react';
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
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  space: {
    paddingHorizontal: scale(2),
  },
});

const ThreeInARow = ({ images }) => (
  <View style={styles.container}>
    {images.map((image, index) => (
      <Fragment key={index}>
        <TouchableOpacity style={styles.container}>
          <Image
            source={image}
            style={[
              styles.image,
              index === 0 && { ...borders.leftMost },
              index === 2 && { ...borders.rightMost },
            ]}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {(index !== 0 || index !== 2) && <View style={styles.space} />}
      </Fragment>
    ))}
  </View>
);

ThreeInARow.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ThreeInARow;
