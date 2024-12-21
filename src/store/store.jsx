// store.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './slices/authenticationSlice';  // Your slice reducer

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,  // Add reducers to the store
  },
});

export default store;
