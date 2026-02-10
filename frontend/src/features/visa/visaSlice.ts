import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DocType, FileStatus, IVisaStatus, KnownError, VisaDocuments, VisaStatus } from "../../app/types";
import { getVisaStatus, submitVisaFile } from "../../apis/visa";
import type { AxiosError } from "axios";

interface VisaState {
  visaStatus: VisaStatus | null;
  status: FileStatus | null;
  key: DocType | null;
  feedback?: string;
  userDocuments?: VisaDocuments;
  loading: boolean;
}

export type UserVisaPayload = {
  payload: {
    documentType: DocType;
    url: string;
  }
};

export const fetchUserVisa = createAsyncThunk<IVisaStatus, void, { rejectValue: KnownError }>(
  'visa/fetchUserVisa',
  async (_, { rejectWithValue }) => {
    try {
      return (await getVisaStatus());
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const submitUserVisaDoc = createAsyncThunk<IVisaStatus, UserVisaPayload, { rejectValue: KnownError }>(
  'visa/submitUserVisaDoc',
  async (docPayload, { rejectWithValue }) => {
    try {
      return (await submitVisaFile(docPayload));
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: VisaState = {
  visaStatus: null,
  status: null,
  key: null,
  loading: false,
};

const visaSlice = createSlice({
  name: 'visa',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserVisa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserVisa.fulfilled, (state, action) => {
      const { state: visaStatus, curState, documents } = action.payload;
      const curDoc = documents[curState];
      const key = Object.keys(curDoc)[0] as DocType;
      const status = Object.values(curDoc)[0].state;

      state.key = key;
      state.visaStatus = visaStatus;
      state.status = status;
      state.loading = false;
    });
    builder.addCase(fetchUserVisa.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(submitUserVisaDoc.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitUserVisaDoc.fulfilled, (state, action) => {
      const { state: visaStatus, curState, documents } = action.payload;
      const curDoc = documents[curState];
      const key = Object.keys(curDoc)[0] as DocType;
      const status = Object.values(curDoc)[0].state;

      state.key = key;
      state.visaStatus = visaStatus;
      state.status = status;
      state.loading = false;
    });
    builder.addCase(submitUserVisaDoc.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default visaSlice.reducer;
