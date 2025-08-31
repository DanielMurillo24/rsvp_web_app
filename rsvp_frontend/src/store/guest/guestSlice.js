import { createSlice } from "@reduxjs/toolkit";

export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    status: 'checking',
    token: null,
    guest: null, 
    errorMessage: undefined,
  },
  reducers: {
    onChecking: ( state ) => {
        state.status = 'checking';
        state.token = null;
        state.guest = null;
        state.errorMessage = undefined;
    }, 
    onLogin: (state, { payload }) => {
        state.status = 'authenticated';
        state.token = payload.token;
        state.guest = payload.invitado;
        state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
        state.status = 'not-authenticated';
        state.token = null;
        state.guest = {};
        state.errorMessage = payload;
    }, 
    clearErrorMessage: ( state ) => {
        state.errorMessage = undefined;
    }
  },
});

export const {onChecking, onLogin, onLogout, clearErrorMessage} = guestSlice.actions;
