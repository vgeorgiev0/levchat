import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ColorSchemeName,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerTitle: HomeTitle }}
      />
      <Stack.Screen
        name='ChatRoom'
        component={ChatRoomScreen}
        options={({ route }) => ({
          // @ts-ignore
          title: route.params.name,
          headerTitle: ChatTitle,
        })}
        // headerBackVisible: false,
        // headerBackTitleVisible: false,
      />

      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const HomeTitle = (props: any) => {
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
        <TouchableOpacity style={{ marginHorizontal: 5 }}>
          <Feather name='edit-2' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
        {props.children}
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
