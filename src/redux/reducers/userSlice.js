import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
  selectors: {
    selectInfo: (state) => state.userInfo,
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const { selectInfo } = userSlice.selectors;

export default userSlice.reducer;
