import { StyleSheet, Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { colors } from '../styles/colors';
import LikesSvg from '../assets/icons/LikesSvg';
import CommentSvg from '../assets/icons/CommentSvg';
import MapSvg from '../assets/icons/MapSvg';
import { useNavigation } from '@react-navigation/native';
import ImageWrapper from './ImageWrapper';

const Post = ({ post }) => {
  const navigation = useNavigation();

  const onPressCommentButton = () =>
    navigation.navigate('Comments', {
      postId: post.id,
    });
  const onPressLocationButton = () =>
    navigation.navigate('Map', { postId: post.id });

  return (
    <View style={styles.container}>
      <ImageWrapper uri={post.image} />

      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoThumb}>
          {/* Comments */}
          <StyledButton
            buttonStyles={styles.button}
            onPress={onPressCommentButton}
          >
            <View style={styles.infoWrapper}>
              <CommentSvg
                color={
                  post.comments.length === 0 ? colors.dark_gray : colors.orange
                }
                filled={post.comments.length !== 0}
              />
              <Text
                style={[
                  styles.comments,
                  post.info === 0 && styles.infoNonActive,
                ]}
              >
                {post.comments.length}
              </Text>
            </View>
          </StyledButton>
          {/* Likes */}
          {post.likes !== undefined && (
            <View style={styles.infoWrapper}>
              <LikesSvg
                color={post.likes === 0 ? colors.dark_gray : colors.orange}
              />
              <Text
                style={[styles.likes, post.info === 0 && styles.infoNonActive]}
              >
                {post.likes}
              </Text>
            </View>
          )}
        </View>
        {/* Location */}
        <StyledButton
          buttonStyles={styles.button}
          onPress={onPressLocationButton}
        >
          <View style={styles.infoWrapper}>
            <MapSvg color={colors.dark_gray} />
            <Text
              style={[styles.comments, post.info === 0 && styles.infoNonActive]}
            >
              {post.location}
            </Text>
          </View>
        </StyledButton>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 8,
    paddingVertical: 16,
  },

  title: {
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: 500,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoThumb: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 24,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  info: {
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
  },
  infoNonActive: {
    color: colors.dark_gray,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
