import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/authContext';

import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';

const MainStack = createStackNavigator();

const AuthNavigator = () => {
  const {
    profile: { isLoggedIn },
  } = useAuth();
  return (
    <MainStack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
      <MainStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export default AuthNavigator;
