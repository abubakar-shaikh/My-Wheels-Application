import React from 'react';
import {
  TouchableOpacity, View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Text, Avatar } from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import { getUserById } from 'mocks/users';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: scale(14),
  },
});

const ConversationList = ({ id, datetime, onChatPress }) => {
  const user = getUserById(id);
  return (
    <TouchableOpacity onPress={() => onChatPress(id)}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Avatar source={user.image} size={50} />
          <View style={styles.content}>
            <Text weight="medium">{user.name}</Text>
            <Text color="gray50" numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla sapien lacus, fringilla vitae condimentum sed, placerat id nulla.
            </Text>
          </View>
        </View>
        <Text font="h5" color="gray75">{datetime}</Text>
      </View>
    </TouchableOpacity>
  );
};

ConversationList.propTypes = {
  id: PropTypes.number.isRequired,
  datetime: PropTypes.string.isRequired,
  onChatPress: PropTypes.func.isRequired,
};

export default ConversationList;
