import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainRoute from './routes';

function App() {
  return (
    <Provider store={store}>
      <MainRoute />
    </Provider>
  );
}

export default App;
