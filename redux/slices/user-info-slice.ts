import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userInfo: {},
  },
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      return {
        value: {
          ...state.value,
          userInfo: action.payload,
        },
      };
    },
    resetUserInfo: (state) => {
      return initialState;
    },
  },
});

export const { setUserInfo, resetUserInfo } = userInfo.actions;
export default userInfo.reducer;
