import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styles from './styles';

interface Props {
  chatRoom: any;
}

const ChatRoomItem: React.FC<Props> = (props) => {
  const { chatRoom } = props;
  const user = chatRoom.users[1];
  const lastMsg = chatRoom.lastMessage;

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default ChatRoomItem;
