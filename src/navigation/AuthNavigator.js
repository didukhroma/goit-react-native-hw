import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/authContext';

import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import { colors } from '../styles/colors';

const MainStack = createStackNavigator();

const AuthNavigator = () => {
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
    </MainStack.Navigator>
  );
};

export default AuthNavigator;
