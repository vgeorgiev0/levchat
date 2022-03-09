import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Message from '../components/Message';
import ChatRoomData from '../assets/SignalAssets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';

type Props = {};

const ChatRoomScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={ChatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
