import React from 'react';
import {View, StyleSheet, FlatList,Text,Pressable,ImageBackground,TouchableOpacity,onPress} from 'react-native';
import {scale} from 'react-native-size-matters';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../themes/colors';
import { getScreenWidth } from 'utils/size';
import Button from '../../components/Touchable/Button';
import {baseUrl,imageUrl} from '../../../assets/common/baseUrl';

const Ads = ({navigation, products}) =>{
  return (
    <View style={{flex: 1}}>
    <FlatList
      data={products}
      renderItem={({item}) => {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('ProductDetails', {
              pid: item.id,
              ProItem: item,
            })
          }
           style={{
                flex: 1,
                backgroundColor: 'whitesmoke',
                padding: scale(10),
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: scale(10),
                  padding: scale(5),
                }}>
                <View style={styles.container} onPress={onPress}>
                  <View style={styles.imageContainer}>
                    <ImageBackground
                      source={{
                        uri: `${baseUrl}uploads/gallery/${
                          JSON.parse(item.gallery)[0]
                        }`,
                      }}
                      style={styles.bg}
                    />
                  </View>
                  <View style={styles.info}>
                    <Text weight="medium" color="gray75">
                      {item.model_name} {item.variant_name}
                    </Text>
                    <Text color="gray100" weight="medium" font="h3">
                      {Math.floor(item.price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="location-pin"
                        size={25}
                        color={colors.primaryAlt}
                      />
                      <Text color="gray50">{item.state_name}</Text>
                    </View>
                    <Text color="gray50">
                      {item.year} | {item.mileage} km | {item.fuel_type}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1, marginRight: scale(10)}}>
                    <Button label="Feature This Ad" />
                  </View>
                  <TouchableOpacity style={styles.moreicon}>
                    <MaterialIcons name="more-horiz" size={25} />
                  </TouchableOpacity>
                </View>
                <Text color="gray50">Ad will expire in 30 days</Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

Ads.propTypes = {
  navigation: PropTypes.object.isRequired,
  products: PropTypes.array,
};

Ads.defaultProps = {
  products: [],
};

export default Ads;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: scale(14),
    backgroundColor: '#fff',
  },
  noadscontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  imageContainer: {
    width: getScreenWidth() / 3,
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
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  moreicon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
});
