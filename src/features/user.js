import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: {
    tokin:"",
    username:"",
    id:"",
    role:"",
    isSuccessFullyRegistered:"",
    verified:"",
    isAuthenticated: false,
    picUrl:""
  } },
  reducers: {
    login: (state, action) => {
      state.value.tokin=action.payload.tokin
      state.value.username=action.payload.username
      state.value.id=action.payload.id
      state.value.isAuthenticated=true
      state.value.isSuccessFullyRegistered=action.payload.isSuccessFullyRegistered
      state.value.verified=action.payload.verified
      state.value.role=action.payload.role
      state.value.picUrl=action.payload.picUrl
      //localStorage.setItem("user",JSON.stringify({tokin:action.payload.tokin,isAuthenticated:true,role:action.payload.role,username:action.payload.username,id:action.payload.id,isSuccessFullyRegistered:action.payload.isSuccessFullyRegistered,verified:action.payload.verified}))
    },
    logout:(state,action)=>{
        state.value.tokin=""
        state.value.username=""
        state.value.id=""
        state.value.isAuthenticated=false
        state.value.role=""
        state.value.isSuccessFullyRegistered=""
        state.value.verified=""
        state.value.picUrl=""
        //localStorage.removeItem("user")
    }
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
