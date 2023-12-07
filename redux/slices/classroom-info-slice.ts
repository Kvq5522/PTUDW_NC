import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    classroomList: [],
    currentClassroom: {},
  },
};

export const classroomInfo = createSlice({
  name: "classroomInfo",
  initialState: initialState,
  reducers: {
    setClasslist: (state, action: PayloadAction<any>) => {
      return {
        value: {
          ...state.value,
          classroomList: action.payload,
        },
      };
    },
    setCurrentClassroom: (state, action: PayloadAction<any>) => {
      return {
        value: {
          ...state.value,
          currentClassroom: action.payload,
        },
      };
    },
    appendToClasslist: (state, action: PayloadAction<any>) => {
      state.value.classroomList.push(action.payload as never);
    },
    resetClasslist: (state) => {
      return {
        value: {
          ...state.value,
          classroomList: [],
        },
      };
    },
    resetCurrentClassroom: (state) => {
      return {
        value: {
          ...state.value,
          currentClassroom: {},
        },
      };
    },
    resetClassroomInfo: (state) => {
      return initialState;
    },
  },
});

export const {
  setClasslist,
  appendToClasslist,
  setCurrentClassroom,
  resetClasslist,
  resetCurrentClassroom,
  resetClassroomInfo,
} = classroomInfo.actions;

export default classroomInfo.reducer;
