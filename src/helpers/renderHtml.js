import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Root from '../Root';
import { getTranslation } from './i18n';
import { matchRoutes } from 'react-router-config';
import { getServerRouter } from './serverRoute';
import getStore from './createStore';

function initialStoreData({req, store}){
  const promises = matchRoutes(getServerRouter(), req.path).map(({ route }) => {
    if (typeof route.getInitialData === 'function') {
      return route.getInitialData(store, req);
    }
    return null;
  });
  return Promise.all(promises);
}

function getPreloadedState(preloadedState){
  if (!preloadedState) return '';
  return `
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}
    </script>
  `
}

function getProps(props){
  return`
    <script>
      window.__PAGE_PROPS__ = ${JSON.stringify(props).replace(
        /</g,
        '\\u003c'
      )}
    </script>
  `
}

const render = async (req) => {
  const sheet = new ServerStyleSheet();
  const i18n = getTranslation();
  const store = getStore();
  try {
    await initialStoreData({req, store})
    const content = renderToString(sheet.collectStyles(
      <Root
        store={store}
        req={req}
        i18n={i18n}
      />
    ));
    
    const preloadedState = store.getState();
    const styleTags = sheet.getStyleTags();
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="/favicon.ico" rel="icon">
          <title>${i18n['META_TITLE']}</title>
          <meta charSet='utf-8'>
          <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' name='viewport'>
          ${styleTags}
          <link rel="preload" href="/main.css" as="style"/>
          <link rel="stylesheet" href="/main.css">
        </head>
        <body>
          <div id='root'>${content}</div>
          ${getPreloadedState(preloadedState)}
          ${getProps({i18n})}
          <script src="/bundle.js"></script>
        </body>
      </html>
    `;
    return html;
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
};

export default render;