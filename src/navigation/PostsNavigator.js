import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import MapScreen from '../screens/MapScreen';
import CommentsScreen from '../screens/CommentsScreen';

import { colors } from '../styles/colors';
import PostsScreen from '../screens/PostsScreen';
import { useAuth } from '../context/authContext';

const PostsStack = createStackNavigator();

const PostsNavigator = () => {
  const { ProfileScreen, setProfile } = useAuth();
  return (
    <PostsStack.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTintColor: colors.black,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 17,
          fontWeight: 500,
        },
      }}
    >
      <PostsStack.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: 'Публікації',
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={30}
              color={colors.dark_gray}
              style={{ marginRight: 10 }}
              onPress={() => {
                setProfile((prev) => ({ ...prev, isLoggedIn: false }));
                navigation.navigate('Login');
              }}
            />
          ),
        })}
      />
      <PostsStack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: 'Карта',
        })}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: 'Коментарі',
        })}
      />
    </PostsStack.Navigator>
  );
};

export default PostsNavigator;
