import React from 'react';
import {
  TouchableOpacity, ImageBackground, StyleSheet, View,
} from 'react-native';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Text from '../Text';
import Card from '../Card';
// import Rating from '../Rating';
import { Heart } from '../Badge';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    overflow: 'hidden',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:scale(3)
  },
  info: {
    padding: scale(7),
    justifyContent: 'space-between',
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  between: {
    justifyContent: 'space-between',
  },
  discount: {
    textDecorationLine: 'line-through',
    marginLeft: scale(4),
  },
});

const BasicTile = ({
  price,
  style,
  parentMargin,
  size,
  onPress,
  state_name,
  model_name,
  brand_name,
  year,
  mileage,
  transmission,
  gallery
}) => {
  const width = size - scale(parentMargin) - scale(parentMargin / 2);
  return (
    <Card 
    style={StyleSheet.flatten([
      {
        width,
        marginTop: scale(8),
        marginBottom: scale(8),
      },
      style])}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
      >
        <View
          style={{
            width,
            aspectRatio: 1 / 0.9,
          }}
        >
          <ImageBackground
            source={{uri:`${imageUrl}uploads/gallery/${JSON.parse(gallery)[0]}`}}
            style={styles.bg}
          />
        </View>

        <View style={styles.info}>
          <Text numberOfLines={2} style={{fontWeight:'bold'}} color="tertiary">{brand_name} {model_name}</Text>
          <View style={[styles.row, styles.between]}>   
           <Text color="gray50" weight="medium" >PKR,{Math.floor(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
          <View style={[styles.row, styles.between]}>
            <Text font='h5' color="gray50">{year} | {mileage} km | {transmission}</Text>
          </View>
          <View style={[styles.row, styles.between]}>
            <Text color="gray50">{state_name}</Text>
            {/* <Heart /> */}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

BasicTile.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  sold: PropTypes.number,
  images: PropTypes.array,
  // rating: PropTypes.number,
  numberOfReviews: PropTypes.number,
  style: PropTypes.any,
  parentMargin: PropTypes.number,
  size: PropTypes.number,
  onPress: PropTypes.func,
  beforeDiscount: PropTypes.string,
};

BasicTile.defaultProps = {
  style: null,
  parentMargin: 14,
  size: getScreenWidth() / 2,
  onPress: null,
  beforeDiscount: null,
};

export default BasicTile;
