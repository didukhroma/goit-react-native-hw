import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
import StyledButton from '../components/StyledButton';
import CirclePlusSvg from '../assets/icons/CirclePlusSvg';
// import { useAuth } from '../context/authContext';
import { colors } from '../styles/colors';
// import { PROFILE_INITIAL_STATE } from '../constants/constants';
import { db } from '../db/db';
import Post from '../components/Post';
import { selectInfo } from '../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUserProfile } from '../utils/auth';
import LogoutSvg from '../assets/icons/LogoutSvg';
import Avatar from '../components/Avatar';
import { deleteImage, uploadImage } from '../utils/firestore';

const ProfileScreen = () => {
  const user = useSelector(selectInfo);
  const dispatch = useDispatch();

  const posts = db;

  const onPressChangeAvatar = async (uri) => {
    console.log(uri);
    await deleteImage(user.uid);
    const newPhotoUrl = await uploadImage(user.uid, uri, 'avatar');
    await updateUserProfile({ photo: newPhotoUrl });

    dispatch(setUserInfo({ ...user, photo: newPhotoUrl }));
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

              <Avatar
                photo={user.photo}
                onPressChangeAvatar={onPressChangeAvatar}
              />
              <StyledButton
                buttonStyles={styles.logoutButton}
                onPress={onPressLogout}
              >
                <LogoutSvg />
                {/* <Ionicons
                  name="log-out-outline"
                  size={24}
                  color={colors.dark_gray}
                /> */}
              </StyledButton>
              {/* TITLE */}
              <Text style={styles.title}>{user.login}</Text>
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
