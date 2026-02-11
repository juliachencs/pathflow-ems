import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActionType, DocType, IManagedVisaStatus, KnownError } from "../../app/types";
import { getEmpVisaStatusAll, getEmpVisaStatusIP, updateEmpVisaStatus } from "../../apis/visa";
import type { AxiosError } from "axios";

interface EmpVisaState {
    visaListProgress: IManagedVisaStatus[] | null;
    visaListAll: IManagedVisaStatus[] | null;
    visaListAllFiltered: IManagedVisaStatus[] | null;
    searchKey?: string;
    loading: boolean;
}


export const fetchVisaListProgress = createAsyncThunk<IManagedVisaStatus[], void, { rejectValue: KnownError }>(
    'employeeVisa/fetchVisaListProgress',
    async (_, { rejectWithValue }) => {
        try {
            return (await getEmpVisaStatusIP()) as IManagedVisaStatus[];
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

export const fetchVisaListAll = createAsyncThunk<IManagedVisaStatus[], void, { rejectValue: KnownError }>(
    'employeeVisa/fetchVisaListAll',
    async (_, { rejectWithValue }) => {
        try {
            return (await getEmpVisaStatusAll()) as IManagedVisaStatus[];
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

export type EmpVisaPayload = {
    id: string;
    actionType: ActionType;
    payload: {
        documentType: DocType;
        url?: string;
        feedback?: string;
    }
};

type UpdateVisaRespond = {
    data: {
        progress: IManagedVisaStatus[],
        all: IManagedVisaStatus[]
    }
};

export const updateEmployeeVisa = createAsyncThunk<UpdateVisaRespond, EmpVisaPayload, { rejectValue: KnownError }>(
    'employeeVisa/updateEmployeeVisa',
    async (visaPayload, { rejectWithValue }) => {
        try {
            return (await updateEmpVisaStatus(visaPayload)) as UpdateVisaRespond;
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sortVisaList = (state: EmpVisaState, listInput?: IManagedVisaStatus[]): IManagedVisaStatus[] | null => {
    // use default sort alphabeticaly by last name for now
    let items: IManagedVisaStatus[] | null = state.visaListAll;
    if (listInput) items = listInput;

    items?.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName));
    return items;
}

const searchVisaList = (state: EmpVisaState): IManagedVisaStatus[] | null => {
    const { searchKey } = state;
    let items: IManagedVisaStatus[] | null = state.visaListAll;
    // Search by names (first, last, prefered)
    if (items && searchKey) {
        items = items.filter((item) => {
            const { name } = item;
            return name.firstName.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || name.lastName.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || name.preferredName?.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase());
        })
        // if result changed, sort it
        // items = sortVisaList(state, items);
    }
    return items;
}

const initialState: EmpVisaState = {
    visaListProgress: null,
    visaListAll: null,
    visaListAllFiltered: null,
    loading: false
};

const EmpVisaSlice = createSlice({
    name: 'employeeVisa',
    initialState,
    reducers: {
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload;
            state.visaListAllFiltered = searchVisaList(state);
        },
        clearSearch: (state) => {
            state.searchKey = undefined;
            state.visaListAllFiltered = state.visaListAll;
        },
        // // mock test only
        setDummyVisaList: (state, action: PayloadAction<IManagedVisaStatus[]>) => {
            console.log('setDummy');
            state.visaListProgress = action.payload;
            state.visaListAll = action.payload;
            state.visaListAllFiltered = state.visaListAll;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVisaListProgress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchVisaListProgress.fulfilled, (state, action) => {
            state.visaListProgress = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchVisaListProgress.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchVisaListAll.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchVisaListAll.fulfilled, (state, action) => {
            state.visaListAll = action.payload;
            state.visaListAllFiltered = state.visaListAll;
            state.loading = false;
        });
        builder.addCase(fetchVisaListAll.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateEmployeeVisa.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateEmployeeVisa.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.visaListProgress = data.progress;
            state.visaListAll = data.all;
            state.visaListAllFiltered = state.visaListAll;
            state.loading = false;
        });
        builder.addCase(updateEmployeeVisa.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setSearchKey, clearSearch, setDummyVisaList } = EmpVisaSlice.actions;
export default EmpVisaSlice.reducer;
