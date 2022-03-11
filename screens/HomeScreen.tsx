import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";
import ChatRoomData from "../assets/SignalAssets/dummy-data/ChatRooms";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser } from "../src/models";
// TODO Add a horizontal FlatList for stories
// TODO Add a logout button
type Props = {};

// const logOut = () => {
//   Auth.signOut();
// };

const HomeScreen = (props: Props) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = await (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.id === userData.attributes.sub)
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      // console.log(chatRooms);

      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={(props) => <ChatRoomItem chatRoom={props.item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: { backgroundColor: "white", flex: 1 },
});
