import { Auth, DataStore } from 'aws-amplify';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';
import { WHITE } from '../../constants/Colors';
import { ChatRoomUser, User } from '../../src/models';

const ChatTitle = ({ id }: { id: string; children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === id)
        .map((chatRoomUser) => chatRoomUser.user);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };
    fetchUsers();
  }, []);
  const { width } = useWindowDimensions();

  const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    }
    const lastOnlineDiffMS = moment().diff(moment(user?.lastOnlineAt));

    if (lastOnlineDiffMS < 3 * 60 * 1000) {
      // Less than three minutes
      return 'Online';
    } else {
      return `Last seen online ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

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
        style={{
          marginLeft: -30,
          width: 30,
          height: 30,
          borderRadius: 50,
          backgroundColor: WHITE,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 10,
            color: WHITE,
            fontSize: 16,
            textTransform: 'capitalize',
          }}
        >
          {user
            ? user?.name.length > 20
              ? user?.name.substring(0, 20) + '...'
              : user?.name
            : 'Unknown'}
        </Text>
        <Text style={{ color: WHITE, paddingLeft: 10, fontSize: 13 }}>
          {getLastOnlineText()}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {/* <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name="camera" size={24} color={WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name="edit-2" size={24} color={RED} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ChatTitle;
