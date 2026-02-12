import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProfile, KnownError } from "../../app/types";
import { getOwnProfile, getProfileById, updateOwnProfile } from "../../apis/profile";
import type { AxiosError } from "axios";

interface ProfileState {
  profile: IProfile | null;
  userProfile: IProfile | null;
  loading: boolean;
}

export const fetchUserProfile = createAsyncThunk<IProfile, void, { rejectValue: KnownError }>(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return (await getOwnProfile()) as IProfile;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserProfile = createAsyncThunk<IProfile, IProfile, { rejectValue: KnownError }>(
  'profile/updateUserProfile',
  async (profile, { rejectWithValue }) => {
    try {
      return (await updateOwnProfile(profile)) as IProfile;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchProfileById = createAsyncThunk<IProfile, string, { rejectValue: KnownError }>(
  'employeeProfiles/fetchProfileById',
  async (id, { rejectWithValue }) => {
    try {
      return (await getProfileById(id)) as IProfile;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: ProfileState = {
  profile: null,
  userProfile: null,
  loading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      console.log(state.userProfile)
      state.loading = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchProfileById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileById.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProfileById.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default profileSlice.reducer;
