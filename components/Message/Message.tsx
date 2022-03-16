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
import { Auth, Storage } from 'aws-amplify';
// @ts-ignore
import { S3Image } from 'aws-amplify-react-native';
import AudioPlayer from '../AudioPlayer';
// TODO ? Add lightbox  to the images.

// @ts-ignore
const Message = ({ message }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const [soundURI, setSoundURI] = useState<any>(null);

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    if (message.audio) {
      Storage.get(message.audio).then(setSoundURI);
    }
  }, [message]);

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
        { width: soundURI ? '75%' : 'auto' },
      ]}
    >
      {message.image && (
        <View style={{ marginBottom: message.content ? 10 : 0 }}>
          <S3Image
            imgKey={message.image}
            style={{ width: width * 0.7, aspectRatio: 4 / 3 }}
            resizeMode="contain"
          />
        </View>
      )}
      {soundURI && <AudioPlayer soundURI={soundURI} />}
      {!!message.content && (
        <Text style={{ color: isMe ? 'black' : 'white' }}>
          {message.content}
        </Text>
      )}
    </View>
  );
};
export default Message;
