import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import React from 'react';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import styles from './styles';

type Props = {};

const MessageInput = (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <FontAwesome5
            name='smile-wink'
            size={24}
            color='#595959'
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder='Send a message...' />
        <TouchableOpacity>
          <Feather
            name='camera'
            size={24}
            color='#595959'
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name='microphone-outline'
            size={24}
            color='#595959'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          <MaterialCommunityIcons
            name='send-circle-outline'
            size={35}
            color='#fff'
          />
        </Text>
      </View>
    </View>
  );
};

export default MessageInput;
