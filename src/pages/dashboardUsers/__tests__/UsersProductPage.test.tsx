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
  await waitFor(() => screen.getByText('Nome'));
  return output;
};

test('test render', async () => {
  await renderApp();
});

test('test add new user', async () => {
  const { history } = await renderApp();
  const addNewUserButton = screen.getByRole('button', { name: 'Aggiungi utente' });
  fireEvent.click(addNewUserButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users/add')
  );
  screen.getByRole('heading', { name: 'Aggiungi un nuovo utente' });
});

test('test filter users from role ', async () => {
  await renderApp();
  const filterButton = screen.getByRole('button', { name: 'Filtra' });
  expect(filterButton).toBeDisabled();
  const rolesFilter = screen.getByRole('button', { name: 'Tutti i ruoli' });
  fireEvent.click(rolesFilter);
  const adminRole = screen.getByRole('checkbox', { name: 'Amministratore' });
  fireEvent.click(adminRole);
  expect(filterButton).toBeEnabled();
  fireEvent.click(filterButton);
  screen.getAllByText('Incaricato Ente Creditore');
});
