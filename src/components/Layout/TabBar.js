import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { scale, verticalScale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientIcon from '../Gradient/Icon';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray10,
  },
});

const icons = {
  Home: {
    active: 'home',
    inactive: 'home-outline',
  },
  Ads: {
    active: 'google-ads',
    inactive: 'google-ads',
  },
  Sell: {
    active: 'plus-circle',
    inactive: 'plus-circle-outline',
  },
  Chat: {
    active: 'chat',
    inactive: 'chat-outline',
  },
  More: {
    active: 'reorder-horizontal',
    inactive: 'reorder-horizontal',
  },
};

const TabBar = ({ state, descriptors, navigation }) => (
  <SafeAreaView style={styles.container}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{
            flex: 1, alignItems: 'center', paddingVertical: verticalScale(8),
          }}
          key={route.key}
        >
          {isFocused && (
            <GradientIcon
              icon={icons[route.name].active}
              size={30}
            />
          )}
          {!isFocused && (
            <Icon
              name={icons[route.name].inactive}
              color={Colors.gray50}
              size={scale(30)}
            />
          )}
          <Text
            font="h5"
            style={{
              color: isFocused ? Colors.tertiary : Colors.gray50,
              marginTop: verticalScale(2),
            }}
            weight="medium"
          >
            {route.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </SafeAreaView>
);

TabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  descriptors: PropTypes.object.isRequired,
};

export default TabBar;
