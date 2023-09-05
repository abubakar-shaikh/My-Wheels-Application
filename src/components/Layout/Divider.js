import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(14),
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray50,
    flex: 1,
    marginHorizontal: scale(14),
  },
});

const Divider = ({ children, style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.divider} />
    {children}
    <View style={styles.divider} />
  </View>
);

Divider.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

Divider.defaultProps = {
  style: null,
};

export default Divider;
