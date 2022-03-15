import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../src/models';
import styles from './styles';
import { Auth } from 'aws-amplify';
// @ts-ignore
import { S3Image } from 'aws-amplify-react-native';

// @ts-ignore
const Message = ({ message }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return;
      }
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.containerRight : styles.containerLeft,
      ]}
    >
      {message.image && (
        <S3Image
          imgKey={message.image}
          style={{ width: width * 0.7, aspectRatio: 4 / 3, marginBottom: 10 }}
          resizeMode="contain"
        />
      )}
      <Text style={{ color: isMe ? 'black' : 'white' }}>{message.content}</Text>
    </View>
  );
};
export default Message;
