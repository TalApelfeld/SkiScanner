import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight, Hotel, Transfer, PackageQuote } from '../../types';

interface PackageState {
  selectedFlight: Flight | null;
  selectedHotel: Hotel | null;
  selectedTransfer: Transfer | null;
  packageQuote: PackageQuote | null;
  passengerCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  selectedFlight: null,
  selectedHotel: null,
  selectedTransfer: null,
  packageQuote: null,
  passengerCount: 2,
  loading: false,
  error: null,
};

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    selectFlight: (state, action: PayloadAction<Flight>) => {
      state.selectedFlight = action.payload;
    },
    selectHotel: (state, action: PayloadAction<Hotel>) => {
      state.selectedHotel = action.payload;
    },
    selectTransfer: (state, action: PayloadAction<Transfer>) => {
      state.selectedTransfer = action.payload;
    },
    setPassengerCount: (state, action: PayloadAction<number>) => {
      state.passengerCount = action.payload;
    },
    calculatePackage: (state) => {
      if (state.selectedFlight && state.selectedHotel && state.selectedTransfer) {
        const flightTotal = state.selectedFlight.price * state.passengerCount;
        const hotelTotal = state.selectedHotel.pricePerNight * 7; // Assuming one week
        const transferTotal = state.selectedTransfer.price * state.passengerCount;
        
        state.packageQuote = {
          id: Math.random().toString(36).substring(2, 11),
          flightTotal,
          hotelTotal,
          transferTotal,
          totalPrice: flightTotal + hotelTotal + transferTotal,
          pricePerPerson: (flightTotal + hotelTotal + transferTotal) / state.passengerCount,
          expiresAt: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
        };
      }
    },
    clearPackage: (state) => {
      state.selectedFlight = null;
      state.selectedHotel = null;
      state.selectedTransfer = null;
      state.packageQuote = null;
    },
  },
});

export const {
  selectFlight,
  selectHotel,
  selectTransfer,
  setPassengerCount,
  calculatePackage,
  clearPackage,
} = packageSlice.actions;

export default packageSlice.reducer;