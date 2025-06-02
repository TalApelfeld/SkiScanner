import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  theme: 'light' | 'dark';
  isMenuOpen: boolean;
  activeModal: string | null;
  alerts: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>;
}

const initialState: UiState = {
  theme: 'light',
  isMenuOpen: false,
  activeModal: null,
  alerts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    addAlert: (state, action: PayloadAction<Omit<UiState['alerts'][0], 'id'>>) => {
      const id = Math.random().toString(36).substring(2, 11);
      state.alerts.push({ ...action.payload, id });
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleMenu,
  openModal,
  closeModal,
  addAlert,
  removeAlert,
  clearAlerts,
} = uiSlice.actions;

export default uiSlice.reducer;