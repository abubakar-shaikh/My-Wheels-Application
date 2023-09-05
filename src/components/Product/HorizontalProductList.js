import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { getNProducts } from 'mocks/products';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import BasicTile from './BasicTile';

const HorizontalProductList = ({ navigation, products, numberOfProducts }) => {
  const productsList = isEmpty(products) ? getNProducts(numberOfProducts) : products;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={products}
    >
      {productsList.map((product, index) => (
        <BasicTile
          key={product.id}
          style={StyleSheet.flatten([
            { marginRight: scale(14) },
            index === 0 && { marginLeft: scale(14) },
            index === productsList.length && { marginRight: scale(14) },
          ])}
          {...product}
          onPress={() => navigation.navigate('Product', { product })}
        />
      ))}
    </ScrollView>
  );
};

HorizontalProductList.propTypes = {
  navigation: PropTypes.object.isRequired,
  numberOfProducts: PropTypes.number,
  products: PropTypes.array,
};

HorizontalProductList.defaultProps = {
  numberOfProducts: 4,
  products: [],
};
export default HorizontalProductList;
