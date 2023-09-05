import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Colors, { colorProps } from 'themes/colors';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
  },
  leftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(40),
    minHeight: scale(40),
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: scale(14),
    justifyContent: 'center',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txt:{fontWeight:'bold',color:'#404040',fontSize:15}
});

const ListItem = ({
  title,
  subtitle,
  leftIcon,
  leftIconColor,
  renderLeftComponent,
  renderRightComponent,
  onPress,
  RightIcon
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {renderLeftComponent && renderLeftComponent()}
        {!renderLeftComponent && (
          <Icon
            name={leftIcon}
            size={scale(25)}
            color={Colors[leftIconColor]}
          />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.txt}>{title}</Text>
        {subtitle && <Text color="gray50">{subtitle}</Text>}
      </View>
      <View style={styles.rightContainer}>
        {renderRightComponent && renderRightComponent()}
        <Icon
          name={RightIcon}
          size={scale(20)}
          color={Colors.gray50}
        />
      </View>
    </View>
  </TouchableOpacity>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  renderLeftComponent: PropTypes.func,
  renderRightComponent: PropTypes.func,
  leftIcon: PropTypes.string,
  leftIconColor: PropTypes.oneOf(colorProps),
  onPress: PropTypes.func,
};

ListItem.defaultProps = {
  renderLeftComponent: null,
  renderRightComponent: null,
  subtitle: null,
  leftIcon: 'google',
  leftIconColor: 'gray25',
  onPress: null,
};

export default ListItem;
