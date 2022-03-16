import { Feather } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const AudioPlayer = ({ soundURI }: any) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [paused, setPause] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    loadSound();
    () => {
      // unload sound
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [soundURI]);

  const loadSound = async () => {
    if (!soundURI) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: soundURI },
      {},
      onPlaybackStatusUpdate
    );
    setSound(sound);
  };

  // Audio
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }
    setAudioProgress(status.positionMillis / (status.durationMillis || 1));
    setPause(!status.isPlaying);
    setAudioDuration(status.durationMillis || 0);
  };

  const playPauseSound = async () => {
    if (!sound) {
      return;
    }
    if (paused) {
      await sound.playFromPositionAsync(0);
    } else {
      await sound.pauseAsync();
    }
  };

  const getDuration = () => {
    const minutes = Math.floor(audioDuration / (60 * 1000));
    const seconds = Math.floor((audioDuration % (60 * 1000)) / 1000);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={[styles.sendContainer, { padding: 10, alignItems: 'center' }]}>
      <TouchableOpacity onPress={playPauseSound}>
        <Feather name={paused ? 'play' : 'pause'} size={24} color="grey" />
      </TouchableOpacity>
      <View style={styles.audioProgressBG}>
        <TouchableOpacity
          style={[styles.audioProgressFG, { left: `${audioProgress * 100}%` }]}
        />
      </View>
      <Text>{getDuration()}</Text>
    </View>
  );
};

export default AudioPlayer;
