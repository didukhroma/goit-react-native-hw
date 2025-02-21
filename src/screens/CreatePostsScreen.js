import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Input from '../components/Input';
import { colors } from '../styles/colors';
import StyledButton from '../components/StyledButton';
import { POST_INITIAL_STATE } from '../constants/constants';
import { useState } from 'react';
import Camera from '../components/Camera';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';
import DownloadImage from '../components/DownloadImage';

import { useDispatch, useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';
import { addPost } from '../redux/reducers/operation';
import MapSvg from '../assets/icons/MapSvg';
import TrashSvg from '../assets/icons/TrashSvg';

const CreatePostsScreen = () => {
  const [post, setPost] = useState(POST_INITIAL_STATE);
  const [showCamera, setShowCamera] = useState(true);
  const user = useSelector(selectInfo);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onChangePostData = (key, value) => {
    if (key === 'image') {
      setPost((prev) => ({ ...prev, [key]: value, isEmptyPost: false }));

      return;
    }

    setPost((prev) => ({ ...prev, [key]: value }));
  };

  const checkForm = () => {
    if (post.image && post.title && post.location) {
      setPost((prev) => ({ ...prev, isEmptyPost: false }));
    }
  };

  const clearAllData = () => {
    setPost(POST_INITIAL_STATE);
    setShowCamera(true);
  };

  const onPressPublicationButton = async () => {
    if (post.isEmptyPost) return;

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const data = {
      ...post,
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      userId: user.uid,
    };

    dispatch(addPost(data));

    clearAllData();
    navigation.navigate('Posts');
  };

  const takePhoto = (imageURI) => {
    if (showCamera) {
      setShowCamera(false);
    }
    onChangePostData('image', imageURI);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.thumb}>
              <View style={styles.imageWrapper}>
                <Camera
                  onPressTakePicture={takePhoto}
                  image={post.image}
                  showCamera={showCamera}
                  // setShowCamera={setShowCamera}
                />
                <DownloadImage
                  onPressDownload={takePhoto}
                  outerButtonStyles={styles.downloadButton}
                >
                  <Text style={styles.imageText}>
                    {showCamera ? 'Завантажте фото' : 'Редагувати фото'}
                  </Text>
                </DownloadImage>
              </View>

              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Назва..."
                  onChange={(text) => onChangePostData('title', text)}
                  outerStyles={styles.input}
                  value={post.title}
                  onBlurInput={checkForm}
                ></Input>
                <Input
                  placeholder="Місцевість..."
                  onChange={(text) => onChangePostData('location', text)}
                  outerStyles={[styles.input, styles.inputLocation]}
                  value={post.location}
                  onBlurInput={checkForm}
                  icon={<MapSvg color={colors.dark_gray} />}
                ></Input>
              </View>
              <StyledButton
                onPress={onPressPublicationButton}
                buttonStyles={[
                  styles.publicationButton,
                  !post.isEmptyPost && styles.publicationButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.publicationText,
                    !post.isEmptyPost && styles.publicationTextActive,
                  ]}
                >
                  Опубліковати
                </Text>
              </StyledButton>
            </View>
            <StyledButton
              onPress={clearAllData}
              buttonStyles={styles.trashButton}
            >
              <TrashSvg />
            </StyledButton>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    minHeight: Dimensions.get('window').height,
  },
  thumb: {
    gap: 32,
    marginBottom: 32,
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
  imageText: {
    color: colors.dark_gray,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },

  inputWrapper: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  inputLocation: {
    paddingLeft: 28,
  },
  publicationText: {
    color: colors.dark_gray,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
  },
  publicationButton: {
    backgroundColor: colors.light_gray,
  },
  publicationButtonActive: {
    backgroundColor: colors.orange,
  },
  publicationTextActive: {
    color: colors.white,
  },
  trashButton: {
    backgroundColor: colors.light_gray,
    paddingHorizontal: 23,
    paddingVertical: 8,
    width: 70,
    alignSelf: 'center',
  },
  downloadButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
});
