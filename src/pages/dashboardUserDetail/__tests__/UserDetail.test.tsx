import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, store } from '../../../redux/store';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { verifyMockExecution as verifyLoginMockExecution } from '../../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import {
  mockedPartyProducts,
  mockedProductRoles,
} from '../../../microcomponents/mock_dashboard/data/product';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import { ProductsMap } from '../../../model/Product';
import { ProductsRolesMap } from '../../../model/ProductRole';
import '../../../locale';
import UserDetailPage from '../userDetailPage/UserDetailPage';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const renderApp = async (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  verifyLoginMockExecution(store.getState());
  history.push('/1/prod-io');
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/:institutionId/:productId/users/:userId" exact={true}>
            <UserDetailPage
              party={mockedParties[0]}
              activeProducts={mockedPartyProducts}
              productsRolesMap={mockedProductRoles[0] as unknown as ProductsRolesMap}
              productsMap={mockedPartyProducts[0] as unknown as ProductsMap}
            />
          </Route>
          <Route path="/dashboard/1/prod-io/users" exact={true}>
            Test Completato
          </Route>
          <Route path="*"> {history.location.pathname}</Route>
        </Switch>
      </Router>
    </Provider>
  );
  return { history, store };
};

test('test render', async () => {
  await renderApp();
});

test('Test: go to users Page', async () => {
  await renderApp();
  const backButton = screen.getByRole('button', { name: 'Indietro' });
  fireEvent.click(backButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users'));
});

test('Test: go to edit user', async () => {
  await renderApp();
  const editButton = screen.getByRole('button', { name: 'Modifica' });
  expect(editButton).toBeEnabled();
  fireEvent.click(editButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users/0/edit'));
  screen.getByText('Modifica il profilo utente');
});

test('Test: go to assign new role from CTA', async () => {
  await renderApp();
  const assignNewRoleButton = screen.getByRole('button', { name: 'Assegna ruolo' });
  fireEvent.click(assignNewRoleButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/0/add-product')
  );
  screen.getByText('Assegna un nuovo ruolo');
});

test('Test: suspend user', async () => {
  await renderApp();
  const suspendUserButton = screen.getByRole('button', { name: 'Sospendi' });
  fireEvent.click(suspendUserButton);
  screen.getByText('Sospendi Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE SOSPESO',
    message: (
      <>
        {'Hai sospeso correttamente il referente '}
        <strong>Simone3 Bianchi3 Verdi Verdi Verdi.</strong>
      </>
    ),
  });
});

test('Test: rehabilitate user', async () => {
  await renderApp();
  const rehabilitateUserButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(rehabilitateUserButton);
  screen.getByText('Riabilita Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE RIABILITATO',
    message: (
      <>
        {'Hai riabilitato correttamente il referente '}
        <strong>Simone3 Bianchi3 Verdi Verdi Verdi.</strong>
      </>
    ),
  });
});

test('Test: delete a user', async () => {
  await renderApp();
  const deleteButton = screen.getByRole('button', { name: 'Elimina' });
  fireEvent.click(deleteButton);
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/groups'));
  await waitFor(() => screen.getByText('Test Completato'));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE ELIMINATO',
    message: (
      <>
        {'Hai eliminato correttamente il referente '}
        <strong>Simone3 Bianchi3 Verdi Verdi Verdi.</strong>
      </>
    ),
  });
});
