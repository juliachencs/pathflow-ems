import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBoardingApplication, IProfileFull, KnownError, BoardingStatus } from "../../app/types";
import type { AxiosError } from "axios";
import { getApplicationStatus, reSubmitApplication, submitApplication } from "../../apis/boarding";
import type { BoardingFormValues } from "../../app/schema/boardingSchema";
import { profileBoardingMapper } from "../../app/util/profileMapper";

export type BoardingPayload = Omit<IProfileFull, "_id">;

interface BoardingState {
    status: BoardingStatus;
    boardingValues: BoardingFormValues | null;
    feedback: string | null;
    loading: boolean;
}

export const submitBoardingApplication = createAsyncThunk<IBoardingApplication, BoardingPayload, { rejectValue: KnownError }>(
    'boarding/submitBoardingApplication',
    async (boardingData, { rejectWithValue }) => {
        try {
            return await submitApplication(boardingData);
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

export const reSubmitBoardingApplication = createAsyncThunk<IBoardingApplication, BoardingPayload, { rejectValue: KnownError }>(
    'boarding/reSubmitBoardingApplication',
    async (boardingData, { rejectWithValue }) => {
        try {
            return await reSubmitApplication(boardingData);
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

export const fetchBoardingStatus = createAsyncThunk<IBoardingApplication, void, { rejectValue: KnownError }>(
    'boarding/fetchBoardingStatus',
    async (_, { rejectWithValue }) => {
        try {
            return await getApplicationStatus();
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
    feedback: null,
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
            state.boardingValues = profileBoardingMapper(action.payload.profile);
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
            state.boardingValues = profileBoardingMapper(action.payload.profile);
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
                state.feedback = action.payload.feedback!;
            }
            state.boardingValues = profileBoardingMapper(action.payload.profile);
            state.loading = false;
        });
        builder.addCase(fetchBoardingStatus.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default boardingSlice.reducer;