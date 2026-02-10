import { configureStore } from "@reduxjs/toolkit/react";
import authReducer from "../features/auth/authSlice";
import boardingReducer from "../features/boarding/boardingSlice"
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        boarding: boardingReducer,
        profile: profileReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;