import React from 'react';
import {
  TouchableOpacity, ImageBackground, StyleSheet, View,
} from 'react-native';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Text from '../Text';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';
import { Heart } from '../Badge';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: scale(13),
    marginVertical: scale(8),
    backgroundColor:'#fff'
  },
  imageContainer: {
    width: getScreenWidth() / 3.5,
    aspectRatio: 1 / 1,
    borderRadius: scale(8),
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),

    justifyContent: 'space-between',
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  // between: {
  //   justifyContent: 'space-between',
  // },
  discount: {
    textDecorationLine: 'line-through',
    marginLeft: scale(8),
  },
});

const ListTile = ({
  price,
  onPress,
  state_name,
  model_name,
  brand_name,
  year,
  mileage,
  transmission,
  gallery
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <View style={styles.imageContainer}>
      <ImageBackground
        source={{uri:`${imageUrl}uploads/gallery/${JSON.parse(gallery)[0]}`}}
        style={styles.bg}
      />
    </View>

    <View style={styles.info}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text numberOfLines={2} weight="medium" color="tertiary">{brand_name} {model_name}</Text>
      {/* <Heart/> */}
      </View>
      <View style={styles.row}>
        <Text color="gray50" weight="medium" font="h3">PKR  {price}</Text>
      </View>
      <View style={[styles.row, styles.between]}>
        <EvilIcons name='location' size={30}/>
        <Text color="gray50">{state_name}</Text>
      </View>
      <View style={[styles.row, styles.between]}>
        <Text color="gray50">{year} | {mileage} km | {transmission}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

ListTile.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  sold: PropTypes.number,
  images: PropTypes.array,
  rating: PropTypes.number,
  numberOfReviews: PropTypes.number,
  beforeDiscount: PropTypes.string,
  onPress: PropTypes.func,
};

ListTile.defaultProps = {
  onPress: null,
  beforeDiscount: null,
};

export default ListTile;
