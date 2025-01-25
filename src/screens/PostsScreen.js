import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../context/authContext';
import { colors } from '../styles/colors';
import Post from '../components/Post';
import { db } from '../db/db';
import { useEffect, useState } from 'react';

const PostsScreen = () => {
  const { profile } = useAuth();

  const [posts, setPosts] = useState([]);

  const prepareData = (data) => {
    //data without likes
    return data.map((el) => {
      const { likes, ...data } = el;
      return data;
    });
  };

  useEffect(() => {
    setPosts(prepareData(db));
  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.profile}>
          <Image
            source={
              !!profile.avatar
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
        <View style={styles.postsWrapper}>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: Dimensions.get('window').height,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    paddingTop: 32,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
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
