import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { useIsMobile } from '../../../hooks/useIsMobile';
import '../../../locale';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentUser.test';

vi.mock('@pagopa/selfcare-common-frontend/lib/decorators/withLogin', () => ({
  __esModule: true,
  default: (Component: any) => Component,
}));

vi.mock('../../../services/usersService');

vi.mock('../../../hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  // Set a safe default so tests that don't care about mobile/desktop still work.
  (useIsMobile as ReturnType<typeof vi.fn>).mockReturnValue(false);
  cleanup();
});

const renderApp = async (partyId: string = 'onboarded') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/users`);

  const output = renderComponent(undefined, history);

  await waitFor(() => screen.getAllByText('Nome')[0]);
  await waitFor(() =>
    screen.getByText(
      "Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l'ente ha aderito."
    )
  );
  await waitFor(() => screen.getAllByText('loggedName.b@email.it'));

  return output;
};

test.skip('test render', async () => {
  await renderApp();
});

test.skip('test add new user', async () => {
  const { history } = await renderApp();

  const addNewUserButton = screen.getByRole('button', { name: 'Aggiungi utente' });
  fireEvent.click(addNewUserButton);

  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users/add'));
  screen.getByRole('heading', { name: 'Aggiungi un nuovo utente' });
});

test.skip('test filter users from role', async () => {
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

test.skip('renders desktop version when isMobile is false', async () => {
  (useIsMobile as ReturnType<typeof vi.fn>).mockReturnValue(false);

  await renderApp();

  const tableProdNames = await screen.findAllByText('App IO');
  fireEvent.click(tableProdNames[0]);
});

test.skip('renders mobile version when isMobile is true', async () => {
  (useIsMobile as ReturnType<typeof vi.fn>).mockReturnValue(true);

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