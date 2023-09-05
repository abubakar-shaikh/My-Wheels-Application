import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from 'themes/colors';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  barCompleted: {
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
  },
  indicator: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    position: 'absolute',
    top: -scale(15),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ProgressBar = ({ completion, size, indicatorIconName }) => {
  const [indicatorX, setIndicatorX] = useState(0);
  const defaultCompletedBar = {
    height: scale(size),
    borderTopLeftRadius: scale(size / 2),
    borderBottomLeftRadius: scale(size / 2),
  };

  const completedBar = {
    borderTopRightRadius: scale(size / 2),
    borderBottomRightRadius: scale(size / 2),
  };

  const defaultRemainedBar = {
    backgroundColor: Colors.gray10,
    height: scale(size),
    borderTopRightRadius: scale(size / 2),
    borderBottomRightRadius: scale(size / 2),
  };

  const remainedBar = {
    borderTopLeftRadius: scale(size / 2),
    borderBottomLeftRadius: scale(size / 2),
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[Colors.tertiary, Colors.primaryAlt, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.flatten([
          defaultCompletedBar,
          { flex: completion },
          completion === 1 && completedBar,
        ])}
      />
      <View
        style={StyleSheet.flatten([
          defaultRemainedBar,
          { flex: 1 - completion },
          1 - completion === 0 && remainedBar,
        ])}
        onLayout={({ nativeEvent: { layout: { x } } }) => setIndicatorX(x)}

      />
      {indicatorIconName && (
        <View style={[styles.indicator,
          {
            left: indicatorX - scale(15),
          }]}
        >
          <Icon
            name={indicatorIconName}
            color={Colors.white}
          />
        </View>
      )}
    </View>
  );
};

ProgressBar.propTypes = {
  completion: PropTypes.number,
  size: PropTypes.number,
  indicatorIconName: PropTypes.string,
};

ProgressBar.defaultProps = {
  completion: 1,
  size: 10,
  indicatorIconName: null,
};

export default ProgressBar;
