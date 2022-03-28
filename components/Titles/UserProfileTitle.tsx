import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { WHITE } from '../../constants/Colors';

import { authenticatedUserAtom } from '../../state/user';

const UsersTitle = () => {
  const user = useRecoilValue(authenticatedUserAtom);

  const navigation = useNavigation();
  const navigate = () => {
    // @ts-ignore
    navigation.navigate('HomeScreen');
  };

  const { width } = useWindowDimensions();

  if (!user) {
    return;
  }

  const title =
    user?.name.length > 20 ? user.name.substring(0, 20) + '...' : user.name;

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
      <Text
        style={{
          flex: 1,
          fontWeight: 'bold',
          marginLeft: 40,
          color: WHITE,
          fontSize: 16,
          textTransform: 'capitalize',
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={navigate}>
          <MaterialCommunityIcons name="check" size={24} color={WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UsersTitle;
