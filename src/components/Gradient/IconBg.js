import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors, { colorProps } from 'themes/colors';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Block from './Block';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const IconBg = ({
  icon, iconColor, size, gradient,
}) => {
  const iconSize = scale(size / 2);
  return (
    <Block
      style={StyleSheet.flatten([
        styles.container,
        {
          width: scale(size),
          height: scale(size),
          borderRadius: scale(size / 2),
        }])}
      gradient={gradient}
    >
      <Icon
        name={icon}
        color={Colors[iconColor]}
        size={iconSize}
      />
    </Block>

  );
};

IconBg.propTypes = {
  iconColor: PropTypes.oneOf(colorProps),
  icon: PropTypes.string.isRequired,
  gradient: PropTypes.array,
  size: PropTypes.number,
};

IconBg.defaultProps = {
  iconColor: 'white',
  size: 40,
  gradient: [Colors.tertiary, Colors.primaryAlt, Colors.primary],
};

export default IconBg;
