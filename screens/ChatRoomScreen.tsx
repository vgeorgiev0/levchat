import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoom, Message as MessageModel } from "../src/models";
import { useRoute, useNavigation } from "@react-navigation/core";
import Message from "../components/Message";
// import ChatRoomData from "../assets/SignalAssets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";

type Props = {};

const ChatRoomScreen = (props: Props) => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("couldn't find a chat room with this id!");
    } else {
      setChatRoom(chatRoom);
    }
    // const fetchedMessages = await DataStore.query(MessageModel);
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(MessageModel, (message) =>
      message.chatroomID("eq", chatRoom?.id)
    );
    setMessages(fetchedMessages);
  };

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput chatRoomId={chatRoom?.id} />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

// 2.53
