import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/authContext';

import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import MapScreen from '../screens/MapScreen';
import CommentsScreen from '../screens/CommentsScreen';
import { colors } from '../styles/colors';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  const {
    profile: { isLoggedIn },
  } = useAuth();
  return (
    <MainStack.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'}
      screenOptions={{ headerShown: false, backgroundColor: colors.white }}
    >
      <MainStack.Screen name="Registration" component={RegistrationScreen} />
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Карта',
          headerShown: true,
          headerTintColor: colors.black,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            fontWeight: 500,
          },
        }}
      />
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          headerTintColor: colors.black,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            fontWeight: 500,
          },
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
