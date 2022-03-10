import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/core';
import Message from '../components/Message';
import ChatRoomData from '../assets/SignalAssets/dummy-data/Chats';
import MessageInput from '../components/MessageInput';

type Props = {};

const ChatRoomScreen = (props: Props) => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  // console.log(route.params.id);
  navigation.setOptions({
    // @ts-ignore
    title: route.params.id,
  });
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
