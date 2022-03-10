import React from 'react';
import { RecoilRoot } from 'recoil';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Setting a timer',
  'Cannot update a component',
  'Possible Unhandled Promise Rejection',
  "Can't perform a React state update",
]);
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // Auth.currentAuthenticatedUser().then(console.log);

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
