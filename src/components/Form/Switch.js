import React, { useState } from 'react';
import { Switch as RNSwitch } from 'react-native';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';

const Switch = ({ initialValue }) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <RNSwitch
      trackColor={{ false: Colors.gray10, true: Colors.primary}}
      ios_backgroundColor={Colors.gray10}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

Switch.propTypes = {
  initialValue: PropTypes.bool,
};

Switch.defaultProps = {
  initialValue: false,
};

export default Switch;
