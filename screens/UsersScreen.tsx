import React, { useState, useEffect } from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  SafeAreaView,
} from 'react-native';
import UserItem from '../components/UserItem';
import NewGroupButton from '../components/NewGroupButton';
import { useNavigation } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, User, ChatRoomUser } from '../src/models';
import { BLACK, LIGHTBLUE, RED } from '../constants/Colors';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  // useEffect(() => {
  //   // query users
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, [])

  const addUserToChatRoom = async (user, chatRoom) => {
    DataStore.save(new ChatRoomUser({ user, chatRoom }));
  };

  const createChatRoom = async (users) => {
    // TODO if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom with these users.

    // connect authenticated user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);

    // Create a chat room
    const newChatRoomData = {
      newMessages: 0,
      admin: dbUser,
    };
    if (users.length > 1) {
      newChatRoomData.name = 'New group';
      newChatRoomData.imageUri =
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg';
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    if (dbUser) {
      await addUserToChatRoom(dbUser, newChatRoom);
    }

    // connect users user with the chat room
    await Promise.all(
      users.map((user) => addUserToChatRoom(user, newChatRoom))
    );

    navigation.navigate('ChatRoom', { id: newChatRoom.id });
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };

  const onUserPress = async (user) => {
    if (isNewGroup) {
      if (isUserSelected(user)) {
        // remove it from selected
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await createChatRoom([user]);
    }
  };

  const saveGroup = async () => {
    await createChatRoom(selectedUsers);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPress={() => onUserPress(item)}
            isSelected={isNewGroup ? isUserSelected(item) : undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
        )}
      />

      {isNewGroup && (
        <Pressable
          style={[styles.button, { backgroundColor: RED }]}
          onPress={saveGroup}
          disabled={!selectedUsers.length}
        >
          <Text style={styles.buttonText}>
            Save group ({selectedUsers.length})
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: LIGHTBLUE,
    flex: 1,
  },
  button: {
    backgroundColor: RED,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
