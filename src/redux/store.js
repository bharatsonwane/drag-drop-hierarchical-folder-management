import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './slice/folderSlice';

const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
});

export default store;