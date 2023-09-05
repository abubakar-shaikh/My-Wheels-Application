import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ConversationItem from './ConversationItem';

const ConversationList = ({ data, onChatPress }) => (
  <FlatList
    keyExtractor={(item) => item?.id?.toString()}
    data={data}
    renderItem={({ item }) => (
      <ConversationItem
        {...item}
        onChatPress={onChatPress}
      />
    )}
  />
);

ConversationList.propTypes = {
  data: PropTypes.array.isRequired,
  onChatPress: PropTypes.func.isRequired,
};

export default ConversationList;
