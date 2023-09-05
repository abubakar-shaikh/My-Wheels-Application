import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { getNavBarHeight } from 'utils/size';
import { verticalScale, scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Fonts from 'themes/fonts';
import PropTypes from 'prop-types';
import IconButton from '../Touchable/IconButton';

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
  input: {
    ...Fonts.p2(),
    flex: 1,
    color: Colors.gray75,
    marginHorizontal: scale(14),
  },
});

const SearchBar = ({ onSearch }) => (
  <View style={styles.container}>
    <IconButton
      color="gray25"
      icon="search"
      size={18}
    />
    <TextInput
      placeholder="Search for anything..."
      style={styles.input}
      underlineColorAndroid="transparent"
      onSubmitEditing={({ nativeEvent: { text } }) => onSearch(text)}
    />
    {/* <IconButton
      color="gray25"
      icon="camera"
      size={18}
    /> */}
  </View>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
