import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import StyledButton from '../components/StyledButton';
import CirclePlusSvg from '../assets/icons/CirclePlusSvg';
import { useAuth } from '../context/authContext';
import { colors } from '../styles/colors';
import { PROFILE_INITIAL_STATE } from '../constants/constants';
import { db } from '../db/db';
import Post from '../components/Post';
import { selectInfo } from '../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../utils/auth';

const ProfileScreen = () => {
  const user = useSelector(selectInfo);
  const dispatch = useDispatch();
  const { profile, setProfile } = useAuth();
  const navigation = useNavigation();

  const posts = db;

  const onPressChangeAvatar = () => {
    console.log('change avatar');
  };

  const onPressLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <ScrollView>
      {user && (
        <View style={styles.container}>
          <ImageBackground
            source={require('../../src/assets/images/background.png')}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.wrapper}>
              {/* AVATAR */}
              <View style={styles.avatar}>
                <Image
                  source={
                    profile.avatar
                      ? { uri: profile.avatar }
                      : require('../assets/images/placeholderImage.jpg')
                  }
                  style={{ borderRadius: 16 }}
                ></Image>
                <StyledButton
                  buttonStyles={styles.avatarButton}
                  onPress={onPressChangeAvatar}
                >
                  <CirclePlusSvg />
                </StyledButton>
              </View>
              <StyledButton
                buttonStyles={styles.logoutButton}
                onPress={onPressLogout}
              >
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={colors.dark_gray}
                />
              </StyledButton>
              {/* TITLE */}
              <Text style={styles.title}>{profile.login}</Text>
              <View>
                {posts.map((post) => (
                  <Post post={post} key={post.id} />
                ))}
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 147,
  },
  // WRAPPER
  wrapper: {
    paddingTop: 92,
    paddingBottom: 79,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  // AVATAR
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  avatarButton: {
    position: 'absolute',
    right: -12,
    bottom: 12,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  // TITLE
  title: {
    marginBottom: 33,
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 16,

    backgroundColor: 'transparent',
  },
});
