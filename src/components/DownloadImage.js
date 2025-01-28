import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View } from 'react-native';
import StyledButton from './StyledButton';
import { colors } from '../styles/colors';

const DownloadImage = ({
  showCamera,
  onPressDownload,
  children,
  outerContainerStyles,
  outerButtonStyles,
}) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      onPressDownload(uri);
    }
  };
  return (
    <View style={[styles.container, outerContainerStyles]}>
      <StyledButton onPress={pickImage} buttonStyles={outerButtonStyles}>
        {children}
        {/* <Text style={styles.imageText}>
          {showCamera ? 'Завантажте фото' : 'Редагувати фото'}
        </Text> */}
      </StyledButton>
    </View>
  );
};

export default DownloadImage;

const styles = StyleSheet.create({
  downloadButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  imageText: {
    color: colors.dark_gray,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },
});
