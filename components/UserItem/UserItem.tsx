import { Image, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';

interface Props {
  user: any;
}

const ChatRoomItem: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const onPress = () => {
    // Create a chat room || Join an existing chat room
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
