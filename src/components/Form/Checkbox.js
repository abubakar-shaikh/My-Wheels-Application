import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  default: {
    borderColor: Colors.gray25,
    borderWidth: 1,
  },
});

const Checkbox = ({
  label, style, value, controlledExternally,
}) => {
  const [isChecked, setChecked] = useState(value);
  const Component = isChecked ? LinearGradient : View;
  const componentProps = isChecked ? {
    colors: [Colors.tertiary, Colors.primaryAlt, Colors.primary],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  } : {};

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const onChecked = () => {
    if (!controlledExternally) {
      setChecked(!isChecked);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onChecked}
    >
      <Component
        {...componentProps}
        style={[
          styles.checkbox,
          !isChecked && styles.default,
          style,
        ]}
      >
        <Icon
          name="check"
          color={Colors.white}
          size={scale(10)}
        />
      </Component>
      {label && <Text>{label}</Text>}
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  style: PropTypes.any,
  label: PropTypes.string,
  value: PropTypes.bool,
  controlledExternally: PropTypes.bool,
};

Checkbox.defaultProps = {
  style: null,
  label: null,
  value: false,
  controlledExternally: false,
};

export default Checkbox;
