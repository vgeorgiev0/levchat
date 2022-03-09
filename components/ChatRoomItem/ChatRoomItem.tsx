import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styles from './styles';

type Props = {};

const ChatRoomItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        }}
      />
      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>4</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>Elon Musk</Text>
          <Text style={styles.text}>11:11 AM</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          Hola Hola coca cola
        </Text>
      </View>
    </View>
  );
};

export default ChatRoomItem;
