import { configureStore } from '@reduxjs/toolkit';
import firstOpen from './firstOpen';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  firstOpen: firstOpen,
});

const storeRedirect = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});

export default storeRedirect;
