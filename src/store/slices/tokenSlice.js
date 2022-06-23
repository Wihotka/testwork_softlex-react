import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    data: ''
  },
  reducers: {
    addToken(state, action) {
      state.data = action.payload;
    }
  }
});

export default tokenSlice.reducer;
export const { addToken } = tokenSlice.actions;
