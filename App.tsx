import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
// LogBox.ignoreLogs(['Setting a timer']);
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, Auth, DataStore, Hub } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Message } from './src/models';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Create a listener
    const listener = Hub.listen('datastore', async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === 'networkStatus') {
        console.log(`User has a network connection: ${data.active}`);
      }
      if (event === 'outboxMutationProcessed') {
        if (data.model === Message) {
          // Set the message status to delivered
          DataStore.save(
            Message.copyOf(data.element, (updated) => {
              updated.status = 'DELIVERED';
            })
          );
        }
      }
    });
    return () => listener();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </RecoilRoot>
    );
  }
}

export default withAuthenticator(App);
