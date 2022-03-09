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
import styles from './styles';
import { useState } from 'react';

type Props = {};

const MessageInput = (props: Props) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    console.log(`Sending: ${message}`);
    setMessage('');
  };
  const onPlusClicked = () => {
    console.log('Plus clicked');
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
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <FontAwesome5
            name='smile-wink'
            size={24}
            color='#595959'
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          value={message}
          style={styles.input}
          placeholder='Send a message...'
          onChangeText={setMessage}
        />
        <TouchableOpacity>
          <Feather
            name='camera'
            size={24}
            color='#595959'
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name='microphone-outline'
            size={24}
            color='#595959'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <View>
          {message ? (
            <MaterialIcons name='send' size={18} color='white' />
          ) : (
            <Feather name='plus' size={20} color='white' />
          )}
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
