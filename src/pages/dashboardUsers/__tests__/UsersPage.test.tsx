import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentUser.test';

jest.mock('@pagopa/selfcare-common-frontend/lib/decorators/withLogin');
jest.mock('../../../services/usersService');

jest.mock('../../../hooks/useIsMobile', () => ({
  useIsMobile: jest.fn(),
}));

import { useIsMobile } from '../../../hooks/useIsMobile';

jest.setTimeout(100000);

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const renderApp = async (partyId: string = 'onboarded') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/users`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getAllByText('Nome')[0]);
  await waitFor(() =>
    screen.getByText(
      'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.'
    )
  );
  await waitFor(() => screen.getAllByText('loggedName.b@email.it'));
  return output;
};

test('test render', async () => {
  await renderApp();
});

test('test add new user', async () => {
  const { history } = await renderApp();
  const addNewUserButton = screen.getByRole('button', { name: 'Aggiungi utente' });
  fireEvent.click(addNewUserButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users/add'));
  screen.getByRole('heading', { name: 'Aggiungi un nuovo utente' });
});

test('test filter users from role', async () => {
  await renderApp();
  const filterButton = screen.getByRole('button', { name: 'Filtra' });
  expect(filterButton).toBeDisabled();
  const rolesFilter = screen.getByText('Tutti i ruoli');
  fireEvent.mouseDown(rolesFilter);
  const userRole = screen.getAllByText('Amministratore')[0];
  fireEvent.click(userRole);
  expect(filterButton).toBeEnabled();
  fireEvent.click(filterButton);
  screen.getAllByText('Incaricato Ente Creditore');
});

test('renders desktop version when isMobile is false', async () => {
  (useIsMobile as jest.Mock).mockReturnValue(false);

  await renderApp();

  const tableProdNames = await screen.findAllByText('App IO');

  fireEvent.click(tableProdNames[0]);
});

test('renders mobile version when isMobile is true', async () => {
  (useIsMobile as jest.Mock).mockReturnValue(true);

  await renderApp();

  const mobileFilterButton = await screen.findByText('Filtra');

  expect(mobileFilterButton).toBeInTheDocument();

  fireEvent.click(mobileFilterButton);

  const searchByName = await screen.findByLabelText('Cerca per nome');

  expect(searchByName).toBeInTheDocument();

  fireEvent.change(searchByName, { target: { value: 'test' } });

  const deleteFilters = await screen.findByText('Rimuovi filtri');

  fireEvent.click(deleteFilters);
});
