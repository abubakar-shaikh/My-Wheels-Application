import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../Card';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: scale(14),
  },
  content: {
    padding: scale(14),
  },
  opened: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray10,
  },
});

const Accordion = ({ title, children }) => {
  const [isOpened, setOpen] = useState(false);

  return (
    <Card>
      <TouchableOpacity onPress={() => setOpen(!isOpened)}>
        <View style={[
          styles.container,
          isOpened && styles.opened,
        ]}
        >
          <Text weight="medium" flex>{title}</Text>
          <Icon
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            size={scale(20)}
            color={Colors.gray50}
          />
        </View>
      </TouchableOpacity>
      {isOpened && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </Card>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
