import { createSlice } from "@reduxjs/toolkit";

export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    status: 'checking',
    invitado: null, 
    errorMessage: undefined,
  },
  reducers: {
    onChecking: ( state ) => {
        state.status = 'checking';
        state.invitado = null;
        state.errorMessage = undefined;
    }, 
    onLogin: (state, { payload }) => {
        state.status = 'authenticated';
        state.invitado = payload.invitado;
        state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
        state.status = 'not-authenticated';
        state.invitado = {};
        state.errorMessage = payload;
    }, 
    clearErrorMessage: ( state ) => {
        state.errorMessage = undefined;
    },
    onError:(state, { payload }) => {
        state.errorMessage = payload;
    },
    onUpdateGuest: (state, { payload }) => {
      state.invitado = payload;
      state.errorMessage = undefined;
    },
  },
});

export const {onChecking, onLogin, onLogout, clearErrorMessage, onError, onUpdateGuest} = guestSlice.actions;
