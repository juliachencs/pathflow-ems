import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProfileFull, KnownError } from "../../app/types";
import { getOwnProfile, updateOwnProfile } from "../../apis/profile";
import type { AxiosError } from "axios";

interface ProfileState {
  profile: IProfileFull | null;
  loading: boolean;
}

export type ProfilePayload = Omit<IProfileFull, "_id">;

export const fetchUserProfile = createAsyncThunk<IProfileFull, void, { rejectValue: KnownError }>(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return (await getOwnProfile()) as IProfileFull;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserProfile = createAsyncThunk<IProfileFull, ProfilePayload, { rejectValue: KnownError }>(
  'profile/updateUserProfile',
  async (profile, { rejectWithValue }) => {
    try {
      return (await updateOwnProfile(profile));
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
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default profileSlice.reducer;
