import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IBoardingApplication, BoardingData, IBoardingReviewAction, IProfileCore, KnownError, registerLogInfo } from "../../app/types";
import type { AxiosError } from "axios";
import { getAllBoardingStatus, getBoardingStatusById, updateOneBoardingStatus } from "../../apis/boarding";
import { getRegistraionHistory, sendRegistrationInvite } from "../../apis/regiseration";

interface HiringState {
    registrationHistory: registerLogInfo[] | null;
    onboardListPending: IProfileCore[] | null;
    onboardListRejected: IProfileCore[] | null;
    onboardListApproved: IProfileCore[] | null;
    loadedOnboarding?: BoardingData;
    loading: boolean;
}

interface OnboardListResponse {
    PENDING: IProfileCore[];
    REJECTED: IProfileCore[];
    APPROVED: IProfileCore[];
}

export const fetchOnboardList = createAsyncThunk<OnboardListResponse, void, { rejectValue: KnownError }>(
    'hiring/fetchOnboardList',
    async (_, { rejectWithValue }) => {
        try {
            return (await getAllBoardingStatus()) as OnboardListResponse;
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

// export const fetchPendingOnboardList = createAsyncThunk<IProfileCore[], void, { rejectValue: KnownError }>(
//     'hiring/fetchPendingOnboardList',
//     async (_, { rejectWithValue }) => {
//         try {
//             return (await getStateBoardingStatus('PENDING')) as IProfileCore[];
//         } catch (err) {
//             const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
//             if (!error.response) {
//                 throw error;
//             }
//             return rejectWithValue(error.response.data);
//         }
//     },
// );

// export const fetchRejectedOnboardList = createAsyncThunk<IProfileCore[], void, { rejectValue: KnownError }>(
//     'hiring/fetchRejectedOnboardList',
//     async (_, { rejectWithValue }) => {
//         try {
//             return (await getStateBoardingStatus('REJECTED')) as IProfileCore[];
//         } catch (err) {
//             const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
//             if (!error.response) {
//                 throw error;
//             }
//             return rejectWithValue(error.response.data);
//         }
//     },
// );

// export const fetchApprovedOnboardList = createAsyncThunk<IProfileCore[], void, { rejectValue: KnownError }>(
//     'hiring/fetchApprovedOnboardList',
//     async (_, { rejectWithValue }) => {
//         try {
//             return (await getStateBoardingStatus('APPROVED')) as IProfileCore[];
//         } catch (err) {
//             const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
//             if (!error.response) {
//                 throw error;
//             }
//             return rejectWithValue(error.response.data);
//         }
//     },
// );


// TODO!! type fix
export const fetchOnboardStatusById = createAsyncThunk<IBoardingApplication, string, { rejectValue: KnownError }>(
    'hiring/fetchOnboardStatusById',
    async (id, { rejectWithValue }) => {
        try {
            return (await getBoardingStatusById(id)) as IBoardingApplication;
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

export interface updateBoardingStatusPayload {
    id: string,
    payload: IBoardingReviewAction
}

export const updateBoardingStatusById = createAsyncThunk<OnboardListResponse, updateBoardingStatusPayload, { rejectValue: KnownError }>(
    'hiring/updateBoardingStatusById',
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            return (await updateOneBoardingStatus(id, payload)) as OnboardListResponse;
        } catch (e) {
            const error: AxiosError<KnownError> = e as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchRegistrationHistory = createAsyncThunk<registerLogInfo[], void, { rejectValue: KnownError }>(
    'hiring/fetchRegistrationHistory',
    async (_, { rejectWithValue }) => {
        try {
            return (await getRegistraionHistory()) as registerLogInfo[];
        } catch (e) {
            const error: AxiosError<KnownError> = e as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export interface sendInvitationPayload {
    name: string,
    email: string
}

export const sendInvitationToUser = createAsyncThunk<registerLogInfo[], sendInvitationPayload, { rejectValue: KnownError }>(
    'hiring/sendInvitationToUser',
    async ({ name, email }, { rejectWithValue }) => {
        try {
            return (await sendRegistrationInvite({ name, email })) as registerLogInfo[];
        } catch (e) {
            const error: AxiosError<KnownError> = e as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState: HiringState = {
    registrationHistory: null,
    onboardListPending: null,
    onboardListRejected: null,
    onboardListApproved: null,
    loading: false
};

const hiringSlice = createSlice({
    name: 'hiring',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchOnboardList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOnboardList.fulfilled, (state, action) => {
            state.onboardListPending = action.payload.PENDING;
            state.onboardListRejected = action.payload.REJECTED;
            state.onboardListApproved = action.payload.APPROVED;
            state.loading = false;
        });
        builder.addCase(fetchOnboardList.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateBoardingStatusById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateBoardingStatusById.fulfilled, (state, action) => {
            state.onboardListPending = action.payload.PENDING;
            state.onboardListRejected = action.payload.REJECTED;
            state.onboardListApproved = action.payload.APPROVED;
            state.loading = false;
        });
        builder.addCase(updateBoardingStatusById.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchRegistrationHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRegistrationHistory.fulfilled, (state, action) => {
            state.registrationHistory = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchRegistrationHistory.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(sendInvitationToUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendInvitationToUser.fulfilled, (state, action) => {
            state.registrationHistory = action.payload;
            state.loading = false;
        });
        builder.addCase(sendInvitationToUser.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchOnboardStatusById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOnboardStatusById.fulfilled, (state, action) => {
            state.loadedOnboarding = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchOnboardStatusById.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default hiringSlice.reducer;
