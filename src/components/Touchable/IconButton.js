import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors, { colorProps } from 'themes/colors';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    borderRadius: scale(100),
    height: scale(16),
    width: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
    padding: scale(2),
    position: 'absolute',
    top: -scale(5),
    right: -scale(5),
    zIndex: 10,
  },
});

const IconButton = ({
  icon, size, onPress, text, color, style, badge, iconType,
}) => {
  const Icon = iconType === 'Feather' ? Feather : MaterialCommunityIcons;
  return (
    <TouchableOpacity onPress={onPress} style={StyleSheet.flatten([styles.container, style])}>
      {badge && <View style={styles.badge}><Text color="white" weight="medium" font="h6">{badge}</Text></View>}
      <Icon
        size={scale(size)}
        name={icon}
        color={Colors[color]}
      />
      {text && <Text font="h6" color={color} weight="medium">{text}</Text>}
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  onPress: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.oneOf(colorProps),
  style: PropTypes.any,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconType: PropTypes.oneOf(['Feather', 'MaterialCommunityIcons']),
};

IconButton.defaultProps = {
  size: 20,
  onPress: null,
  text: null,
  color: 'gray100',
  style: null,
  badge: null,
  iconType: 'Feather',
};

export default IconButton;
