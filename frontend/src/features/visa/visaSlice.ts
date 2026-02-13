import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DocType, FileStatus, IVisaDoc, IVisaStatus, KnownError, VisaStatus } from "../../app/types";
import { getVisaStatus, submitVisaFile } from "../../apis/visa";
import type { AxiosError } from "axios";

interface VisaState {
  visaStatus: VisaStatus | null;
  status: FileStatus | null;
  key: DocType | null;
  curStage: number | null;
  feedback?: string;
  userDocuments?: IVisaDoc[];
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
      return (await getVisaStatus()) as IVisaStatus;
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
  curStage: null,
  loading: false,
};

const loadVisaStatus = (state: VisaState, payload: IVisaStatus) => {
  const { state: visaStatus, curStage, documents } = payload;
  
  state.visaStatus = visaStatus;
  state.userDocuments = documents;

  const stageIndex = curStage - 1;
  if (stageIndex <= 3) {
    const curDoc = documents[stageIndex];
    const key: DocType = curDoc.documentType;
    const status: FileStatus = curDoc.state;
    state.key = key;
    state.status = status;
    state.curStage = curDoc.state === 'UNSUBMIT' ? stageIndex - 1 : stageIndex;
  }
}

const visaSlice = createSlice({
  name: 'visa',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserVisa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserVisa.fulfilled, (state, action) => {
      loadVisaStatus(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchUserVisa.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(submitUserVisaDoc.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitUserVisaDoc.fulfilled, (state, action) => {
      loadVisaStatus(state, action.payload);
      state.loading = false;
    });
    builder.addCase(submitUserVisaDoc.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default visaSlice.reducer;
