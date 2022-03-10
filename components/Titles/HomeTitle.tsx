import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const HomeTitle = (props: any) => {
  const navigation = useNavigation();
  const navigate = () => {
    // @ts-ignore
    navigation.navigate('UsersScreen');
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
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/1435517/pexels-photo-1435517.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        }}
        style={{ width: 30, height: 30, borderRadius: 50 }}
      />
      <Text style={{ marginLeft: 40, fontSize: 22, fontWeight: 'bold' }}>
        Home
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={navigate}>
          <Feather name='users' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={logOut}>
          <MaterialCommunityIcons name='logout' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTitle;
