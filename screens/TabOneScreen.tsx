import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/';

import ChatRoomData from '../assets/SignalAssets/dummy-data/ChatRooms';

const chatRoom1 = ChatRoomData[0];
const chatRoom2 = ChatRoomData[2];

type Props = {};

const TabOneScreen = (props: Props) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatRoomData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', flex: 1 },
});
