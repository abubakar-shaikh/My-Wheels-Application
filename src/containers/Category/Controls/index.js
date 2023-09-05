import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import Control from './Control';
import DisplayToggle from './DisplayToggle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: scale(14),
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
  },
  divider: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
    marginVertical: scale(14),
  },
  button: {
    paddingVertical: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Controls = ({ onDisplayChange }) => {
  // const [selectedTab, setSelectedTab] = useState('relevance');
  return (
    <View style={styles.container}>
      {/* <Control
        title="Relevance"
        isSelected={selectedTab === 'relevance'}
        onPress={() => setSelectedTab('relevance')}
      />
      <View style={styles.divider} />
      <Control
        title="Latest"
        isSelected={selectedTab === 'latest'}
        onPress={() => setSelectedTab('latest')}
      />
      <View style={styles.divider} />
      <Control
        title="Top Sales"
        isSelected={selectedTab === 'top'}
        onPress={() => setSelectedTab('top')}
      />
      <View style={styles.divider} />
      <Control
        title="Price"
        isSelected={selectedTab === 'price'}
        onPress={() => setSelectedTab('price')}
      /> */}
      {/* <View style={styles.divider} /> */}

      <View style={{ justifyContent: 'center' }}>
        <DisplayToggle onChange={onDisplayChange} />
      </View>
    </View>
  );
};

Controls.propTypes = {
  onDisplayChange: PropTypes.func.isRequired,
};

export default Controls;
