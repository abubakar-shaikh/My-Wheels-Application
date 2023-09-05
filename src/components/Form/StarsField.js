import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import range from 'lodash/range';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const StarsField = ({ initialValue }) => {
  const [rating, setRating] = useState(initialValue);
  return (
    <View style={styles.container}>
      {range(1, 6).map((index) => {
        const isFill = index <= rating;
        return (
          <TouchableOpacity
            onPress={() => setRating(index)}
            key={index}
          >
            <Icon
              name={isFill ? 'star' : 'star-outline'}
              color={isFill ? Colors.primary : Colors.gray50}
              size={scale(20)}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

StarsField.propTypes = {
  initialValue: PropTypes.number,
};

StarsField.defaultProps = {
  initialValue: 5,
};

export default StarsField;
