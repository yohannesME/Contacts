import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllContactsThunk, showStatsThunk } from './allContactsThunk';

const initialFiltersState = {
  search: '',
  searchRelation: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  contacts: [],
  totalContacts: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  ...initialFiltersState,
};

export const getAllContacts = createAsyncThunk('allcontacts/getcontacts', getAllContactsThunk);

export const showStats = createAsyncThunk('allContacts/showStats', showStatsThunk);

const allContactsSlice = createSlice({
  name: 'allContacts',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      console.log(name, value);
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllContactsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.contacts = payload.contacts;
        state.numOfPages = payload.numOfPages;
        state.totalContacts = payload.totalContacts;
      })
      .addCase(getAllContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllContactsState,
} = allContactsSlice.actions;

export default allContactsSlice.reducer;
