import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';
import Text from '../Text';
import GradientBlock from '../Gradient/Block';

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContent: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
  },
});

const Tabs = ({ children, selectedTab }) => {
  const [currentTab, setCurrentTab] = useState(selectedTab);

  const renderTabHeader = () => React.Children.map(children, (child, index) => (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => setCurrentTab(index)}
    >
      <View style={styles.tabContent}>
        <Text
          weight={currentTab === index ? 'medium' : 'regular'}
          color="white"
        >
          {child.props.label}
        </Text>
        {currentTab === index && <View style={styles.selectedTab} />}
      </View>
    </TouchableOpacity>
  ));

  return (
    <>
      <GradientBlock>
        <ScrollView
          contentContainerStyle={styles.tabHeader}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {renderTabHeader()}
        </ScrollView>
      </GradientBlock>
      {children[currentTab]}
    </>
  );
};

Tabs.propTypes = {
  children: PropTypes.any.isRequired,
  selectedTab: PropTypes.number,
};

Tabs.defaultProps = {
  selectedTab: 0,
};

export default Tabs;
