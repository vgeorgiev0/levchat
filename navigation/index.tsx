import React, { useEffect, useState, useRef } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import HomeTitle from '../components/Titles/HomeTitle';
import ChatTitle from '../components/Titles/ChatTitle';
import UserProfileTitle from '../components/Titles/UserProfileTitle';

// import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import UsersScreen from '../screens/UsersScreen';
import UsersTitle from '../components/Titles/UsersTitle';
import UserProfileScreen from '../screens/UserProfileScreen';
import { BLUE, LIGHTBLUE, WHITE } from '../constants/Colors';
import { useRecoilState } from 'recoil';
import { authenticatedUserAtom } from '../state/user';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../src/models';

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
  const [user, setUser] = useRecoilState(authenticatedUserAtom);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const fetchedUser = (await DataStore.query(User)).filter(
        (currentUser) => currentUser.id === authUser.attributes.sub
      );
      setUser(fetchedUser[0]);
    };
    fetchUser();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: HomeTitle,
          headerStyle: { backgroundColor: BLUE },
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={({ route, navigation }) => ({
          // @ts-ignore
          // title: route.params.name,
          headerTitle: () => <UserProfileTitle />,
          headerBackTitleVisibleL: false,
          headerStyle: { backgroundColor: BLUE },
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route, navigation }) => ({
          // @ts-ignore
          // title: route.params.name,
          headerTitle: () => <ChatTitle id={route.params?.id} />,
          headerBackTitleVisibleL: false,
          headerStyle: { backgroundColor: BLUE },
        })}
        // headerBackVisible: false,
        // headerBackTitleVisible: false,
      />
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{
          headerTitle: UsersTitle,
          headerStyle: { backgroundColor: BLUE },
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
