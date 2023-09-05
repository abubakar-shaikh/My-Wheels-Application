import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Container, NavBar, SearchBar,
} from 'components';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';
import RecentSearches from './RecentSearches';
import TrendingSearches from './TrendingSearches';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
});

const Search = ({ navigation }) => (
  <Container asGradient>
    <NavBar
      onLeftIconPress={() => navigation.goBack()}
      renderLeftComponent={() => (
        <SearchBar
          onSearch={(value) => {
            if (value) {
              navigation.navigate('Category', { title: value,isfor:"search",pmt:'search' });
            }
          }}
        />
      )}
    />
    <View style={styles.container}>
      {/* <RecentSearches navigation={navigation} /> */}
      <TrendingSearches navigation={navigation} />
    </View>
  </Container>
);

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Search;
