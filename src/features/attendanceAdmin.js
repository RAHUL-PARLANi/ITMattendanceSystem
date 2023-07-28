import { createSlice } from "@reduxjs/toolkit";

export const attendanceModSlice = createSlice({
  name: "attendanceMod",
  initialState: { value: {
    isAuthenticated: false,
    date:""
  } },
  reducers: {
    login: (state, action) => {
      state.value.isAuthenticated=true
      state.value.date=action.payload.date
      //localStorage.setItem("user",JSON.stringify({tokin:action.payload.tokin,isAuthenticated:true,role:action.payload.role,username:action.payload.username,id:action.payload.id,isSuccessFullyRegistered:action.payload.isSuccessFullyRegistered,verified:action.payload.verified}))
    },
    logout:(state,action)=>{
        state.value.isAuthenticated=false
        //localStorage.removeItem("user")
        state.value.date=""
    }
  },
});

export const { login, logout } = attendanceModSlice.actions;
export default attendanceModSlice.reducer;