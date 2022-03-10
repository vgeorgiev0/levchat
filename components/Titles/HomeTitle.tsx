import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const HomeTitle = (props: any) => {
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
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name='camera' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={logOut}>
          <MaterialCommunityIcons
            name='dots-vertical'
            size={24}
            color='black'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTitle;
