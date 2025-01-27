import { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Input from '../components/Input';
import StyledButton from '../components/StyledButton';

import { colors } from '../styles/colors';
import { REGISTER_INITIAL_STATE } from '../constants/constants';

import CirclePlusSvg from '../assets/icons/CirclePlusSvg';
import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../context/authContext';

export default function RegistrationScreen() {
  const [user, setUser] = useState(REGISTER_INITIAL_STATE);
  const navigation = useNavigation();
  // const { profile, setProfile } = useAuth();

  const onChangeUserData = (key, value) => {
    if (key === 'isPasswordHidden')
      return setUser((prev) => ({ ...prev, [key]: !user.isPasswordHidden }));

    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const onPressRegistration = () => {
    // setProfile({ ...profile, ...user });
    // setUser(REGISTER_INITIAL_STATE);
    // navigation.navigate('Home');
    console.log('press registration');
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  const onPressChangeAvatar = () => {
    console.log('Change avatar');
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <ImageBackground
              source={require('../../src/assets/images/background.png')}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.wrapper}>
                {/* AVATAR */}
                <View style={styles.avatar}>
                  <StyledButton
                    buttonStyles={styles.avatarButton}
                    onPress={onPressChangeAvatar}
                  >
                    <CirclePlusSvg />
                  </StyledButton>
                </View>
                {/* TITLE */}
                <Text style={styles.title}>Реєстрація</Text>
                {/* INPUTS */}
                <View style={styles.formFields}>
                  <Input
                    placeholder="Логін"
                    onChange={(text) => onChangeUserData('login', text)}
                    value={user.login}
                  />
                  <Input
                    placeholder="Адреса електронної пошти"
                    onChange={(text) => onChangeUserData('email', text)}
                    value={user.email}
                  />
                  <View style={styles.passwordField}>
                    <Input
                      placeholder="Пароль"
                      onChange={(text) => onChangeUserData('password', text)}
                      value={user.password}
                      secure={user.isPasswordHidden}
                      outerStyles={styles.passwordInput}
                    />
                    <StyledButton
                      onPress={() => onChangeUserData('isPasswordHidden')}
                      buttonStyles={styles.passwordButton}
                    >
                      <Text style={styles.passwordButtonText}>
                        {user.isPasswordHidden ? 'Показати' : 'Заховати'}
                      </Text>
                    </StyledButton>
                  </View>
                </View>
                {/* Register */}
                <StyledButton
                  onPress={onPressRegistration}
                  buttonStyles={styles.registerButton}
                >
                  <Text style={styles.registerButtonText}>Зареєструватися</Text>
                </StyledButton>
                {/* Login */}
                <View style={styles.loginWrapper}>
                  <Text style={styles.loginText}>Вже є акаунт? </Text>
                  <StyledButton
                    onPress={onPressLogin}
                    buttonStyles={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Увійти</Text>
                  </StyledButton>
                </View>
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  // MAIN CONTAINER
  container: {
    flex: 1,
  },
  // BACKGROUND IMAGE
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // WRAPPER
  wrapper: {
    paddingTop: 92,
    paddingBottom: 79,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  // TITLE
  title: {
    marginBottom: 33,
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
  },

  // AVATAR
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  avatarButton: {
    position: 'absolute',
    right: -12,
    bottom: 12,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  //FORM FIELDS
  formFields: {
    gap: 16,
    marginBottom: 43,
  },

  passwordField: {
    justifyContent: 'center',
  },
  passwordInput: { paddingRight: 100 },
  passwordButton: {
    position: 'absolute',
    right: 16,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  passwordButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },

  // REGISTER BUTTON STYLES
  registerButton: {
    marginBottom: 16,
  },
  registerButtonText: {
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },

  // LOGIN BUTTON STYLES
  loginWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  loginText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  loginButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
});
