import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import ChatRoomData from '../assets/SignalAssets/dummy-data/Users';
import UserItem from '../components/UserItem';
import { User } from '../src/models';
import { useState, useEffect } from 'react';

type Props = {};

const UsersScreen = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  // useEffect(() => {
  //   // Query users
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
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
