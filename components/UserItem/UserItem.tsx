import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { Auth } from 'aws-amplify';
import { DataStore } from 'aws-amplify/';
import { ChatRoom, ChatRoomUser } from '../../src/models';
import { User } from '../../src/models';

interface Props {
  user: any;
}

const ChatRoomItem: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    // Create a chat room || // TODO Join an existing chat room

    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));
    // Auth.currentAuthenticatedUser().then(console.log);
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    // console.log(user);

    await DataStore.save(
      new ChatRoomUser({
        // @ts-ignore
        user: dbUser,
        chatRoom: newChatRoom,
      })
    );
    await DataStore.save(
      new ChatRoomUser({
        user,
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
          uri: user.imageUri,
        }}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
