import React from 'react';
import {
  StyleSheet, View, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import random from 'lodash/random';
import Text from '../Text';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: scale(8),
    overflow: 'hidden',
    width: scale(80),
    aspectRatio: 1 / 1,
    marginRight: scale(14),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  name: {
    marginLeft: scale(14),
  },
  price: {
    alignItems: 'flex-end',
    marginLeft: scale(14),
  },
  flex: {
    flex: 1,
  },
  productsContainer: {
    flexDirection: 'row',
    marginTop: scale(14),
  },
});

const LineItem = ({ product }) => (
  <View style={styles.productsContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={product.images[0]}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
    <View style={styles.flex}>
      <Text>{product.name}</Text>
      <Text color="gray50">{product.variants[random(0, 4)]}</Text>
    </View>
    <View style={styles.price}>
      <Text>{product.price}</Text>
      <Text color="gray50">{`x ${random(1, 10)}`}</Text>
    </View>
  </View>
);

LineItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default LineItem;
