import React from 'react';
import {
  StyleSheet, ImageBackground, View,
} from 'react-native';
import {
  Text, Avatar, Rating, Button,
} from 'components';
import { scale, verticalScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: scale(14),
  },
  bg: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  content: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    alignItems: 'center',
  },
  name: {
    paddingHorizontal: scale(14),
    flex: 1,
    justifyContent: 'space-between',
  },
});

const Shop = ({ shop, navigation }) => (
  <View style={styles.container}>
    <ImageBackground
      source={shop.banner}
      blurRadius={20}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Avatar
          source={shop.image}
          size={60}
        />
        <View style={styles.name}>
          <View>
            <Text weight="medium" color="white" font="h3" numberOfLines={1}>{shop.name}</Text>
            <Text color="white">{`${shop.followers} followers`}</Text>
          </View>
          <Rating rating={shop.rating} textColor="white" />
        </View>
        <Button
          label="Visit Shop"
          size="tiny"
          variant="solid"
          color="white"
          textColor="gray75"
          onPress={() => navigation.navigate('Shop', { id: shop.id })}
        />
      </View>
    </ImageBackground>
  </View>
);

Shop.propTypes = {
  shop: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default Shop;
