import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem/';

type Props = {
  imageUrl: any;
};

const TabOneScreen = (props: Props) => {
  return (
    <View style={styles.page}>
      <ChatRoomItem />
      <ChatRoomItem />
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', flex: 1 },
});
