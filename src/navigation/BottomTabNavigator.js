import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostsScreen from '../screens/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostsScreen from '../screens/CreatePostsScreen';
import { colors } from '../styles/colors';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../utils/auth';
import LogoutSvg from '../assets/icons/LogoutSvg';
import StyledButton from '../components/StyledButton';
import ProfileSvg from '../assets/icons/ProfileSvg';
import ArrowLeftSvg from '../assets/icons/ArrowLeftSvg';
import PostsSvg from '../assets/icons/PostsSvg';
import AddPostSvg from '../assets/icons/AddPostSvg';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        animation: 'fade',
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          height: 88,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          top: 20,
        },
        headerTintColor: colors.black,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          fontWeight: 500,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: 'Публікації',
          tabBarIcon: () => (
            <PostsSvg fill={colors.white} stroke={colors.black} />
          ),
          headerRight: () => (
            <StyledButton
              buttonStyles={{ marginRight: 16, backgroundColor: 'transparent' }}
              onPress={() => {
                logoutUser(dispatch);
              }}
            >
              <LogoutSvg />
            </StyledButton>
          ),
        })}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => <AddPostSvg />,
          headerLeft: () => (
            <StyledButton
              onPress={() => navigation.goBack()}
              buttonStyles={{ marginLeft: 16, backgroundColor: 'transparent' }}
            >
              <ArrowLeftSvg />
            </StyledButton>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: () => <ProfileSvg color={colors.black} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.orange,
  },
});
