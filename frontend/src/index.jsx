import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './Routes/Routes';
import { Provider } from 'react-redux'
import { store, Login, persistor } from './Store/Store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} Login={Login}>
      <PersistGate persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
