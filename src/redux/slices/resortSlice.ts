import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Resort } from '../../types';
import { MOCK_RESORTS } from '../../mockData';

interface ResortState {
  resorts: Resort[];
  filteredResorts: Resort[];
  selectedResort: Resort | null;
  loading: boolean;
  error: string | null;
  filters: {
    budget: number;
    departureAirport: string;
    dates: {
      start: string | null;
      end: string | null;
    };
  };
}

const initialState: ResortState = {
  resorts: MOCK_RESORTS,
  filteredResorts: MOCK_RESORTS,
  selectedResort: null,
  loading: false,
  error: null,
  filters: {
    budget: 3000,
    departureAirport: '',
    dates: {
      start: null,
      end: null,
    },
  },
};

export const fetchResorts = createAsyncThunk(
  'resorts/fetchResorts',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      return MOCK_RESORTS;
    } catch (error) {
      return rejectWithValue('Failed to fetch resorts');
    }
  }
);

export const fetchResortById = createAsyncThunk(
  'resorts/fetchResortById',
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      const resort = MOCK_RESORTS.find(resort => resort.id === id);
      if (!resort) {
        throw new Error('Resort not found');
      }
      return resort;
    } catch (error) {
      return rejectWithValue('Failed to fetch resort');
    }
  }
);

const resortSlice = createSlice({
  name: 'resorts',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ResortState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredResorts = state.resorts.filter(resort => {
        const meetsbudget = resort.packagePriceFrom <= state.filters.budget;
        const meetsAirport = !state.filters.departureAirport || 
          resort.nearestAirports.includes(state.filters.departureAirport);
        
        return meetsbudget && meetsAirport;
      });
    },
    selectResort: (state, action: PayloadAction<string>) => {
      state.selectedResort = state.resorts.find(resort => resort.id === action.payload) || null;
    },
    clearSelectedResort: (state) => {
      state.selectedResort = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResorts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResorts.fulfilled, (state, action) => {
        state.loading = false;
        state.resorts = action.payload;
        state.filteredResorts = action.payload;
      })
      .addCase(fetchResorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchResortById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResortById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedResort = action.payload;
      })
      .addCase(fetchResortById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, selectResort, clearSelectedResort } = resortSlice.actions;
export default resortSlice.reducer;