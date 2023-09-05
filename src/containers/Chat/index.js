import React from 'react';
import { Container, NavBar,Text } from 'components';
import PropTypes from 'prop-types';
import { getChats } from 'mocks/chats';
import ConversationList from './Conversation';
import {View} from 'react-native';

const chats = getChats();

const Chat = ({ navigation }) => (
  <Container backgroundColor="white">
    <NavBar
      title="Chat"
      onLeftIconPress={() => navigation.goBack()}/>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text font='h1' >Coming Soon!</Text>
      <Text font='h4'>Available In Next Version...</Text>
    </View>
    {/* <ConversationList
      data={chats}
      onChatPress={(id) => navigation.navigate('ChatRoom', { id })}
    /> */}
  </Container>
);

Chat.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Chat;
