import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Booking } from '../../types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  bookings: Booking[];
  favorites: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  bookings: [],
  favorites: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.bookings = [];
      state.favorites = [];
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const resortId = action.payload;
      if (state.favorites.includes(resortId)) {
        state.favorites = state.favorites.filter(id => id !== resortId);
      } else {
        state.favorites.push(resortId);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  login,
  logout,
  addBooking,
  toggleFavorite,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;