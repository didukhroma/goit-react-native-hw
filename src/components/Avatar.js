import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import StyledButton from './StyledButton';
import CirclePlusSvg from '../assets/icons/CirclePlusSvg';
import CircleCloseSvg from '../assets/icons/CircleCloseSvg';
import { colors } from '../styles/colors';
import DownloadImage from './DownloadImage';

const Avatar = ({ photo, onPressChangeAvatar }) => {
  return (
    <View style={styles.avatar}>
      {!!photo && (
        <Image source={{ uri: photo }} style={styles.avatarImage}></Image>
      )}

      <DownloadImage
        onPressDownload={onPressChangeAvatar}
        outerContainerStyles={styles.avatarContainer}
        outerButtonStyles={styles.avatarButton}
      >
        {!photo ? <CirclePlusSvg /> : <CircleCloseSvg />}
      </DownloadImage>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  avatarImage: {
    borderRadius: 16,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  avatarContainer: {
    position: 'absolute',
    right: -12,
    bottom: 12,
  },
  avatarButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
});
