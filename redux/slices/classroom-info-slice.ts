import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    classroomList: [] as ClassroomData[],
    currentClassroom: {
      user: {
        member_id: 0,
        member_role: 0,
        classroom_id: 0,
        member_id_fk: {
          first_name: "",
          last_name: "",
          email: "",
          avatar: "",
        },
      },
      members: [] as MemberData[],
      invitations: {
        student_invite_code: "",
        student_invite_uri_code: "",
        teacher_invite_code: "",
        teacher_invite_uri_code: "",
      },
    },
  },
};

export type ClassroomInfoState = typeof initialState;

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
          currentClassroom: {
            user: { ...action.payload.user },
            members: [...action.payload.members] as never[],
            invitations: { ...action.payload.invitations },
          },
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
          currentClassroom: {
            ...initialState.value.currentClassroom,
          },
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

interface MemberData {
  member_id: number;
  member_role: number;
  member_id_fk: {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
}

interface ClassroomData {
  classroom_id: number;
  member_role: number;
  classroom_id_fk: {
    name: string;
    owner_id: number;
    owner_fk: {
      first_name: string;
      last_name: string;
      email: string;
      avatar: string;
    };
  };
}
