import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import StyledButton from './StyledButton';
import { colors } from '../styles/colors';
import DownloadImage from './DownloadImage';

const Camera = ({
  image = null,
  onPressTakePicture,
  showCamera,
  setShowCamera,
}) => {
  // const [showCamera, setShowCamera] = useState(turnOnCamera);
  const [permission, requestPermission] = useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();

  const camera = useRef();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  if (!libraryPermission.granted) {
    requestLibraryPermission();
  }

  const takePhoto = async () => {
    if (!showCamera) {
      return setShowCamera(true);
    }

    if (!camera) return;

    if (!libraryPermission.granted) {
      requestLibraryPermission();
    }
    const image = await camera?.current?.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(image.uri);

    onPressTakePicture(image.uri);

    if (showCamera) {
      setShowCamera((prev) => !prev);
    }
  };

  const downloadPhoto = async (imageURI) => {
    if (showCamera) {
      setShowCamera(false);
    }
    onPressTakePicture(imageURI);
  };

  return (
    <View style={styles.imageWrapper}>
      <View style={styles.imageThumb}>
        {showCamera ? (
          <CameraView ref={camera} style={styles.thumb}>
            <StyledButton
              onPress={takePhoto}
              buttonStyles={styles.cameraWrapper}
            >
              <Ionicons name="camera" size={24} color={colors.dark_gray} />
            </StyledButton>
          </CameraView>
        ) : (
          <View style={styles.thumb}>
            <Image source={{ uri: image }} style={styles.image} />
            <StyledButton
              onPress={takePhoto}
              buttonStyles={styles.cameraWrapperActive}
            >
              <Ionicons name="camera" size={24} color={colors.white} />
            </StyledButton>
          </View>
        )}
      </View>

      <DownloadImage showCamera={showCamera} onPressDownload={downloadPhoto} />
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  thumb: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  cameraWrapperActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.bg_white,
    position: 'absolute',
  },

  imageThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
    backgroundColor: colors.gray,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
