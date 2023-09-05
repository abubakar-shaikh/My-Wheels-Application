import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(2),
  },
  check: {
    position: 'absolute',
    zIndex: 10,
  },
});

const VerifiedBadge = () => (
  <View style={styles.container}>
    <Icon
      name="certificate"
      color={Colors.blue}
      size={scale(18)}
    />
    <Icon
      name="check"
      color={Colors.white}
      size={scale(6)}
      style={styles.check}
    />
  </View>
);

export default VerifiedBadge;
