import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';
// 获取 store
const store = configureStore();
render(
  <Provider store={store}>
    {' '}
    <App />{' '}
  </Provider>,
  document.querySelector('#app')
);
