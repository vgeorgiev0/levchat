import {
  TouchableOpacity,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Message } from '../../src/models';
import styles from './styles';
import { useState } from 'react';
import { Auth, Storage } from 'aws-amplify';
import { ChatRoom } from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore
const MessageInput = ({ chatRoom }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async () => {
      if (Platform.OS !== 'web') {
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        if (photoResponse.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
  }, []);

  const sendMessage = async () => {
    // send message
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);

    resetFields();
  };
  // @ts-ignore

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      // @ts-ignore

      ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPlusClicked = () => {
    console.warn('On plus clicked');
  };

  const onPress = () => {
    if (image) {
      sendImage();
      setImage(null);
    } else if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const resetFields = () => {
    setImage(null);
    setMessage('');
    setIsEmojiPickerOpen(false);
    setProgress(0);
  };

  // Image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      //@ts-ignore
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const progressCallback = (progress: any) => {
    setProgress(progress.loaded / progress.total);
  };

  const sendImage = async () => {
    if (!image) {
      return;
    }
    const blob = await getImageBlob();
    const { key } = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback,
    });

    // send message
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        image: key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);

    resetFields();
  };

  const getImageBlob = async () => {
    if (!image) {
      return null;
    }
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? '50%' : 'auto' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      {image && (
        <View style={styles.sentImageContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <View style={styles.progressContainer}>
            <View
              style={[styles.progress, { width: `${progress * 100}%` }]}
            ></View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setImage(null);
            }}
          >
            <AntDesign
              name="close"
              size={24}
              color={'black'}
              style={{ margin: 5 }}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsEmojiPickerOpen((currentValue) => !currentValue);
            }}
          >
            <FontAwesome5
              name="smile-wink"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            value={message}
            style={styles.input}
            placeholder="Send a message..."
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={pickImage}>
            <Feather
              name="image"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Feather
              name="camera"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <View>
            {message || image ? (
              <MaterialIcons name="send" size={18} color="white" />
            ) : (
              <Feather name="plus" size={20} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((currentMessage) => currentMessage + emoji);
          }}
          columns={8}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
