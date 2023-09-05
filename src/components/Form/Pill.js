import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import Colors from 'themes/colors';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray50,
    borderRadius: scale(8),
  },
  pill: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
  },
  left: {
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
  right: {
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  value: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray50,
  },
});

const Pill = ({ min, max, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const onAdd = () => {
    if (max !== -1 && value + 1 > max) {
      return;
    }
    setValue(value + 1);
  };

  const onMinus = () => {
    if (min !== -1 && value - 1 < min) {
      return;
    }
    setValue(value - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMinus}>
        <View style={[styles.pill, styles.left]}>
          <Icon
            name="minus"
            color={Colors.gray}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.value}>
        <Text>{value}</Text>
      </View>
      <TouchableOpacity onPress={onAdd}>
        <View style={[styles.pill, styles.right]}>
          <Icon
            name="plus"
            color={Colors.gray}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

Pill.propTypes = {
  initialValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

Pill.defaultProps = {
  initialValue: 0,
  min: -1,
  max: -1,
};

export default Pill;
