import { Feather } from '@expo/vector-icons';
import {
  Image,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';

const ChatTitle = (props: any) => {
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
      <Text style={{ flex: 1, fontWeight: 'bold', marginLeft: 10 }}>
        Chat Room
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name='camera' size={24} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name='edit-2' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatTitle;
