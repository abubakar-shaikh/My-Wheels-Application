/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(2),
    marginBottom: scale(14),
  },
  children: {
    marginTop: scale(20),
  },
});

const TimelineBlock = ({
  children, title, subtitle,
}) => (
  <View style={styles.container}>
    <Text weight="medium">{title}</Text>
    <Text color="gray50">{subtitle}</Text>
    {children && (
      <View style={styles.children}>
        {children}
      </View>
    )}
  </View>
);

TimelineBlock.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired,
  hideTrack: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

TimelineBlock.defaultProps = {
  hideTrack: false,
  children: null,
};

export default TimelineBlock;
