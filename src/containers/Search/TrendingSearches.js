import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const trending = ['Mercedes', 'KIA Picanto', 'Honda Civic', 'Fortuner', 'Mira','Suzuki Culltus','BMW', 'Suzuki Swift'];
const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  header: {
    marginBottom: scale(4),
  },
  trending: {
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

const TrendingSearches = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text weight="medium">Trending Searches</Text>
    </View>
    <View style={styles.trending}>
      {trending.map((text) => (
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

TrendingSearches.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TrendingSearches;
