import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { ReactNode, useEffect, useState } from 'react';
import { ENV } from '../utils/env';
import { configureI18n } from '../locale/locale-utils';
import { DashboardMicrocomponentsProps } from '../microcomponents/dashboard-routes-utils';

type Props = DashboardMicrocomponentsProps & {
  children: ReactNode;
};

const RemotePage = ({ history, store, i18n, theme, children }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      configureI18n(i18n);

      // eslint-disable-next-line functional/immutable-data
      ENV.STORE = store;
      // eslint-disable-next-line functional/immutable-data
      ENV.i18n = i18n;

      setLoaded(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </I18nextProvider>
      </Router>
    </Provider>
  );
};

export default RemotePage;
