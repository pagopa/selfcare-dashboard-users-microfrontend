import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { store } from '../../../redux/store';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { Trans } from 'react-i18next';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentProductUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

jest.setTimeout(6000);

const renderApp = async (
  partyId: string = 'onboarded',
  productId: string = 'prod-io',
  userId: string = 'uid'
) => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/${productId}/users/${userId}`);
  const output = renderComponent(store, history);
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
  screen.getByText('Sospendi ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Ruolo sospeso correttamente',
  });
});

test('Test: rehabilitate user', async () => {
  await renderApp('onboarded', 'prod-io', 'uid3');
  const rehabilitateUserButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(rehabilitateUserButton);
  screen.getByText('Riabilita ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Ruolo riabilitato correttamente',
  });
});

test('Test: delete an user', async () => {
  const { history } = await renderApp('onboarded', 'prod-io', 'uid');
  const deleteButton = screen.getByRole('button', { name: 'Elimina' });
  fireEvent.click(deleteButton);
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users'));
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
