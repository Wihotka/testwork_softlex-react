import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: []
  },
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    }
  }
});

export default tasksSlice.reducer;
export const { addData } = tasksSlice.actions;
