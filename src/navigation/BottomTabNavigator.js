import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import PostsScreen from '../screens/PostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostsScreen from '../screens/CreatePostsScreen';
import { colors } from '../styles/colors';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../utils/auth';

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
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.button, focused && styles.buttonActive]}>
              <Ionicons name="grid-outline" size={20} color={color} />
            </View>
          ),
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={30}
              color={colors.dark_gray}
              style={{ marginRight: 10 }}
              onPress={() => {
                logoutUser(dispatch);
                navigation.navigate('Login');
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.button, focused && styles.buttonActive]}>
              <Ionicons name="add-outline" size={24} color={color} />
            </View>
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={colors.black}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.button, focused && styles.buttonActive]}>
              <Ionicons name="person-outline" size={24} color={color} />
            </View>
          ),
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
