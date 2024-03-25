import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Colors, {colorProps} from 'themes/colors';
import {scale} from 'react-native-size-matters';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    padding: scale(12),
    alignItems: 'center',
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ghost: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
  },
  disabled: {
    backgroundColor: Colors.gray10,
    borderColor: Colors.gray10,
  },
  tiny: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },
});

const Button = ({
  children,
  label,
  variant,
  textColor,
  color,
  onPress,
  size,
}) => (
  <TouchableOpacity disabled={variant === 'disabled'} onPress={onPress}>
    {variant === 'gradient' && (
      <LinearGradient
        start={{x: 1.2, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#dc333a', '#9a0e12']}
        style={StyleSheet.flatten([
          styles.container,
          size === 'tiny' && styles.tiny,
        ])}>
        {children && children}
        {!children && label && (
          <Text color={textColor || 'white'} weight="medium">
            {label}
          </Text>
        )}
      </LinearGradient>
    )}
    {variant !== 'gradient' && (
      <View
        style={StyleSheet.flatten([
          styles.container,
          styles.ghost,
          variant === 'solid' && {
            backgroundColor: Colors[color],
            borderColor: Colors[color],
          },
          variant === 'disabled' && styles.disabled,
          size === 'tiny' && styles.tiny,
        ])}>
        {children && children}
        {!children && label && (
          <Text
            color={textColor || (variant === 'disabled' ? 'white' : 'gray50')}
            weight="medium">
            {label}
          </Text>
        )}
      </View>
    )}
  </TouchableOpacity>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['gradient', 'ghost', 'solid', 'disabled']),
  size: PropTypes.oneOf(['tiny', 'regular']),
  label: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(colorProps),
  color: PropTypes.oneOf(colorProps),
  children: PropTypes.any,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  variant: 'gradient',
  size: 'regular',
  color: 'primary',
  textColor: null,
  children: null,
  onPress: null,
};

export default Button;
