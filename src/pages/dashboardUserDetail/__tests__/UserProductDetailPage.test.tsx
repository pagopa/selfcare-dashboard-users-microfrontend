import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
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
  const output = renderComponent(undefined, history);
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
  const { store } = await renderApp('onboarded', 'prod-io', 'uid16');
  const assignNewRoleButton = screen.getByText('+ Assegna un altro ruolo');
  fireEvent.click(assignNewRoleButton);
  screen.getByText('Assegna ruolo');
  const checkRole = document.querySelector('input[value="referente-dei-pagamenti"]');
  expect(checkRole).toBeEnabled();
  fireEvent.click(checkRole);

  fireEvent.click(screen.getByText('Conferma'));

  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo assegnato correttamente',
    message: '',
  });
});

test('Test: suspend user', async () => {
  const { store } = await renderApp('onboarded', 'prod-io', 'uid16');
  const suspendUserButton = screen.getByText('Sospendi');
  fireEvent.click(suspendUserButton);
  screen.getByText('Sospendi ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);

  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo sospeso correttamente',
  });
});

test('Test: rehabilitate user', async () => {
  const { store } = await renderApp('onboarded', 'prod-io', 'uid3');
  const rehabilitateUserButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(rehabilitateUserButton);
  screen.getByText('Riabilita ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);

  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo riabilitato correttamente',
    message: '',
  });
});

test('Test: delete an user', async () => {
  const { store, history } = await renderApp('onboarded', 'prod-io', 'uid');
  const deleteButton = screen.getByRole('button', { name: 'Elimina utente' });
  fireEvent.click(deleteButton);
  screen.getAllByText('Elimina utente')[1];
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users'));

  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Utente rimosso correttamente',
    message: '',
  });
});
