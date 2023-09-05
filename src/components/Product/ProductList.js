import React from 'react';
// import { getNProducts } from 'mocks/products';
import { View, StyleSheet,FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
// import Colors from 'themes/colors';
// import isEmpty from 'lodash/isEmpty';
import BasicTile from './BasicTile';
import ListTile from './ListTile';
// import Text from '../Text';

const styles = StyleSheet.create({
  left: {
    marginLeft: scale(13),
  },
});

const ProductList = ({
   navigation, variant, products,
  }) => {

  const Tile = variant === 'grid' ? BasicTile : ListTile;
  const renderItem=({item})=>{
    return(
     <Tile
       onPress={() => navigation.navigate('ProductDetails', { pid: item.id,proglist:'show',ProItem:item })}
       key={item.id}
       style={styles.left}
       {...item}
       />
    )
  }

  return (
    <View style={{flex:1}}>
      {Tile == ListTile ?
        <FlatList
            key={'_'}
            keyExtractor={item => "_" + item.id}
            numColumns={1}
            data={products}
            renderItem={renderItem}/>
        :
        <FlatList
            key={'#'}
            keyExtractor={item => "#" + item.id}
            renderItem={renderItem}
            data={products}
            numColumns={2} />
      }
    </View>
  );
};

ProductList.propTypes = {
  navigation: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['list', 'grid']),
  products: PropTypes.array,
};

ProductList.defaultProps = {
  variant: 'grid',
  products: [],
};

export default ProductList;
