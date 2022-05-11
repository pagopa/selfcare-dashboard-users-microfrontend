import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/store';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import {
  mockedPartyProducts,
  mockedProductRoles,
} from '../../../microcomponents/mock_dashboard/data/product';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { Trans } from 'react-i18next';
import { ProductsMap } from '../../../model/Product';
import EditUserRegistryProductPage from '../EditUserRegistryProductPage';
import { verifyMockExecution as verifyLoginMockExecution } from '../../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const fieldsValue = {
  email: 'NAME@SURNAME.COM',
  confirmEmail: 'NAME@SURNAME.COM',
};

const renderApp = async (injectedStore?: ReturnType<typeof createStore>) => {
  const store = injectedStore ? injectedStore : createStore();
  verifyLoginMockExecution(store.getState());
  const history = createMemoryHistory();
  history.push('/1/prod-io/users/uid');
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/:institutionId/:productId/users/:userId" exact={true}>
            <EditUserRegistryProductPage
              party={mockedParties[0]}
              products={mockedPartyProducts}
              selectedProduct={mockedPartyProducts[0]}
              productsMap={mockedPartyProducts as unknown as ProductsMap}
            />
          </Route>
          <Route path="/dashboard/1/prod-io/users/uid" exact={true}>
            Test Completato
          </Route>
          <Route path="*"> {history.location.pathname}</Route>
        </Switch>
      </Router>
    </Provider>
  );
  return { history, store };
};

test('render test', async () => {
  await renderApp();
  screen.getByRole('heading', { name: 'Modifica il profilo utente' });
});

test('test back button', async () => {
  const { history } = await renderApp();
  const backButton = screen.getByText('Indietro');
  expect(backButton).toBeEnabled();
  fireEvent.click(backButton);
  expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid');
});

test('test with no modify, so disabled button', async () => {
  await renderApp();

  const button = screen.getByRole('button', { name: 'Conferma' });

  expect(button).toBeDisabled();
});

test('test with email and confirm email modified but different, so disabled button', async () => {
  await renderApp();

  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  expect(confirmButton).toBeDisabled();

  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(email, { target: { value: fieldsValue.email } });
  fireEvent.change(confirmEmail, { target: { value: 'test@t.com' } });

  expect(confirmButton).toBeDisabled();
});

test('test with email and confirm email modified and equal, so enabled button', async () => {
  const { history, store } = await renderApp();

  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  expect(confirmButton).toBeDisabled();

  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(email, { target: { value: fieldsValue.email } });
  fireEvent.change(confirmEmail, { target: { value: fieldsValue.confirmEmail } });

  expect(confirmButton).toBeEnabled();
  fireEvent.click(confirmButton);

  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/1/prod-io/users'));
  await waitFor(() => screen.getByText('Test Completato'));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE MODIFICATO',
    message: (
      <>
        <Trans i18nKey="userEdit.editRegistryForm.editUserSuccess.message">
          Hai modificato correttamente i dati di
          <strong>
            {{
              user: 'elena verdi',
            }}
          </strong>
          .
        </Trans>
      </>
    ),
  });
});
