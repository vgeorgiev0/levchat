import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { User } from '../../src/models';

const UsersTitle = ({ id }: any) => {
  const [userName, setUserName] = useState<string>('');

  const navigation = useNavigation();
  const navigate = () => {
    // @ts-ignore
    navigation.navigate('HomeScreen');
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fetchedUser = await (
        await DataStore.query(User)
      ).filter((currentUser) => currentUser.id === authUser.attributes.sub);
      setUserName(fetchedUser[0].name);
    };
    fetchUsers();
  }, []);

  const title =
    userName.length > 20 ? userName.substring(0, 20) + '...' : userName;

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
          uri: 'https://images.pexels.com/photos/1435517/pexels-photo-1435517.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }}
        style={{ marginLeft: -30, width: 30, height: 30, borderRadius: 50 }}
      />
      <Text style={{ flex: 1, fontWeight: 'bold', marginLeft: 10 }}>
        {title}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={navigate}>
          <MaterialCommunityIcons name="check" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UsersTitle;
