import React, { useState, useEffect } from 'react';
import { IconButton } from 'components';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const DisplayToggle = ({ onChange }) => {
  const [display, setDisplay] = useState('grid');

  useEffect(() => {
    onChange(display);
  }, [display]);

  const onPress = () => {
    setDisplay((presDisplay) => {
      const nextDisplay = presDisplay === 'grid' ? 'list' : 'grid';
      return nextDisplay;
    });
  };

  return (
    <IconButton
      icon={display}
      color="white"
      size={scale(18)}
      onPress={onPress}
    />
  );
};

DisplayToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DisplayToggle;
