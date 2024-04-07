import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Text} from 'components';
import Section1 from './NewCarSection/Section1';
import Popular from './NewCarSection/Popular';
import PropTypes from 'prop-types';
// import Upcoming from './NewCarSection/Upcoming';
// import NewlyLaunch from './NewCarSection/NewlyLaunch';
import BrowMore from './Section/BrowMore';
import Supervised from './Section/Supervised';
const NewCar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <View style={{paddingTop: scale(14), paddingLeft: scale(15)}}>
          <Text style={{fontWeight: '700'}} font="h2">
            New Cars By Make
          </Text>
        </View>
        <Section1 navigation={navigation} />
        <Popular navigation={navigation} />
        <Supervised navigation={navigation} />
        {/* <NewlyLaunch
            navigation={navigation}/> */}
        {/* <Upcoming
            navigation={navigation}/> */}
        <View style={{paddingHorizontal: scale(20)}}>
          <BrowMore navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

NewCar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NewCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: verticalScale(5),
  },
});
