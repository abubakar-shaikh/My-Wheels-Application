import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors, { colorProps } from 'themes/colors';
import Fonts, { fontProps } from 'themes/fonts';

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
});

const Text = (props) => {
  const {
    style, children, centered, flex, font, weight, color, ...otherProps
  } = props;

  return (
    <RNText
      allowFontScaling={false}
      style={StyleSheet.flatten([
        centered && styles.centered,
        flex && styles.flex,
        {
          color: Colors[color],
          ...Fonts[font](weight),
        },
        style,
      ])}
      {...otherProps}
    >
      {children}
    </RNText>
  );
};

Text.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
  centered: PropTypes.bool,
  flex: PropTypes.bool,
  color: PropTypes.oneOf(colorProps),
  font: PropTypes.oneOf(fontProps),
  weight: PropTypes.oneOf(['regular', 'medium']),
};

Text.defaultProps = {
  children: null,
  style: null,
  centered: false,
  flex: false,
  color: 'gray100',
  font: 'p2',
  weight: 'regular',
};

export default Text;
