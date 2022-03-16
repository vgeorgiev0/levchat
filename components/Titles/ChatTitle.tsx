import { Feather } from '@expo/vector-icons';
import { Auth, DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
  Image,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { ChatRoomUser, User } from '../../src/models';

const ChatTitle = ({ id, children }: { id: string; children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };
    fetchUsers();
  }, []);
  const { width } = useWindowDimensions();
  // console.log(user);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 30,
        paddingRight: 50,
        padding: 10,
        alignItems: 'center',
      }}
    >
      <Image
        source={{
          uri: user?.imageUri,
        }}
        style={{ marginLeft: -30, width: 30, height: 30, borderRadius: 50 }}
      />
      <Text style={{ flex: 1, fontWeight: 'bold', marginLeft: 10 }}>
        {user
          ? user?.name.length > 20
            ? user?.name.substring(0, 20) + '...'
            : user?.name
          : 'Unknown'}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name="edit-2" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatTitle;
