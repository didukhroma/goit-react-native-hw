import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../styles/colors';
import Post from '../components/Post';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';
import { selectPosts } from '../redux/reducers/postsSlice';

import { fetchPosts } from '../redux/reducers/operation';

const PostsScreen = () => {
  const user = useSelector(selectInfo);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const prepareData = (data) => {
    if (!data || data.length === 0) return [];
    //data without likes
    return data.map((el) => {
      const { likes, ...data } = el;
      return data;
    });
  };

  const preparedPosts = prepareData(posts);

  useEffect(() => {
    dispatch(fetchPosts(user.uid));
  }, [dispatch]);

  return (
    <ScrollView>
      {user && (
        <View style={styles.wrapper}>
          <View style={styles.profile}>
            <Image
              source={
                !!user.photo
                  ? { uri: user.photo }
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
            {preparedPosts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </View>
        </View>
      )}
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
    textTransform: 'capitalize',
  },
  email: {
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    fontWeight: 400,
  },
});
