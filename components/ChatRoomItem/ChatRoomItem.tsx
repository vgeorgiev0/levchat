import { Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';

interface Props {
  chatRoom: any;
}

const ChatRoomItem: React.FC<Props> = (props) => {
  const { chatRoom } = props;
  const user = chatRoom.users[1];
  const lastMsg = chatRoom.lastMessage;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: user.imageUri,
        }}
      />

      {chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{chatRoom.newMessages}</Text>
        </View>
      )}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{lastMsg.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMsg.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRoomItem;
