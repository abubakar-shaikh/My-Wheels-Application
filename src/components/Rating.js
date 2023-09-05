import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from 'react-native-size-matters';
import Colors, { colorProps } from 'themes/colors';
import range from 'lodash/range';
import Text from './Text';

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: scale(5),
  },
  total: {
    marginLeft: scale(5),
  },
});

const Rating = ({
  size, rating, total, textColor, style,
}) => (
  <View style={[styles.starsContainer, style]}>
    {
      range(1, 6).map((index) => {
        const fill = rating - index;
        const isHalfStar = Math.sign(fill) === -1 && fill >= -0.5;
        const isFill = fill >= 0;
        const filledIcon = isFill ? 'star' : 'star-outline';
        return (
          <Icon
            key={index}
            name={isHalfStar ? 'star-half-full' : filledIcon}
            color={(isFill || isHalfStar) ? Colors.primary : Colors.gray50}
            size={scale(size)}
          />
        );
      })
    }
    <Text color={textColor} style={styles.rating}>{rating}</Text>
    {total && <Text color={textColor} style={styles.total}>{`(${total})`}</Text>}
  </View>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  total: PropTypes.number,
  textColor: PropTypes.oneOf(colorProps),
  size: PropTypes.number,
  style: PropTypes.any,
};

Rating.defaultProps = {
  total: null,
  textColor: 'gray75',
  size: 18,
  style: null,
};

export default Rating;
