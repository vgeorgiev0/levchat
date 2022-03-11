import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoomUser, User } from "../../src/models";
import { useNavigation } from "@react-navigation/core";
import { Auth } from "aws-amplify";

interface Props {
  chatRoom: any;
}

const ChatRoomItem: React.FC<Props> = (props) => {
  // const [users, setUsers] = useState<User[]>([]); // All users in this chatroom
  const [user, setUser] = useState<User | null>(null); // The displayed user
  const { chatRoom } = props;
  const lastMsg = chatRoom.lastMessage;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);
      // setUsers(fetchedUsers);
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };
    fetchUsers();
  }, []);

  const onPress = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
    });
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: user.imageUri,
        }}
      />

      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{chatRoom.newMessages}</Text>
        </View>
      )}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{lastMsg?.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMsg?.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
