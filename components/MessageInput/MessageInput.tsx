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
import { Audio } from 'expo-av';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AudioPlayer from '../AudioPlayer';

// @ts-ignore
const MessageInput = ({ chatRoom }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundURI, setSoundURI] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();

        if (
          libraryResponse.status !== 'granted' ||
          photoResponse.status !== 'granted'
        ) {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const sendMessage = async () => {
    // send message
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
        status: 'SENT',
      })
    );

    updateLastMessage(newMessage);

    resetFields();
  };

  // @ts-ignore
  const updateLastMessage = async (newMessage) => {
    DataStore.save(
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
    } else if (soundURI) {
      sendAudio();
    } else if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const resetFields = () => {
    setMessage('');
    setIsEmojiPickerOpen(false);
    setImage(null);
    setProgress(0);
    setSoundURI(null);
  };

  // Image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // @ts-ignore

  const progressCallback = (progress) => {
    setProgress(progress.loaded / progress.total);
  };

  const sendImage = async () => {
    if (!image) {
      return;
    }
    const blob = await getBlob(image);
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

  const getBlob = async (uri: string) => {
    const respone = await fetch(uri);
    const blob = await respone.blob();
    return blob;
  };

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      // console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    // console.log('Stopping recording..');
    if (!recording) {
      return;
    }

    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    // console.log('Recording stopped and stored at', uri);
    if (!uri) {
      return;
    }
    setSoundURI(uri);
  }

  const sendAudio = async () => {
    if (!soundURI) {
      return;
    }
    const uriParts = soundURI.split('.');
    const extension = uriParts[uriParts.length - 1];
    const blob = await getBlob(soundURI);
    const { key } = await Storage.put(`${uuidv4()}.${extension}`, blob, {
      progressCallback,
    });

    // send message
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        audio: key,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);

    resetFields();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? '50%' : 'auto' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      {image && (
        <View style={styles.sendContainer}>
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

      {soundURI && <AudioPlayer soundURI={soundURI} />}

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
          <TouchableOpacity
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <MaterialCommunityIcons
              name={recording ? 'microphone' : 'microphone-outline'}
              size={24}
              color={recording ? 'red' : '#595959'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <View>
            {message || image || soundURI ? (
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
