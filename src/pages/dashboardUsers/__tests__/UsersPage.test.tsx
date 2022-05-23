import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { Trans } from 'react-i18next';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

jest.setTimeout(100000);

const renderApp = async (institutionId: string = 'onboarded') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${institutionId}/users`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getByText('Utenti'));
  await waitFor(() =>
    screen.getByText(
      'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.'
    )
  );
  await waitFor(() => screen.getByText('simone.v@comune.milano.it'));
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
  screen.getByRole('heading', { name: 'Aggiungi un nuovo utente' });
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
  const actionButton = screen.getByTestId('action-uid');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Modifica')));
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid/edit')
  );
  screen.getByRole('heading', { name: 'Modifica il profilo utente' });
});

test('test suspend user from row action', async () => {
  await renderApp();
  const actionButton = screen.getByTestId('action-uid');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Sospendi')));
  await waitFor(() => screen.getByText('Sospendi Referente'));
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Utente sospeso correttamente',
  });
});

test('test rehabilitate user from row action', async () => {
  await renderApp();
  const actionButton = screen.getByTestId('action-uid3');
  await waitFor(() => fireEvent.click(actionButton));
  await waitFor(() => fireEvent.click(screen.getByText('Riabilita')));
  await waitFor(() => screen.getByText('Riabilita Referente'));
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Utente riabilitato correttamente',
  });
});

test('test delete user from row action', async () => {
  await renderApp();
  const actionButton = screen.getByTestId('action-uid6');
  await waitFor(() => fireEvent.click(actionButton));
  await waitFor(() => fireEvent.click(screen.getByText('Elimina')));
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Utente rimosso correttamente',
    message: '',
  });
});
