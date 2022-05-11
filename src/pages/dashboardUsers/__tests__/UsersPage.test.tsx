import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { renderComponent as routingUsers } from '../../../remotes/__tests__/RoutingUsers.test';
import { Trans } from 'react-i18next';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const renderApp = async (institutionId: string = 'onboarded') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${institutionId}/users`);
  const output = routingUsers(undefined, history);
  await waitFor(() => screen.getByText('Utenti'));
  return output;
};

test('test render', async () => {
  await renderApp();
});

test('test add new user', async () => {
  const { history } = await renderApp();
  const addNewUserButton = screen.getByRole('button', { name: 'Aggiungi' });
  fireEvent.click(addNewUserButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users/add'));
  screen.getByRole('heading', { name: 'Aggiungi un Referente' });
});

test('test filter users from role', async () => {
  await renderApp();
  const rolesFilter = screen.getByRole('button', { name: 'Tutti i ruoli' });
  fireEvent.click(rolesFilter);
  const filterButton = screen.getByRole('button', { name: 'Filtra' });
  expect(filterButton).toBeDisabled();
  const adminRole = screen.getByRole('checkbox', { name: 'Amministratore' });
  fireEvent.click(adminRole);
  expect(filterButton).toBeEnabled();
  fireEvent.click(filterButton);
  screen.getAllByText('Incaricato Ente Creditore');
});

test('test edit user anagraphic from row action', async () => {
  const { history } = await renderApp();
  const rowActions = screen.getByTestId('MoreVertIcon');
  fireEvent.click(rowActions);
  const editAction = screen.getByText('Modifica');
  fireEvent.click(editAction);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid/edit')
  );
  screen.getByRole('heading', { name: 'Modifica il profilo utente' });
});

test('test suspend user from row action', async () => {
  const { store, history } = await renderApp();
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users'));
  const rowActions = await screen.findByRole('buttonIcon');
  fireEvent.click(rowActions.firstChild);
  const suspendAction = screen.getByText('Sospendi');
  fireEvent.click(suspendAction);
  screen.getByText('Sospendi Referente');
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
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

test('test delete user from row action', async () => {
  const { store } = await renderApp();
  const rowActions = screen.queryByTestId('MoreVertIcon');
  expect(rowActions.firstElementChild).not.toBeNull();
  await fireEvent.click(rowActions);
  const editAction = screen.getByRole('menuitem', { name: 'Elimina' });
  fireEvent.click(editAction);
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE ELIMINATO',
    message: (
      <Trans i18nKey="userDetail.actions.deleteUser.message">
        {'Hai eliminato correttamente il referente '}
        <strong>
          {{
            user: 'Elena Verdi',
          }}
        </strong>
        {'.'}
      </Trans>
    ),
  });
});
