import {
  fireEvent,
  getAllByText,
  getByRole,
  getByText,
  screen,
  waitFor
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentUser.test';

jest.mock('@pagopa/selfcare-common-frontend/lib/decorators/withLogin');
jest.mock('../../../services/usersService');
jest.mock('../../../services/groupsService');

jest.setTimeout(10000);

const renderApp = async (partyId: string = 'onboarded', userId: string = 'uid') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/users/${userId}`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getByText('Nome'));
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
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid/edit')
  );
  await waitFor(() => screen.getByRole('heading', { name: 'Modifica il profilo utente' }));
});

test.skip('Test: go to users Page', async () => {
  const { history } = await renderApp();
  const backButton = screen.getByRole('button', { name: 'Indietro' });
  fireEvent.click(backButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users'));
});

test('Test: go to assign new role from CTA', async () => {
  const { history } = await renderApp();
  const assignNewRoleButton = screen.getByText('Assegna ruolo');
  fireEvent.click(assignNewRoleButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid/add-product')
  );
  screen.getByText('Assegna un nuovo ruolo');
});

test('Test: suspend user', async () => {
  const { store } = await renderApp();
  const suspendUserButton = screen.getByText('Sospendi');
  fireEvent.click(suspendUserButton);
  screen.getByText('Sospendi ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Sospendi' });
  fireEvent.click(confirmButton);

  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo sospeso correttamente',
  });
});

test('Test: rehabilitate user', async () => {
  const { store } = await renderApp();
  const rehabilitateUserButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(rehabilitateUserButton);
  screen.getByText('Riabilita ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(confirmButton);

  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo riabilitato correttamente',
  });
});

test('Test: assign group to user', async () => {
  const { store } = await renderApp();
  const assignGroupButton = await waitFor(() =>
    getByText(document.body, 'Assegna gruppo', { exact: false })
  );
  fireEvent.click(assignGroupButton);

  const dialogNode = getByRole(document.body, 'dialog');
  const assignGroupButtonConfirm = getAllByText(dialogNode, 'Assegna gruppo', { exact: false })[1];
  expect(assignGroupButtonConfirm).toBeDisabled();

  const selectGroup = document.getElementById('group-select');

  fireEvent.mouseDown(selectGroup);

  await waitFor(() => fireEvent.click(screen.getByText('Gruppo7')));

  await waitFor(() => expect(assignGroupButtonConfirm).toBeEnabled());

  await waitFor(() => fireEvent.click(assignGroupButtonConfirm));

  const notifies = await waitFor(() => store.getState().appState.userNotifies);
  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));

  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Utente assegnato correttamente',
  });
});

test('Test: delete a user', async () => {
  const { history, store } = await renderApp();
  const deleteButton = screen.getByRole('button', { name: 'Rimuovi' });
  fireEvent.click(deleteButton);
  screen.getAllByText('Rimuovi ruolo')[1];
  const confirmButton = screen.getByRole('button', { name: 'Rimuovi' });
  fireEvent.click(confirmButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users'));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Utente rimosso correttamente',
    message: '',
  });
});
