import { Text, View } from 'react-native';
import React from 'react';
import styles from './styles';

const myID = 'u1';

const Message = ({ message }: any) => {
  const isMe = message.user.id === myID;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.containerRight : styles.containerLeft,
      ]}
    >
      <Text style={{ color: isMe ? 'black' : '#fff' }}>{message.content}</Text>
    </View>
  );
};

export default Message;
