import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatRoomData from '../assets/SignalAssets/dummy-data/Users';
import UserItem from '../components/UserItem';

type Props = {};

const UsersScreen = (props: Props) => {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatRoomData}
        renderItem={(props) => <UserItem user={props.item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', flex: 1 },
});
