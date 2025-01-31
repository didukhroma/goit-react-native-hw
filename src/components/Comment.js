import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { normalizeDataFormat } from '../helpers/normalizeDataFormat';

const Comment = ({ comment, index }) => {
  const normalizedData = normalizeDataFormat(comment.timestamp);

  return (
    <View
      style={[styles.container, index % 2 !== 0 && styles.containerToRight]}
    >
      <View style={styles.avatarWrapper}>
        <Image
          source={
            !!comment.avatar
              ? { uri: comment.avatar }
              : require('../assets/images/placeholderImage.jpg')
          }
          style={styles.image}
        />
      </View>
      <View style={[styles.info, index % 2 !== 0 && styles.infoToRight]}>
        <Text style={styles.text}>{comment.text}</Text>
        <Text style={[styles.data, index % 2 !== 0 && styles.dataToLeft]}>
          {normalizedData}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  containerToRight: {
    flexDirection: 'row-reverse',
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.gray,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: '100%',
    borderRadius: 14,
  },
  info: {
    flex: 1,
    gap: 8,
    padding: 16,
    backgroundColor: colors.bg_dark,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  infoToRight: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
  },

  text: {
    fontFamily: 'Roboto-Regular',
    color: colors.black,
    fontSize: 13,
    lineHeight: 18,
  },
  data: {
    fontFamily: 'Roboto-Regular',
    color: colors.dark_gray,
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
  },
  dataToLeft: {
    textAlign: 'left',
  },
});
