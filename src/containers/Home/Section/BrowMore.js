import React from 'react';
import {Text,ListItem2} from 'components';
import {ScrollView, StyleSheet, View, TouchableOpacity,Image} from 'react-native';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const BrowMore = ({navigation}) => {
  return (
    <View style={{flex:1,paddingBottom:scale(35)}}>
      <View style={styles.header}>
        <Text style={{fontWeight:'700'}} font="h2">Browse More</Text>
     </View>
       <ListItem2
            title="Forums"
            leftIcon="forum-outline"
            RightIcon='chevron-right'
            subtitle='Discuss about everythings on wheels'
            // onPress={() => navigation.navigate('EditProfile')}
          />
       <ListItem2
            title="Blog"
            leftIcon="folder-text"
            RightIcon='chevron-right'
            subtitle='PakWheels brings you the latest auto industry updates'
            onPress={() => navigation.navigate('Blog')}
          />
       <ListItem2
            title="New Car Prices"
            leftIcon="tag"
            RightIcon='chevron-right'
            subtitle='Get the latest price list'
            // onPress={() => navigation.navigate('EditProfile')}
          />
       <ListItem2
            title="Car Review"
            leftIcon="star-circle"
            RightIcon='chevron-right'
            subtitle='Get the latest price list Help You right the car '
            // onPress={() => navigation.navigate('EditProfile')}
          />
       <ListItem2
            title="Get On Road Price"
            leftIcon="car"
            RightIcon='chevron-right'
            subtitle='Get the latest price list'
            // onPress={() => navigation.navigate('EditProfile')}
          />
    </View>
  )
}

export default BrowMore;

BrowMore.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: scale(14),
      },
})