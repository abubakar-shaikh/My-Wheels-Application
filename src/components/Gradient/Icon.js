import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mask: {
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GradientIcon = ({ icon, size, ...rest }) => {
  const scaled = scale(size);

  return (
    <View style={{ width: scaled, height: scaled }} {...rest}>
      <MaskedView
        style={[styles.container, { height: scaled }]}
        maskElement={(
          <View
            style={styles.mask}
          >
            <Icon
              name={icon}
              size={scaled}
              color="white"
            />
          </View>
        )}
      >
        <LinearGradient
          colors={[Colors.tertiary, Colors.primaryAlt, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  );
};
GradientIcon.propTypes = {
  size: PropTypes.number,
  icon: PropTypes.string.isRequired,
};

GradientIcon.defaultProps = {
  size: 40,
};

export default GradientIcon;
