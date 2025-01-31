import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';

const ImageWrapper = ({ uri }) => {
  return (
    <View style={styles.imageWrapper}>
      <Image
        source={
          !!uri ? { uri } : require('../assets/images/placeholderPostImage.jpg')
        }
        style={styles.image}
      />
    </View>
  );
};

export default ImageWrapper;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.gray,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
});
