import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import tokenSlice from './slices/tokenSlice';
import taskSlice from './slices/taskSlice';

const rootReducer = combineReducers({
  tasks: tasksSlice,
  token: tokenSlice,
  task: taskSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
