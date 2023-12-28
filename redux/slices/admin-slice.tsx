import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProp {
  value: {
    users: UserData[];
    classrooms: any[];
  };
}

const initialState: initialStateProp = {
  value: {
    users: [],
    classrooms: [],
  },
};

export type AdminProp = typeof initialState;

export const adminProp = createSlice({
  name: "classroomInfo",
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      return {
        value: {
          ...state.value,
          users: action.payload,
        },
      };
    },
    setUserById: (state, action: PayloadAction<any>) => {
      const users = [...state.value.users];

      const { id, data, field } = action.payload;

      const newUsers = users.map((user) =>
        user.id === id ? { ...user, [field]: data } : user
      );

      return {
        value: {
          ...state.value,
          users: newUsers,
        },
      };
    },
    resetUsers: (state) => {
      return {
        value: {
          ...state.value,
          users: initialState.value.users,
        },
      };
    },
    setClassrooms: (state, action: PayloadAction<any>) => {
      return {
        value: {
          ...state.value,
          classrooms: action.payload,
        },
      };
    },
    setClassroomById: (state, action: PayloadAction<any>) => {
      const classrooms = [...state.value.classrooms];

      const { id, data, field } = action.payload;

      const newClassrooms = classrooms.map((classroom) =>
        classroom.id === id ? { ...classroom, [field]: data } : classroom
      );

      return {
        value: {
          ...state.value,
          classrooms: newClassrooms,
        },
      };
    },
    resetClassroom: (state) => {
      return {
        value: {
          ...state.value,
          classrooms: initialState.value.classrooms,
        },
      };
    },
  },
});

export const {
  resetClassroom,
  resetUsers,
  setClassrooms,
  setUsers,
  setUserById,
  setClassroomById,
} = adminProp.actions;

export default adminProp.reducer;

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  authorization: number;
  student_id: string;
  is_banned: boolean;
  name: string;
}
