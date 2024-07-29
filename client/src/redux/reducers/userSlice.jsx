import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const userSlice =  createSlice({
    name: 'user',
    initialState:initialState,
    reducers:{
        updateUser: (state,action) =>{
            state.currentUser = action.payload.user;
        },
        loginSuccess: (state,action) =>{

            state.currentUser = action.payload.user;
            localStorage.setItem("BusyBuy-app-token",action.payload.token);
        },
        logout: (state) =>{
            state.currentUser = null;
            localStorage.removeItem("BusyBuy-app-token");
        },
    }
});

export const {updateUser ,loginSuccess,logout} = userSlice.actions;
export default userSlice.reducer;