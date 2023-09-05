import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'components';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const recent = ['Toyota corola', 'Honda Civic', 'Fortuner', 'Mira',];
const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(4),
  },
  recent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: Colors.gray10,
    marginRight: scale(10),
    marginTop: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: scale(5),
    borderRadius: scale(4),
  },
});

const RecentSearches = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text weight="medium">Recent Searches</Text>
      <IconButton
        icon="trash"
        size={scale(14)}
        color="gray50"
      />
    </View>
    <View style={styles.recent}>
      {recent.map((text) => (
        <TouchableOpacity
          key={text}
          style={styles.button}
          onPress={() => navigation.navigate('Category', { title: text ,isfor:"search",pmt:'search' })}
        >
          <Text color="gray75">{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

RecentSearches.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RecentSearches;
