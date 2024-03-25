import React from 'react';
import {useWindowDimensions, View, ScrollView} from 'react-native';
import {Text} from 'components';
import {scale, verticalScale} from 'react-native-size-matters';
import Brands from './Section/TabScreens/Brands';
import Category from './Section/TabScreens/Category';
import Model from './Section/TabScreens/Model';
import Budget from './Section/TabScreens/Budget';
import City from './Section/TabScreens/City';
import BodyType from './Section/TabScreens/BodyType';
import Supervised from './Section/Supervised';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Products from './Section/Prouducts';
import Feature from './Section/Feature';
import Manage from './Section/Manage';
import BrowMore from './Section/BrowMore';
import colors from 'themes/colors';
import PropTypes from 'prop-types';

const renderScene = SceneMap({
  Brands: Brands,
  Category: Category,
  Model: Model,
  Budget: Budget,
  City: City,
  BodyType: BodyType,
});

const UsedCar = ({navigation}) => {
  const layout = useWindowDimensions();
  const renderTabBar = props => (
    <TabBar
      labelStyle={{textTransform: 'capitalize'}}
      {...props}
      scrollEnabled={true}
      indicatorStyle={{backgroundColor: colors.primaryAlt}}
      style={{backgroundColor: '#FFF'}}
      tabStyle={{width: scale(90)}}
      activeColor={colors.primaryAlt}
      inactiveColor="gray"
      pressColor={colors.primaryAlt}
    />
  );
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'Category', title: 'Category'},
    {key: 'Budget', title: 'Budget'},
    {key: 'Brands', title: 'Brands'},
    {key: 'Model', title: 'Model'},
    {key: 'City', title: 'City'},
    {key: 'BodyType', title: 'BodyType'},
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={{paddingTop: scale(14), paddingLeft: scale(15)}}>
          <Text style={{fontWeight: '700'}} font="h2">
            Browse Used Car
          </Text>
        </View>
        <View style={{height: scale(270)}}>
          <TabView
            swipeEnabled={false}
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={{backgroundColor: '#fff'}}
            initialLayout={{width: layout.width}}
          />
        </View>
        <Supervised navigation={navigation} />
        <Products navigation={navigation} />
        <Feature navigation={navigation} />
        <Manage navigation={navigation} />

        <View style={{paddingHorizontal: scale(20)}}>
          <BrowMore navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

UsedCar.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default UsedCar;
