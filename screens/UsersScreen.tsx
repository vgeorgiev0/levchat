import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import UserItem from "../components/UserItem";
import { User } from "../src/models";

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
  //     console.log(users);
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
  page: { backgroundColor: "white", flex: 1 },
});
