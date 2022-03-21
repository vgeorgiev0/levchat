import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LIGHTBLUE, WHITE } from '../constants/Colors';

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit your profile</Text>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHTBLUE,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    paddingVertical: 20,
    textAlign: 'center',
    color: WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {},
  password: {},
});
