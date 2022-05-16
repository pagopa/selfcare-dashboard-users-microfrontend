import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { store } from '../../../redux/store';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { renderComponent as routingProductUsers } from '../../../remotes/__tests__/RoutingProductUsers.test';
import { Trans } from 'react-i18next';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const renderApp = async (
  institutionId: string = 'onboarded',
  productId: string = 'prod-io',
  userId: string = 'uid'
) => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${institutionId}/${productId}/users/${userId}`);
  const output = routingProductUsers(store, history);
  await waitFor(() => screen.getByText('Profilo Utente'));
  return output;
};

test('test render', async () => {
  await renderApp();
});

test('Test: go to edit user', async () => {
  const { history } = await renderApp();
  const editButton = screen.getByRole('button', { name: 'Modifica' });
  expect(editButton).toBeEnabled();
  fireEvent.click(editButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users/uid/edit')
  );
  screen.getByRole('heading', { name: 'Modifica il profilo utente' });
});

test('Test: go to users Page', async () => {
  const { history } = await renderApp();
  const backButton = screen.getByRole('button', { name: 'Indietro' });
  fireEvent.click(backButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users'));
});

test('Test: go to assign new role from CTA', async () => {
  await renderApp('onboarded', 'prod-io', 'uid16');
  const assignNewRoleButton = screen.getByText('+ Assegna un altro ruolo');
  fireEvent.click(assignNewRoleButton);
  screen.getByText('Assegna ruolo');
  const checkRole = document.querySelector('input[value="referente-dei-pagamenti"]');
  expect(checkRole).toBeEnabled();
  fireEvent.click(checkRole);
  expect({
    component: 'Toast',
    title: 'Ruolo assegnato',
    message: (
      <Trans i18nKey="userDetail.actions.successfulAddRole.message">
        {'Hai aggiunto correttamente il ruolo'}
        {{ role: 'Referente dei Pagamenti' }}
        {' per il referente '}
        <strong>{{ user: 'Simone16 Bianchi16' }}</strong>
      </Trans>
    ),
  });
});

test('Test: suspend user', async () => {
  await renderApp('onboarded', 'prod-io', 'uid16');
  const suspendUserButton = screen.getByText('Sospendi');
  fireEvent.click(suspendUserButton);
  screen.getByText('Sospendi Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'REFERENTE SOSPESO',
    message: (
      <Trans i18nKey="userDetail.actions.changeUserStatus.oneRoleOnProduct.message">
        Hai {{ userStatus: 'sospeso' }} correttamente il referente
        <strong> {{ user: 'Elena Verdi' }}</strong>.
      </Trans>
    ),
  });
});

test('Test: rehabilitate user', async () => {
  await renderApp('onboarded', 'prod-io', 'uid3');
  const rehabilitateUserButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(rehabilitateUserButton);
  screen.getByText('Riabilita Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'REFERENTE RIABILITATO',
    message: (
      <Trans i18nKey="userDetail.actions.changeUserStatus.oneRoleOnProduct.message">
        Hai {{ userStatus: 'riabilitato' }} correttamente il referente
        <strong> {{ user: 'Elena Verdi' }}</strong>.
      </Trans>
    ),
  });
});

test('Test: delete a user', async () => {
  const { history } = await renderApp('c_b429', 'prod-interop', 'uid11');
  const deleteButton = screen.getByRole('button', { name: 'Elimina' });
  fireEvent.click(deleteButton);
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/c_b429/prod-interop/users')
  );
  expect({
    component: 'Toast',
    title: 'REFERENTE ELIMINATO',
    message: (
      <Trans i18nKey="userDetail.actions.deleteUser.message">
        {'Hai eliminato correttamente il referente '}
        <strong>
          {{
            user: 'Simone11 Bianchi11',
          }}
        </strong>
        {'.'}
      </Trans>
    ),
  });
});
