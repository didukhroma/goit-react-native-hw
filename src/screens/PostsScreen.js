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
import { useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';

const PostsScreen = () => {
  const user = useSelector(selectInfo);

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
              !!user.profilePhoto
                ? { uri: user.profilePhoto }
                : require('../assets/images/placeholderImage.jpg')
            }
            style={styles.image}
          />
          <View>
            <Text style={styles.login}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>
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
