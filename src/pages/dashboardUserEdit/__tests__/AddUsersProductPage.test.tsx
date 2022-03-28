import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, store } from '../../../redux/store';
import { mockedParties } from '../../../services/__mocks__/partyService';
import { mockedPartyProducts } from '../../../services/__mocks__/productService';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { verifyMockExecution as verifyLoginMockExecution } from '../../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import AddUsersProductPage from '../AddUsersProductPage';
import { productRoles2ProductRolesList } from '../../../model/ProductRole';
import { mockedProductRoles } from '../../../services/__mocks__/usersService';
import './../../../locale';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const fieldsValue = {
  taxCode: 'AAAAAA11A11A234S',
  name: 'franco',
  surname: 'rossi',
  email: 'NAME@SURNAME.COM',
  confirmEmail: 'NAME@SURNAME.COM',
};

const renderApp = async (injectedStore?: ReturnType<typeof createStore>) => {
  const store = injectedStore ? injectedStore : createStore();
  verifyLoginMockExecution(store.getState());
  const history = createMemoryHistory();
  history.push('/1/prod-io');
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/:institutionId/:productId" exact={true}>
            <AddUsersProductPage
              party={mockedParties[0]}
              activeProducts={mockedPartyProducts}
              selectedProduct={mockedPartyProducts[0]}
              productRolesList={productRoles2ProductRolesList(mockedProductRoles)}
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
  await waitFor(() => screen.getByText('Ruolo'));
  return { history, store };
};

test('test with empty fields, so disabled button', async () => {
  await renderApp();

  const button = screen.getByRole('button', { name: 'Conferma' });

  expect(button).toBeDisabled();
});

test('test with fields that respect rules, so enabled button', async () => {
  const { history, store } = await renderApp();

  const taxCode = document.querySelector('#taxCode');
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');
  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(taxCode, { target: { value: fieldsValue.taxCode } });

  await waitFor(() => expect(name).toBeEnabled());

  fireEvent.change(name, { target: { value: fieldsValue.name } });
  fireEvent.change(surname, { target: { value: fieldsValue.surname } });
  fireEvent.change(email, { target: { value: fieldsValue.email } });
  fireEvent.change(confirmEmail, { target: { value: fieldsValue.confirmEmail } });

  const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
  expect(checkbox).toBeEnabled();
  fireEvent.click(checkbox);

  const button = screen.getByText('Conferma');
  await waitFor(() => expect(button).toBeEnabled());
  await waitFor(() => fireEvent.click(button));

  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/1/prod-io/users'));
  await waitFor(() => screen.getByText('Test Completato'));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE AGGIUNTO',
    message: (
      <>
        {'Hai aggiunto correttamente '}
        <strong>franco rossi</strong>
        {'.'}
      </>
    ),
  });
});

test('test with taxCode field that respect rules, so all field are enabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode');
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');
  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(taxCode, { target: { value: fieldsValue.taxCode } });
  expect(name).toBeEnabled();
  expect(surname).toBeEnabled();
  expect(email).toBeEnabled();
  expect(confirmEmail).toBeEnabled();

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeEnabled();
  });
});

test('test with empty taxCode field, so all field are disabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode');
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');
  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(taxCode, { target: { value: '' } });

  expect(name).toBeDisabled();
  expect(surname).toBeDisabled();
  expect(email).toBeDisabled();
  expect(confirmEmail).toBeDisabled();

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeDisabled();
  });
});

test('test with taxCode field that doesnt respect rules, so all field are disabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode');
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');
  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(taxCode, { target: { value: 'AAAAA23' } });
  await waitFor(() => expect((taxCode as HTMLInputElement).value).toBe('AAAAA23'));
  expect(name).toBeDisabled();
  expect(surname).toBeDisabled();
  expect(email).toBeDisabled();
  expect(confirmEmail).toBeDisabled();

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeDisabled();
  });
});
