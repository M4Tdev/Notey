import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import dotenv from 'dotenv';

import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';

import Router from './components/Router';
import rootReducer from './reducers';
import GlobalStyles from './utils/global';
import theme from './utils/theme';

dotenv.config();

Sentry.init({
  dsn: 'https://828857047c774aa9b74844257ce1a203@sentry.io/1443019',
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <Router />
        <GlobalStyles />
      </>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
