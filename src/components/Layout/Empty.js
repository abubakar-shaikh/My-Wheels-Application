import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';
import { scale } from 'react-native-size-matters';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
    backgroundColor: Colors.gray10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(14),
  },
});

const Empty = () => (
  <View style={styles.container}>
    <View style={styles.icon}>
      <Icon
        name="cloud-drizzle"
        color={Colors.gray25}
        size={scale(40)}
      />
    </View>
    <Text color="gray50">Nothing to see here...</Text>
  </View>
);

export default Empty;
