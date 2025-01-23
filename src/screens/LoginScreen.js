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
import { LOGIN_INITIAL_STATE } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext';

const LoginScreen = () => {
  const [user, setUser] = useState(LOGIN_INITIAL_STATE);
  const navigation = useNavigation();
  const { profile, setProfile } = useAuth();

  const onChangeUserData = (key, value) => {
    if (key === 'isPasswordHidden')
      return setUser((prev) => ({ ...prev, [key]: !user.isPasswordHidden }));

    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const onPressLogin = () => {
    setProfile({ ...profile, ...user });
    setUser(LOGIN_INITIAL_STATE);
    navigation.navigate('Home');
  };

  const onPressRegistration = () => {
    navigation.navigate('Registration');
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
                {/* TITLE */}
                <Text style={styles.title}>Увійти</Text>
                {/* INPUTS */}
                <View style={styles.formFields}>
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
                {/* Login */}
                <StyledButton
                  onPress={onPressLogin}
                  buttonStyles={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Увійти</Text>
                </StyledButton>
                {/* Register */}
                <View style={styles.registerWrapper}>
                  <Text style={styles.registerText}>Немає акаунту? </Text>
                  <StyledButton
                    onPress={onPressRegistration}
                    buttonStyles={styles.registerButton}
                  >
                    <View style={styles.registerButtonThumb}>
                      <Text style={styles.registerButtonText}>
                        Зареєструватися
                      </Text>
                    </View>
                  </StyledButton>
                </View>
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  // MAIN CONTAINER
  container: {
    flex: 1,
  }, // BACKGROUND IMAGE
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // WRAPPER
  wrapper: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  // TITLE
  title: {
    marginBottom: 32,
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

  // LOGIN BUTTON STYLES
  loginButton: {
    marginBottom: 16,
  },
  loginButtonText: {
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },

  // REGISTER BUTTON STYLES
  registerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButton: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  registerText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  registerButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },
  registerButtonThumb: {
    borderColor: colors.blue,
    borderBottomWidth: 1,
  },
});
