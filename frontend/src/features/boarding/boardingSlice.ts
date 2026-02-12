import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { KnownError, BoardingStatus, BoardingData } from "../../app/types";
import type { AxiosError } from "axios";
import { getApplicationStatus, reSubmitApplication, submitApplication } from "../../apis/boarding";

type BoardingPayload = BoardingData;

interface BoardingRespond {
    data: BoardingData;
    feedback?: string;
    state: BoardingStatus;
}
interface BoardingState {
    status: BoardingStatus;
    boardingValues: BoardingData | null;
    feedback?: string;
    loading: boolean;
}

export const submitBoardingApplication = createAsyncThunk<BoardingRespond, BoardingPayload, { rejectValue: KnownError }>(
    'boarding/submitBoardingApplication',
    async (boardingData, { rejectWithValue }) => {
        try {
            return (await submitApplication(boardingData)) as BoardingRespond;
        } catch (e) {
            const error: AxiosError<KnownError> = e as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
)

export const reSubmitBoardingApplication = createAsyncThunk<BoardingRespond, BoardingPayload, { rejectValue: KnownError }>(
    'boarding/reSubmitBoardingApplication',
    async (boardingData, { rejectWithValue }) => {
        try {
            return (await reSubmitApplication(boardingData)) as BoardingRespond;
        } catch (e) {
            const error: AxiosError<KnownError> = e as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchBoardingStatus = createAsyncThunk<BoardingRespond, void, { rejectValue: KnownError }>(
    'boarding/fetchBoardingStatus',
    async (_, { rejectWithValue }) => {
        try {
            return (await getApplicationStatus()) as BoardingRespond;
        } catch (e) {
            const error: AxiosError<KnownError> = e as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState: BoardingState = {
    status: "UNSUBMIT",
    boardingValues: null,
    loading: false,
};

const boardingSlice = createSlice({
    name: 'boarding',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(submitBoardingApplication.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(submitBoardingApplication.fulfilled, (state, action) => {
            state.status = 'PENDING';
            state.boardingValues = action.payload.data;
            state.loading = false;
        });
        builder.addCase(submitBoardingApplication.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(reSubmitBoardingApplication.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(reSubmitBoardingApplication.fulfilled, (state, action) => {
            state.status = 'PENDING';
            state.boardingValues = action.payload.data;
            state.loading = false;
        });
        builder.addCase(reSubmitBoardingApplication.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchBoardingStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBoardingStatus.fulfilled, (state, action) => {
            state.status = action.payload.state;
            if (action.payload.state === 'REJECTED') {
                state.feedback = action.payload.feedback;
            }
            else {
                state.feedback = undefined;
            }
            state.boardingValues = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchBoardingStatus.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default boardingSlice.reducer;