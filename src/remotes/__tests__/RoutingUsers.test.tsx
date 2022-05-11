import { createStore } from '../../redux/store';
import { DASHBOARD_USERS_ROUTES } from './../../routes';
import { createMemoryHistory, History } from 'history';
import RoutingUsers from './../RoutingUsers';
import { Router, Route, Switch } from 'react-router';
import { ENV } from '../../utils/env';
import { DashboardMicrofrontendPageProps } from '../../microcomponents/dashboard-routes-utils';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../../microcomponents/mock_dashboard/App';

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
    <Route key="RoutingUsers" path={ENV.ROUTES.USERS} exact={false}>
      <RoutingUsers {...props} />
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

const toVerifyPath = async (path: string, title: string, history: History) => {
  expect(screen.queryByPlaceholderText(title)).toBeNull();
  history.push(path);
  await waitFor(() => screen.queryByPlaceholderText(title));
};

test('test routing user detail', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/users/uid', 'Profilo Utente', history);
});

test('test routing user list', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/users', 'Utenti', history);
});

test('test routing add new user', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/users/add', 'Aggiungi un Referente', history);
});

test('test routing add product', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/users/uid/add-product', 'Aggiungi Prodotto', history);
});

test('test routing modify user', async () => {
  const { history } = renderComponent();
  await toVerifyPath('/dashboard/onboarded/users/uid/edit', 'Modifica il profilo utente', history);
});
