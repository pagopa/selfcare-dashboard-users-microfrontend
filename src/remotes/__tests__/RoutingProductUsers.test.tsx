import { createStore } from '../../redux/store';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import { createMemoryHistory, History } from 'history';
import { Router, Route, Switch } from 'react-router';
import { ENV } from '../../utils/env';
import { DashboardMicrofrontendPageProps } from '../../microcomponents/dashboard-routes-utils';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../microcomponents/mock_dashboard/App';
import RoutingProductUsers from './../RoutingProductUsers';

jest.mock('../../services/usersService');
jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');

// eslint-disable-next-line functional/immutable-data
(window as any).appRoutes = DASHBOARD_USERS_ROUTES;

export const renderComponent = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();

  const appRouting = (props: DashboardMicrofrontendPageProps) => [
    <Route key="RoutingProductUsers" path={ENV.ROUTES.PRODUCT_USERS} exact={false}>
      <RoutingProductUsers {...props} />
    </Route>,
  ];

  render(
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route path={ENV.ROUTES.OVERVIEW} exact={false}>
            <App AppRouting={appRouting} store={store} />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
  return { store, history };
};

const toVerifyPath = async (path: string, title: string, history: History, subTitle?: string) => {
  expect(screen.queryByPlaceholderText(title)).toBeNull();
  history.push(path);
  await waitFor(() => screen.queryByPlaceholderText(title));
};

test('test routing user product detail ', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/prod-io/users/uid', 'Profilo Utente', history);
});

test('test routing user product list', async () => {
  const { history } = renderComponent();
  await toVerifyPath(
    '/dashboard/onboarded/prod-io/users',
<<<<<<< HEAD
    'Utenti',
=======
    'Referenti',
>>>>>>> 15858381fe76f841fa6c688f5f011df96c5ae9b6
    history,
    'Gestisci i Referenti Amministrativi e Operativi abilitati alla gestione del prodotto App IO'
  );
});

test('test routing add new user product', async () => {
  const { history } = renderComponent();
  await toVerifyPath(
    '/dashboard/onboarded/prod-io/users/add',
    'Aggiungi un Referente',
    history,
    'Inserisci i dati della persona che vuoi autorizzare a gestire App IO'
  );
});

test('test routing modify user product', async () => {
  const { history } = renderComponent();
  await toVerifyPath(
    '/dashboard/onboarded/prod-io/users/uid/edit',
    'Modifica il profilo utente',
    history
  );
});
