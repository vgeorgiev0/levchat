import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const UsersTitle = (props: any) => {
  const navigation = useNavigation();
  const navigate = () => {
    // @ts-ignore
    navigation.navigate('HomeScreen');
  };

  const { width } = useWindowDimensions();
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
      <Text
        style={{ flex: 1, fontSize: 22, fontWeight: 'bold', marginLeft: 90 }}
      >
        Users
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name='camera' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={navigate}>
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

export default UsersTitle;
