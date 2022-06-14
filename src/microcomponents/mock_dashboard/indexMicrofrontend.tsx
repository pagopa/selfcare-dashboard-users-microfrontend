import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@pagopa/selfcare-common-frontend/index.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@pagopa/mui-italia/theme';
import { CONFIG } from '@pagopa/selfcare-common-frontend/config/env';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { store } from '../../redux/store';
import { MOCK_USER } from '../../utils/constants';
import { ENV } from '../../utils/env';
import reportWebVitals from '../../reportWebVitals';
import App from './App';
import '../../locale';

// eslint-disable-next-line functional/immutable-data
CONFIG.MOCKS.MOCK_USER = MOCK_USER;
// eslint-disable-next-line functional/immutable-data
CONFIG.URL_FE.LOGIN = `${ENV.URL_FE.LOGIN}?onSuccess=dashboard`;
// eslint-disable-next-line functional/immutable-data
CONFIG.URL_FE.LOGOUT = ENV.URL_FE.LOGOUT;
// eslint-disable-next-line functional/immutable-data
CONFIG.URL_FE.ASSISTANCE = ENV.URL_FE.ASSISTANCE;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path={ENV.ROUTES.OVERVIEW} exact={false}>
              <App AppRouting={(window as any).AppRouting} store={store} />
            </Route>
            <Route path="*">
              <Redirect
                to={resolvePathVariables(ENV.ROUTES.OVERVIEW, {
                  partyId: 'onboarded',
                })}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
