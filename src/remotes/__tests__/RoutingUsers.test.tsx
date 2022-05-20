import { screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import '../../locale';
import { renderComponent } from './RenderComponents/RenderComponentUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../services/usersService');

jest.setTimeout(100000);

const renderApp = async (partyId: string = 'onboarded') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/users`);
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

const toVerifyPath = async (path: string, title: string, history: History, subTitle?: string) => {
  expect(screen.queryByPlaceholderText(title)).toBeNull();
  history.push(path);
  await waitFor(() => screen.queryByPlaceholderText(title));
};

test('test routing user detail for onboarded institution', async () => {
  const { history } = await renderApp();
  await toVerifyPath('/dashboard/onboarded/users/uid', 'Dettaglio Referente', history);
});

test('test routing user list for onboarded institution', async () => {
  const { history } = await renderApp();
  await toVerifyPath(
    '/dashboard/onboarded/users',
    'Utenti',
    history,
    'Visualizza e gestisci i ruoli assegnati agli utenti per i prodotti a cui l’ente ha aderito.'
  );
});

test('test routing add new user for onboarded institution', async () => {
  const { history } = await renderApp();
  await toVerifyPath(
    '/dashboard/onboarded/users/add',
    'Aggiungi un Referente',
    history,
    'Inserisci i dati della persona che vuoi autorizzare a gestire i prodotti per il AGENCY ONBOARDED.'
  );
});

test('test routing modify user for onboarded institution', async () => {
  const { history } = await renderApp();
  await toVerifyPath('/dashboard/onboarded/users/uid/edit', 'Modifica il profilo utente', history);
});

test('test routing add product for onboarded institution', async () => {
  const { history } = await renderApp();
  await toVerifyPath('/dashboard/onboarded/users/uid/add-product', 'Aggiungi Prodotto', history);
});
