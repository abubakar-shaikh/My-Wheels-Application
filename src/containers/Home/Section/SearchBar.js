import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { getNavBarHeight } from 'utils/size';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { IconButton, Text } from 'components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: getNavBarHeight() - verticalScale(12),
    borderRadius: 100,
    paddingHorizontal: scale(14),
  },
  text: {
    marginHorizontal: scale(14),
  },
});

const SearchBar = ({ navigation }) => (
  <TouchableOpacity style={styles.container} 
  onPress={() => navigation.navigate('Search')}
  >
    <IconButton
      color="gray25"
      icon="search"
      size={18}
      onPress={() => navigation.navigate('Search')}
    />
    <Text flex color="gray50" style={styles.text}>Search for anything...</Text>
    {/* <IconButton
      color="gray25"
      icon="camera"
      size={18}
    /> */}
  </TouchableOpacity>

);

SearchBar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SearchBar;
