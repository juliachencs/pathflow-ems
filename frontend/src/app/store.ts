import { configureStore } from "@reduxjs/toolkit/react";
import authReducer from "../features/auth/authSlice";
import boardingReducer from "../features/boarding/boardingSlice"
import profileReducer from '../features/profile/profileSlice';
import visaReducer from '../features/visa/visaSlice'
import employeeProfilesReducer from '../features/empProfiles/empProfilesSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        boarding: boardingReducer,
        profile: profileReducer,
        visa: visaReducer,
        employeeProfiles: employeeProfilesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;