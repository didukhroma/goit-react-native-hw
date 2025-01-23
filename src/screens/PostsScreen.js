import { Image, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/authContext';
import { colors } from '../styles/colors';

const PostsScreen = () => {
  const { profile } = useAuth();
  return (
    <View style={styles.wrapper}>
      <View style={styles.profile}>
        <Image
          source={
            profile.avatar
              ? { uri: profile.avatar }
              : require('../assets/images/placeholderImage.jpg')
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.login}>{profile.login}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 32,
  },
  image: { width: 60, height: 60, borderRadius: 16 },
  login: {
    color: colors.black,
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    fontWeight: 700,
  },
  email: {
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    fontWeight: 400,
  },
});
