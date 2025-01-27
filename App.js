import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { authStateChanged } from './src/utils/auth';

// import { AuthProvider } from './src/context/authContext';
// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import StackNavigator from './src/navigation/StackNavigator';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/redux/store/store';

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
        {/*<NavigationContainer>
           <AuthProvider>
            <MainNavigator />
          </AuthProvider> 
          </NavigationContainer>*/}
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
