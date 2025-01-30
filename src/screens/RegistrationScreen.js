import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../utils/auth';
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import StyledButton from '../components/StyledButton';
import StyledImageBackground from '../components/StyledImageBackground';

import { REGISTER_INITIAL_STATE } from '../constants/constants';

import { colors } from '../styles/colors';
import Avatar from '../components/Avatar';

export default function RegistrationScreen() {
  const [user, setUser] = useState(REGISTER_INITIAL_STATE);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    checkFormFilled();
  }, [user.photo]);

  const onChangeUserData = (key, value) => {
    if (key === 'isPasswordHidden')
      return setUser((prev) => ({ ...prev, [key]: !user.isPasswordHidden }));

    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const onPressRegistration = async () => {
    if (!user.isFormFilled) return;

    const { email, password, login, photo } = user;

    await registerUser({ email, password, login, photo }, dispatch);
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  const onPressChangeAvatar = (uri) => {
    onChangeUserData('photo', uri);
  };

  const checkFormFilled = () => {
    if (user.email && user.password && user.login && user.photo) {
      setUser((prev) => ({ ...prev, isFormFilled: true }));
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <StyledImageBackground
              source={require('../../src/assets/images/background.png')}
            >
              <View style={styles.wrapper}>
                {/* AVATAR */}
                <Avatar
                  photo={user.photo}
                  onPressChangeAvatar={onPressChangeAvatar}
                />
                {/* TITLE */}
                <Text style={styles.title}>Реєстрація</Text>
                {/* INPUTS */}
                <View style={styles.formFields}>
                  <Input
                    placeholder="Логін"
                    onChange={(text) => onChangeUserData('login', text)}
                    value={user.login}
                    onBlurInput={checkFormFilled}
                  />
                  <Input
                    placeholder="Адреса електронної пошти"
                    onChange={(text) => onChangeUserData('email', text)}
                    value={user.email}
                    onBlurInput={checkFormFilled}
                  />
                  <View style={styles.passwordField}>
                    <Input
                      placeholder="Пароль"
                      onChange={(text) => onChangeUserData('password', text)}
                      value={user.password}
                      secure={user.isPasswordHidden}
                      outerStyles={styles.passwordInput}
                      onBlurInput={checkFormFilled}
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
                  disabled={!user.isFormFilled}
                  text={'Зареєструватися'}
                ></StyledButton>
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
            </StyledImageBackground>
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
