// src/store/index.js or your store configuration file

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const authPersistConfig = {
  key: 'auth',
  storage,
};




const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);



export const store = configureStore({
  reducer: {
    Auth: persistedAuthReducer,

  },
});

export const persistor = persistStore(store);
