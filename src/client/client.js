import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../components/layout/Landing';
import '../css/global.css';
import '../css/normalize.css';
import { renderRoutes } from 'react-router-config';
import routes from './Routes';
import getStore from '../helpers/createStore';
import I18nProvider from '../components/decorator/i18n';
import ScrollToTop from '../components/common/ScrollToTop';

const preloadedState = window.__PRELOADED_STATE__;
const props = window.__PAGE_PROPS__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
delete window.__PAGE_PROPS__;

ReactDOM.hydrate(
  <Provider store={getStore(preloadedState)}>
    <I18nProvider i18n={props.i18n}>
      <Landing>
        <BrowserRouter>
          <ScrollToTop>
            {renderRoutes(routes)}
          </ScrollToTop>
        </BrowserRouter>
      </Landing>
    </I18nProvider>
  </Provider>,
  document.getElementById('root')
);
