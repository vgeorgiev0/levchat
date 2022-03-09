import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  containerLeft: {
    backgroundColor: '#3777f0',
    marginLeft: 10,
    marginRight: 'auto',
  },
  containerRight: {
    backgroundColor: 'lightgrey',
    marginLeft: 'auto',
    marginRight: 10,
  },
});
