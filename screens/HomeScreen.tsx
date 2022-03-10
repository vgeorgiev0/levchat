import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import ChatRoomData from '../assets/SignalAssets/dummy-data/ChatRooms';
// import { Auth } from 'aws-amplify';

// TODO Add a horizontal FlatList for stories
// TODO Add a logout button
type Props = {};

// const logOut = () => {
//   Auth.signOut();
// };

const HomeScreen = (props: Props) => {
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

export default HomeScreen;

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', flex: 1 },
});
