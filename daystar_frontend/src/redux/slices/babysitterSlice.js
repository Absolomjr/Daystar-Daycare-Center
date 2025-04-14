import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  babysitters: [],
  currentBabysitter: null,
  loading: false,
  error: null,
};

const babysitterSlice = createSlice({
  name: 'babysitters',
  initialState,
  reducers: {
    fetchBabysittersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBabysittersSuccess: (state, action) => {
      state.loading = false;
      state.babysitters = action.payload;
    },
    fetchBabysittersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBabysitter: (state, action) => {
      state.babysitters.push(action.payload);
    },
    updateBabysitter: (state, action) => {
      const index = state.babysitters.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.babysitters[index] = action.payload;
      }
    },
    deleteBabysitter: (state, action) => {
      state.babysitters = state.babysitters.filter(b => b.id !== action.payload);
    },
    setCurrentBabysitter: (state, action) => {
      state.currentBabysitter = action.payload;
    },
  },
});

export const {
  fetchBabysittersStart,
  fetchBabysittersSuccess,
  fetchBabysittersFailure,
  addBabysitter,
  updateBabysitter,
  deleteBabysitter,
  setCurrentBabysitter,
} = babysitterSlice.actions;

export default babysitterSlice.reducer;
