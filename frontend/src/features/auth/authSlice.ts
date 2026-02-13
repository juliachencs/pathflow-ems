import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { login, signup } from "../../apis/auth";
import type { BoardingStatus, KnownError, UserRole, VisaStatus } from "../../app/types";

interface UserInfo {
    id: string;
    name: string;
    avatar: string | null;
    role: UserRole;
    boarding: BoardingStatus;
    visa: VisaStatus;
}
interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    currentUser: UserInfo | null;
    loading: boolean;
}

export interface AuthResponse {
    message: string;
    data: {
        username: string;
        profileImage: string | null;
        employeeId: string;
        accessToken: string;
        role: UserRole;
        boarding: BoardingStatus;
        visa: VisaStatus;
    }
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    registerToken: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    currentUser: null,
    loading: false
}

const loadState = (): AuthState => {
    const authState = localStorage.getItem("auth");
    return authState
        ? JSON.parse(authState) : initialState;
};

const saveState = (state: AuthState) => {
    localStorage.setItem('auth', JSON.stringify(state));
    localStorage.setItem('token', state.token!);
};

const mapResponseToUser = (response: AuthResponse): UserInfo => {
    const { data } = response;
    return {
        id: data.employeeId,
        name: data.username,
        avatar: data.profileImage,
        role: data.role,
        boarding: data.boarding,
        visa: data.visa,
    }
}

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: KnownError }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            return (await login(credentials)) as AuthResponse;
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    },
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: KnownError }>(
    'auth/regiser',
    async (credentials, { rejectWithValue }) => {
        try {
            return (await signup(credentials)) as AuthResponse;
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: loadState(),
    reducers: {
        setBoarding: (state, action: PayloadAction<BoardingStatus>) => {
            if (state.currentUser) {
                state.currentUser.boarding = action.payload;
                saveState(state);
            }
        },
        setVisa: (state, action: PayloadAction<VisaStatus>) => {
            if (state.currentUser) {
                state.currentUser.visa = action.payload;
            }
        },
        clearAuth: (state) => {
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.token = null;
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.data.accessToken;
            state.currentUser = mapResponseToUser(action.payload);
            saveState(state);
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.data.accessToken;
            state.currentUser = mapResponseToUser(action.payload);
            saveState(state);
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const { setBoarding, setVisa, clearAuth } = authSlice.actions;
export default authSlice.reducer;