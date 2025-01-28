import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const StyledImageBackground = ({ source, children, outerStyles }) => {
  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      style={[styles.image, outerStyles]}
    >
      {children}
    </ImageBackground>
  );
};

export default StyledImageBackground;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
