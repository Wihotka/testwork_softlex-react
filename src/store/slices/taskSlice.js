import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    data: {}
  },
  reducers: {
    addTask(state, action) {
      state.data = action.payload;
    }
  }
});

export default taskSlice.reducer;
export const { addTask } = taskSlice.actions;
