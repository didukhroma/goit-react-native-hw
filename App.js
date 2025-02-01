import 'react-native-gesture-handler';
import React, { use, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { authStateChanged } from './src/utils/auth';

import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <AuthListener />
      </PersistGate>
    </Provider>
  );
}

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
