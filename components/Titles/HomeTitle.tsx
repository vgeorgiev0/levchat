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

const HomeTitle = (props: any) => {
  const [imageUri, setUserImageUri] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fetchedUser = await (
        await DataStore.query(User)
      ).filter((currentUser) => currentUser.id === authUser.attributes.sub);
      // @ts-ignore
      setUserImageUri(fetchedUser[0].imageUri || null);
    };
    fetchUsers();
  }, []);
  const navigation = useNavigation();
  const navigate = () => {
    // @ts-ignore
    navigation.navigate('UsersScreen');
  };
  const navigateToProfileScreen = () => {
    navigation.navigate('UserProfile');
  };
  const logOut = () => {
    Auth.signOut();
  };

  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 20,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={navigateToProfileScreen}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
      </TouchableOpacity>
      <Text style={{ marginLeft: 40, fontSize: 22, fontWeight: 'bold' }}>
        Home
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={navigate}>
          <Feather name="users" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={logOut}>
          <MaterialCommunityIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTitle;
