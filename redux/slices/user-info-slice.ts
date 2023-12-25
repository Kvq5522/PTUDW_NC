import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userInfo: {
      id: 0,
      created_at: "",
      updated_at: "",
      email: "",
      first_name: "",
      last_name: "",
      is_activated: true,
      is_banned: false,
      authorization: 0,
      student_id: null,
      phone_number: "",
      address: "",
      age: 0,
      gender: "",
      avatar: "",
    },
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
