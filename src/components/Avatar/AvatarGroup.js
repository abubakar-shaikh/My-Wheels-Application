import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Text from '../Text';

const DEFAULT_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  border: {
    borderColor: Colors.white,
    borderWidth: 2,
  },
  empty: {
    backgroundColor: Colors.gray10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AvatarGroup = ({
  size, images, show, label, labelSize,
}) => {
  const numOfVisible = show === -1 ? images.length : show;

  const items = [...images];

  if (show !== -1) {
    items.splice(numOfVisible, images.length - show);
  }

  const avatars = items.map((image, index) => (
    <Avatar
      source={image}
      style={[
        styles.border,
        index !== 0 && { marginRight: -scale(size / 8) },
      ]}
      key={image}
      size={size}
    />
  ));

  if (show !== -1 && numOfVisible !== images.length) {
    const textLabel = label || `+${images.length - show}`;
    avatars.unshift(
      <View
        key="empty"
        style={StyleSheet.flatten([
          styles.border,
          styles.empty,
          {
            height: scale(size),
            width: scale(size),
            borderRadius: scale(size / 2),
            marginLeft: -scale(size / 4),
          },
        ])}
      >
        <Text font={labelSize} color="gray75">{textLabel}</Text>
      </View>,
    );
  }
  return (
    <View style={styles.container}>
      {avatars}
    </View>
  );
};

AvatarGroup.propTypes = {
  size: PropTypes.number,
  images: PropTypes.any.isRequired,
  show: PropTypes.number,
  label: PropTypes.string,
  labelSize: PropTypes.string,
};

AvatarGroup.defaultProps = {
  size: DEFAULT_SIZE,
  show: -1,
  label: null,
  labelSize: 'h3',
};

export default AvatarGroup;
