import { configureStore } from "@reduxjs/toolkit";
import { guestSlice } from ".";


export const store = configureStore({
    reducer: {
        guest: guestSlice.reducer,
    }
})