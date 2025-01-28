export const REGISTER_INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  photo: '',
  isPasswordHidden: true,
  isFormFilled: false,
};

export const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
  isPasswordHidden: true,
  isFormFilled: false,
};

export const PROFILE_INITIAL_STATE = {
  login: 'Test user',
  email: 'test@test.com',
  password: '',
  isLoggedIn: true,
};

export const POST_INITIAL_STATE = {
  image: '',
  title: '',
  location: '',
  coords: {
    latitude: 0,
    longitude: 0,
  },
  isEmptyPost: true,
};
