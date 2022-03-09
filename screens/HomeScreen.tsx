import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import ChatRoomData from '../assets/SignalAssets/dummy-data/ChatRooms';
// TODO Add a horizontal FlatList for stories
type Props = {};

const TabOneScreen = (props: Props) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatRoomData}
        renderItem={(props) => <ChatRoomItem chatRoom={props.item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', flex: 1 },
});
