import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  children: [],
  currentChild: null,
  loading: false,
  error: null,
  attendance: {},
};

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    fetchChildrenStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchChildrenSuccess: (state, action) => {
      state.loading = false;
      state.children = action.payload;
    },
    fetchChildrenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addChild: (state, action) => {
      state.children.push(action.payload);
    },
    updateChild: (state, action) => {
      const index = state.children.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.children[index] = action.payload;
      }
    },
    deleteChild: (state, action) => {
      state.children = state.children.filter(c => c.id !== action.payload);
    },
    setCurrentChild: (state, action) => {
      state.currentChild = action.payload;
    },
    updateAttendance: (state, action) => {
      state.attendance = {
        ...state.attendance,
        [action.payload.date]: action.payload.attendance,
      };
    },
  },
});

export const {
  fetchChildrenStart,
  fetchChildrenSuccess,
  fetchChildrenFailure,
  addChild,
  updateChild,
  deleteChild,
  setCurrentChild,
  updateAttendance,
} = childrenSlice.actions;

export default childrenSlice.reducer;
