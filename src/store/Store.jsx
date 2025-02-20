// src/store/index.js or your store configuration file

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import pageReducer  from './pageSlice'; // Path to the theme slice


const authPersistConfig = {
  key: 'auth',
  storage,
};
const  pagePersistConfig = {
  key: 'page',
  storage,
};



const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const persistedPageReducer = persistReducer(pagePersistConfig, pageReducer);



export const store = configureStore({
  reducer: {
    Auth: persistedAuthReducer,
    page : persistedPageReducer


  },
});

export const persistor = persistStore(store);
