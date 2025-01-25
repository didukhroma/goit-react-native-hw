import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import ImageWrapper from '../components/ImageWrapper';
import { colors } from '../styles/colors';
import Comment from '../components/Comment';
import { useRoute } from '@react-navigation/native';
import { addCommentToDB, getData } from '../db/db';
import StyledButton from '../components/StyledButton';
import Input from '../components/Input';
import ArrowUp from '../assets/icons/ArrowUp';
import { useState } from 'react';

const INITIAL_COMMENT_STATE = '';

const CommentsScreen = () => {
  const [comment, setComment] = useState(INITIAL_COMMENT_STATE);

  const {
    params: { id },
  } = useRoute();

  const comments = getData(id, 'comments');
  const image = getData(id, 'uri');

  const onPressAddComment = () => {
    addCommentToDB(id, comment);
    setComment(INITIAL_COMMENT_STATE);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageWrapper uri={image} />
        <View style={styles.commentsWrapper}>
          {comments.map((comment, idx) => (
            <Comment key={comment.id} comment={comment} index={idx} />
          ))}
        </View>
        <View>
          <Input
            outerStyles={styles.input}
            placeholder={'Коментувати...'}
            onChange={setComment}
            multiline={true}
            value={comment}
          />
          <StyledButton
            buttonStyles={styles.button}
            onPress={onPressAddComment}
          >
            <ArrowUp />
          </StyledButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    minHeight: Dimensions.get('window').height,
    paddingVertical: 32,
    gap: 32,
  },
  commentsWrapper: {
    gap: 24,
  },
  button: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  input: { borderRadius: 100 },
});
