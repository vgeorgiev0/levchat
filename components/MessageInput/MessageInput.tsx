import {
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Message } from '../../src/models';
import styles from './styles';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { ChatRoom } from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector';

// @ts-ignore
const MessageInput = ({ chatRoom }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const sendMessage = async () => {
    // send message
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);

    setMessage('');
    setIsEmojiPickerOpen(false);
  };
  // @ts-ignore

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      // @ts-ignore

      ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPlusClicked = () => {
    console.warn('On plus clicked');
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? '50%' : 'auto' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsEmojiPickerOpen((currentValue) => !currentValue);
            }}
          >
            <FontAwesome5
              name="smile-wink"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            value={message}
            style={styles.input}
            placeholder="Send a message..."
            onChangeText={setMessage}
          />
          <TouchableOpacity>
            <Feather
              name="camera"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <View>
            {message ? (
              <MaterialIcons name="send" size={18} color="white" />
            ) : (
              <Feather name="plus" size={20} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((currentMessage) => currentMessage + emoji);
          }}
          columns={8}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
