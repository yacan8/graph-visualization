import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import configureStore from './stores';
import s from './styles';
import App from './app';

const MOUNT = document.getElementById('app');

const render = () => {
  const stores = configureStore();
  Object.assign(window, stores)
  ReactDOM.render(
    <Provider {...stores}>
      <App />
    </Provider>
  , MOUNT)
}

try {
  render();
} catch (e) {
  console.error(e);
}

if (__DEV__) {
  if (module.hot) {
    module.hot.accept(['./app'], () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}
