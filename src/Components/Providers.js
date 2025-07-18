'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Loading from './Loading';

export const Providers = ({ children, isLanding = false }) => {
  let persistor = persistStore(store);

  if (isLanding) return children
  else return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>{children}</SessionProvider>
      </PersistGate>
    </ReduxProvider>
  )
};
