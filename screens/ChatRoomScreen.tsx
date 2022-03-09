import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Message from '../components/Message';
import ChatRoomData from '../assets/SignalAssets/dummy-data/Chats';

type Props = {};

const ChatRoomScreen = (props: Props) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
    </View>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
