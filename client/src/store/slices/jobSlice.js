import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applications.unshift(action.payload);
    },
    removeApplication: (state, action) => {
      state.applications = state.applications.filter((_, i) => i !== action.payload);
    },
  },
});

export const { addApplication, removeApplication } = jobSlice.actions;
export default jobSlice.reducer;
