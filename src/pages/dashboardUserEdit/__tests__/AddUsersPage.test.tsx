import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import '../../../locale';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import {
  mockedPartyProducts,
  mockedProductRoles,
} from '../../../microcomponents/mock_dashboard/data/product';
import { productRoles2ProductRolesList } from '../../../model/ProductRole';
import { createStore, store } from '../../../redux/store';
// import { verifyMockExecution as verifyLoginMockExecution } from '../../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';
import AddUsersPage from '../../addUserFlow/AddUsersPage';

jest.setTimeout(6000);

jest.mock('i18next-browser-languagedetector');
jest.mock('@pagopa/selfcare-common-frontend/lib/decorators/withLogin');
jest.mock('../../../services/usersService');

const fieldsValue = {
  taxCode: 'RSSFNC80A01A794Q',
  name: 'franco',
  surname: 'rossi',
  email: 'NAME@SURNAME.COM',
  confirmEmail: 'NAME@SURNAME.COM',
};

const renderApp = async (injectedStore?: ReturnType<typeof createStore>) => {
  const store = injectedStore ? injectedStore : createStore();
  // verifyLoginMockExecution(store.getState());
  const history = createMemoryHistory();
  history.push('/1');
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/:partyId" exact={true}>
            <AddUsersPage
              party={mockedParties[0]}
              activeProducts={mockedPartyProducts}
              productsRolesMap={{
                [mockedPartyProducts[0].id]: productRoles2ProductRolesList(mockedProductRoles),
              }}
            />
          </Route>
          <Route path="/dashboard/1/users/newUserId" exact={true}>
            Test Completato
          </Route>
          <Route path="*"> {history.location.pathname}</Route>
        </Switch>
      </Router>
    </Provider>
  );
  return { history, store };
};

test('test with empty fields, so disabled button', async () => {
  await renderApp();

  const button = screen.getByRole('button', { name: 'Continua' });

  expect(button).toBeDisabled();
});

test('test with fields that respect rules, so enabled button', async () => {
  await renderApp(store);

  const taxCode = document.querySelector('#taxCode') as HTMLInputElement;
  const name = document.querySelector('#name') as HTMLInputElement;
  const surname = document.querySelector('#surname') as HTMLInputElement;
  const email = document.querySelector('#email') as HTMLInputElement;
  const confirmEmail = document.querySelector('#confirmEmail') as HTMLInputElement;
  const products = document.getElementById('mui-component-select-products') as HTMLDivElement;

  fireEvent.change(taxCode, { target: { value: fieldsValue.taxCode } });

  await waitFor(() => expect(email).toBeEnabled());

  expect(taxCode).toHaveValue(fieldsValue.taxCode);

  fireEvent.change(name, { target: { value: fieldsValue.name } });
  fireEvent.change(surname, { target: { value: fieldsValue.surname } });
  fireEvent.change(email, { target: { value: fieldsValue.email } });
  fireEvent.change(confirmEmail, { target: { value: fieldsValue.confirmEmail } });

  expect(name).toHaveValue(fieldsValue.name);
  /*
  fireEvent.change(products, { target: { name: 'products' } });
  await waitFor(() => fireEvent.mouseDown(products));

  const selectedProduct = await screen.findByText('App IO');
  await waitFor(() => fireEvent.click(selectedProduct));

  await waitFor(() => screen.getByText('Seleziona il ruolo che vuoi assegnare all’utente'));
  const selectedProductRole = document.querySelector(
    'input[value="incaricato-ente-creditore"]'
  ) as HTMLInputElement;
  fireEvent.click(selectedProductRole);

  const button = screen.getByText('Continua');
  await waitFor(() => expect(button).toBeEnabled());
  await waitFor(() => fireEvent.click(button));

  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  await waitFor(() => fireEvent.click(button));
  */
});

test('test with taxCode field that respect rules, so all field are enabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode') as HTMLInputElement;
  const name = document.querySelector('#name') as HTMLInputElement;
  const surname = document.querySelector('#surname') as HTMLInputElement;
  const email = document.querySelector('#email') as HTMLInputElement;
  const confirmEmail = document.querySelector('#confirmEmail') as HTMLInputElement;
  const products = document.getElementById('mui-component-select-products');

  fireEvent.change(taxCode, { target: { value: fieldsValue.taxCode } });
  expect(name).toBeEnabled();
  expect(surname).toBeEnabled();
  expect(email).toBeEnabled();
  expect(confirmEmail).toBeEnabled();
  expect(products).toBeEnabled();

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeNull();
  });
});

test('test with empty taxCode field, so all field are disabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode') as HTMLInputElement;
  const name = document.querySelector('#name') as HTMLInputElement;
  const surname = document.querySelector('#surname') as HTMLInputElement;
  const email = document.querySelector('#email') as HTMLInputElement;
  const confirmEmail = document.querySelector('#confirmEmail') as HTMLInputElement;

  fireEvent.change(taxCode, { target: { value: '' } });

  expect(name).toBeDisabled();
  expect(surname).toBeDisabled();
  expect(email).toBeDisabled();
  expect(confirmEmail).toBeDisabled();

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeNull();
  });
});

test('test with taxCode field that doesnt respect rules, so all field are disabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode') as HTMLInputElement;
  const name = document.querySelector('#name') as HTMLInputElement;
  const surname = document.querySelector('#surname') as HTMLInputElement;
  const email = document.querySelector('#email') as HTMLInputElement;
  const confirmEmail = document.querySelector('#confirmEmail') as HTMLInputElement;

  fireEvent.change(taxCode, { target: { value: 'AAAAA23' } });
  await waitFor(() => expect((taxCode as HTMLInputElement).value).toBe('AAAAA23'));
  expect(name).toBeDisabled();
  expect(surname).toBeDisabled();
  expect(email).toBeDisabled();
  expect(confirmEmail).toBeDisabled();

  const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
  expect(checkbox).toBeNull();
});
