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
import { useRecoilValue } from 'recoil';
import { RED, WHITE } from '../../constants/Colors';
import { authenticatedUserAtom } from '../../state/user';

const HomeTitle = () => {
  const user = useRecoilValue(authenticatedUserAtom);
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
            uri: user?.imageUri,
          }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 40,
          fontSize: 22,
          fontWeight: 'bold',
          color: WHITE,
        }}
      >
        Home
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={navigate}>
          <Feather name="users" size={24} color={WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={logOut}>
          <MaterialCommunityIcons name="logout" size={24} color={RED} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTitle;
