import { Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser, User } from '../../src/models';

interface Props {
  user: any;
}

const ChatRoomItem: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const onPress = async () => {
    // Create a chat room || Join an existing chat room
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    // Connect authenticated user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);

    await DataStore.save(
      new ChatRoomUser({
        // @ts-ignore
        user: dbUser,
        chatRoom: newChatRoom,
      })
    );
    // Connect clicked user with the chat room
    await DataStore.save(
      new ChatRoomUser({
        // @ts-ignore
        user: props.user,
        chatRoom: newChatRoom,
      })
    );
    navigation.navigate('ChatRoom', { id: newChatRoom.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: props.user.imageUri,
        }}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{props.user.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
