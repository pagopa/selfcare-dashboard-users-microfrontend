import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { Trans } from 'react-i18next';
import { Route, Router, Switch } from 'react-router-dom';
import { createStore } from '../../../redux/store';
import AddUsersPage from '../AddUsersPage';
import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import {
  mockedPartyProducts,
  mockedProductRoles,
} from '../../../microcomponents/mock_dashboard/data/product';
import { productRoles2ProductRolesList, ProductsRolesMap } from '../../../model/ProductRole';
import { Provider } from 'react-redux';
import { verifyMockExecution as verifyLoginMockExecution } from '../../../__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin';

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
  history.push('/1');
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/:partyId" exact={true}>
            <AddUsersPage
              party={mockedParties[0]}
              activeProducts={mockedPartyProducts}
              productsRolesMap={
                productRoles2ProductRolesList(mockedProductRoles)
                  .groupByPartyRole as unknown as ProductsRolesMap
              }
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

test.skip('test with empty fields, so disabled button', async () => {
  await renderApp();

  const button = screen.getByRole('button', { name: 'Continua' });

  expect(button).toBeDisabled();
});

test('test with fields that respect rules, so enabled button', async () => {
  const { store } = await renderApp();

  const taxCode = document.querySelector('#taxCode');
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');
  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');
  const products = screen.getByTestId('select-products');

  fireEvent.change(taxCode, { target: { value: fieldsValue.taxCode } });

  await waitFor(() => expect(email).toBeEnabled());

  fireEvent.change(name, { target: { value: fieldsValue.name } });
  fireEvent.change(surname, { target: { value: fieldsValue.surname } });
  fireEvent.change(email, { target: { value: fieldsValue.email } });
  fireEvent.change(confirmEmail, { target: { value: fieldsValue.confirmEmail } });

  fireEvent.change(products, { target: { name: 'products' } });
  await waitFor(() => fireEvent.click(products));

  await waitFor(() => screen.getByText('App IO'));

  const selection = screen.getByRole('textbox', { name: 'inputlabelproducts' });
  await waitFor(() => fireEvent.click(selection));
  const options = screen.getByTestId('product: prod-io');
  await waitFor(() => fireEvent.click(options));

  const checkbox = document.querySelector(
    'input[value="incaricato-ente-creditore"]'
  ) as HTMLElement;
  expect(checkbox).toBeEnabled();
  fireEvent.click(checkbox);

  const button = screen.getByText('Continua');
  await waitFor(() => expect(button).toBeEnabled());
  await waitFor(() => fireEvent.click(button));

  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'SessionModal',
    title: 'Assegna ruolo',
    message: (
      <Trans i18nKey="userEdit.addForm.addOneRoleModal.message">
        {'Vuoi assegnare a '}
        <strong>{{ user: 'franco rossi ' }}</strong>
        {'il ruolo di '}
        <strong>
          {{
            role: 'Incaricato Ente Creditore',
          }}
        </strong>
        {' sul prodotto '}
        <strong>{{ productTitle: 'App IO' }}</strong>
        {'?'}
        {
          <>
            <br></br>
            <br></br>
          </>
        }
      </Trans>
    ),
  });
  await waitFor(() => fireEvent.click(button));
});

test.skip('test with taxCode field that respect rules, so all field are enabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode') as HTMLInputElement;
  const name = document.querySelector('#name') as HTMLInputElement;
  const surname = document.querySelector('#surname') as HTMLInputElement;
  const email = document.querySelector('#email') as HTMLInputElement;
  const confirmEmail = document.querySelector('#confirmEmail') as HTMLInputElement;

  fireEvent.change(taxCode, { target: { value: fieldsValue.taxCode } });
  expect(name).toBeEnabled();
  expect(surname).toBeEnabled();
  expect(email).toBeEnabled();
  expect(confirmEmail).toBeEnabled();

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeNull();
  });
});

test.skip('test with empty taxCode field, so all field are disabled', async () => {
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

  await waitFor(() => expect(document.querySelector('select-label-products')).toBeNull());

  await waitFor(() => {
    const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
    expect(checkbox).toBeNull();
  });
});

test.skip('test with taxCode field that doesnt respect rules, so all field are disabled', async () => {
  await renderApp();

  const taxCode = document.querySelector('#taxCode') as HTMLInputElement;
  const name = document.querySelector('#name') as HTMLInputElement;
  const surname = document.querySelector('#surname') as HTMLInputElement;
  const email = document.querySelector('#email') as HTMLInputElement;
  const confirmEmail = document.querySelector('#confirmEmail') as HTMLInputElement;
  const selectProduct = document.querySelector('select-label-products') as HTMLInputElement;

  fireEvent.change(taxCode, { target: { value: 'AAAAA23' } });
  await waitFor(() => expect((taxCode as HTMLInputElement).value).toBe('AAAAA23'));
  expect(name).toBeDisabled();
  expect(surname).toBeDisabled();
  expect(email).toBeDisabled();
  expect(confirmEmail).toBeDisabled();
  expect(selectProduct).toBeNull();

  const checkbox = document.querySelector('input[value="incaricato-ente-creditore"]');
  expect(checkbox).toBeNull();
});
