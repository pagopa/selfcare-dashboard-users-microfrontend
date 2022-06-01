import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentProductUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

jest.setTimeout(100000);

const renderApp = async (partyId: string = 'onboarded', productId: string = 'prod-io') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/${productId}/users`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getAllByText('Utenti'));
  await waitFor(() =>
    screen.getByText(
      'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.'
    )
  );
  await waitFor(() => screen.getByText('EMAIL'));
  return output;
};

test('test render', async () => {
  await renderApp();
});

test('test add new user', async () => {
  const { history } = await renderApp();
  const addNewUserButton = screen.getByRole('button', { name: 'Aggiungi' });
  fireEvent.click(addNewUserButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users/add')
  );
  screen.getByRole('heading', { name: 'Aggiungi un nuovo utente' });
});

test('test filter users from role ', async () => {
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
  const actionButton = screen.getByTestId('action-uid3');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Modifica')));
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users/uid3/edit')
  );
});

test('test suspend user from row action', async () => {
  const { store } = await renderApp();
  const actionButton = screen.getByTestId('action-uid');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Sospendi')));
  await waitFor(() => screen.getByText('Sospendi ruolo'));
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo sospeso correttamente',
  });
});

test('test rehabilitate user from row action', async () => {
  const { store } = await renderApp();
  const actionButton = screen.getByTestId('action-uid3');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Riabilita')));
  await waitFor(() => screen.getByText('Riabilita ruolo'));
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo riabilitato correttamente',
  });
});

test('test delete user from row action', async () => {
  const { store } = await renderApp();
  const actionButton = screen.getByTestId('action-uid3');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Rimuovi')));
  screen.getByText('Rimuovi ruolo');
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  await waitFor(() => expect(store.getState().appState.userNotifies).toHaveLength(1));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Ruolo rimosso correttamente',
    message: '',
  });
});
