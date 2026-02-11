import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProfileSummary, KnownError } from "../../app/types";
import { fetchAllProfiles } from "../../apis/profile";
import type { AxiosError } from "axios";

interface EmpProfileState {
    profiles: IProfileSummary[] | null,
    total: number | null,
    profilesFiltered: IProfileSummary[] | null,
    searchKey?: string;
    loading: boolean;
}

export const fetchProfileList = createAsyncThunk<IProfileSummary[], void, { rejectValue: KnownError }>(
    'employeeProfiles/fetchProfileList',
    async (_, { rejectWithValue }) => {
        try {
            return (await fetchAllProfiles()) as IProfileSummary[];
        } catch (err) {
            const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

const sortProfiles = (state: EmpProfileState, profilesInput?: IProfileSummary[]): IProfileSummary[] | null => {
    // use default sort alphabeticaly by last name for now
    let profiles: IProfileSummary[] | null = state.profiles;
    if (profilesInput) profiles = profilesInput;

    profiles?.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName));
    return profiles;
}

const searchProfiles = (state: EmpProfileState): IProfileSummary[] | null => {
    const { searchKey } = state;
    let profiles: IProfileSummary[] | null = state.profiles;
    // Search by names (first, last, prefered)
    if (profiles && searchKey) {
        profiles = profiles.filter((profile) => {
            const { name } = profile;
            return name.firstName.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || name.lastName.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || name.preferredName?.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase());
        })
        // if result changed, sort it
        profiles = sortProfiles(state, profiles);
    }
    return profiles;
}

const initialState: EmpProfileState = {
    profiles: null,
    total: null,
    profilesFiltered: null,
    loading: false
};

const EmpProfileSlice = createSlice({
    name: 'employeeProfiles',
    initialState,
    reducers: {
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload;
            state.profilesFiltered = searchProfiles(state);
        },
        clearSearch: (state) => {
            state.searchKey = undefined;
            state.profilesFiltered = null;
        },
        // mock test only
        setProfiles: (state, action: PayloadAction<IProfileSummary[]>) => {
            state.profiles = action.payload;
            state.profilesFiltered = sortProfiles(state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfileList.fulfilled, (state, action) => {
            state.profiles = sortProfiles(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchProfileList.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { setSearchKey, clearSearch, setProfiles } = EmpProfileSlice.actions;
export default EmpProfileSlice.reducer;
