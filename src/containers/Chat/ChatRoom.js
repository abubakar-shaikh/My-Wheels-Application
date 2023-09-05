import React, { useState, useCallback } from 'react';
import {
  Container, NavBar, Avatar, Text, IconButton,
} from 'components';
import PropTypes from 'prop-types';
import { getUserById } from 'mocks/users';
import { getMessages } from 'mocks/chats';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import {
  GiftedChat, Bubble, MessageText, InputToolbar, Send, Composer,
} from 'react-native-gifted-chat';
import Fonts from 'themes/fonts';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: scale(14),
  },
  online: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: Colors.green,
    marginRight: scale(5),
  },
});

const initialMessages = getMessages();

const ChatRoom = ({ navigation, route }) => {
  const user = getUserById(route?.params?.id);
  const [messages, setMessages] = useState(initialMessages);

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
  }, []);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: Colors.gray10,
        },
        right: {
          backgroundColor: Colors.primary,
        },
      }}
    />
  );

  const renderMessageText = (props) => (
    <MessageText
      {...props}
      textStyle={{
        left: {
          color: Colors.gray100,
          ...Fonts.p2(),
        },
        right: {
          color: Colors.white,
          ...Fonts.p2(),
        },
      }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      renderComposer={(composerProps) => (
        <Composer
          {...composerProps}
          textInputStyle={{
            ...Fonts.p2(),
            color: Colors.gray100,
          }}
        />
      )}
      renderSend={(sendProps) => (
        <Send
          {...sendProps}
          textStyle={{
            ...Fonts.p2(),
            color: Colors.primary,
          }}
        />
      )}
    />
  );

  return (
    <Container backgroundColor="white">
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
        renderLeftComponent={() => (
          <View style={styles.row}>
            <Avatar source={user?.image} size={35} />
            <View style={styles.name}>
              <Text color="white" weight="medium">{user.name}</Text>
              <View style={styles.row}>
                <View style={styles.online} />
                <Text color="white">Online now</Text>
              </View>
            </View>
          </View>
        )}
        renderRightComponent={() => (
          <IconButton
            icon="more-vertical"
            color="white"
            size={22}
          />
        )}
      />
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={null}
      />
    </Container>
  );
};

ChatRoom.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ChatRoom;
