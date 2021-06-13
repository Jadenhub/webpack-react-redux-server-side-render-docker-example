import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import I18nProvider from './components/decorator/i18n';
import Landing from './components/layout/Landing';
import { getServerRouter } from "./helpers/serverRoute";

/** * Use only in server side */
function Root({ store, req,  i18n}) {
  return (
    <Provider store={store}>
      <Landing>
        <I18nProvider i18n={i18n}>
          <StaticRouter location={req.path}>
            {renderRoutes(getServerRouter())}
          </StaticRouter>
        </I18nProvider>
      </Landing>
    </Provider>
  );
}

export default Root;
