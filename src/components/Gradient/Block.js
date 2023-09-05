import React from 'react';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

const GradientBlock = ({ children, style, gradient }) => (
  <LinearGradient
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={gradient}
    style={style}
  >
    {children}
  </LinearGradient>
);

GradientBlock.propTypes = {
  children: PropTypes.any.isRequired,
  gradient: PropTypes.array,
  style: PropTypes.any,
};

GradientBlock.defaultProps = {
  style: null,
  gradient: [Colors.primaryAlt, Colors.primaryAlt, Colors.primary],
};

export default GradientBlock;
