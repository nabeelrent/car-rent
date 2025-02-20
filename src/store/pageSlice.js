import { createSlice } from '@reduxjs/toolkit';

// Define initial state for the page
const initialState = {
  pageName: '',
};

// Create the page slice
const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    resetPageName: (state) => {
      state.pageName = '';
    },
  },
});

// Export the actions
export const { setPageName, resetPageName } = pageSlice.actions;

// Export the reducer
export default pageSlice.reducer;
