import { screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import '../../locale';
import { renderComponent } from './RenderComponents/RenderComponentProductUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../services/usersService');

jest.setTimeout(100000);

const renderApp = async (institutionId: string = 'onboarded', productId: string = 'prod-io') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${institutionId}/${productId}/users`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getByText('Utenti'));
  await waitFor(() => screen.getByText('EMAIL'));
  return output;
};

const toVerifyPath = async (path: string, title: string, history: History, subTitle?: string) => {
  expect(screen.queryByPlaceholderText(title)).toBeNull();
  history.push(path);
  await waitFor(() => screen.queryByPlaceholderText(title));
};

test('test routing user product detail ', async () => {
  const { history } = await renderApp();
  await toVerifyPath('/dashboard/onboarded/prod-io/users/uid', 'Profilo Utente', history);
});

test('test routing user product list', async () => {
  const { history } = await renderApp();
  await toVerifyPath(
    '/dashboard/onboarded/prod-io/users',
    'Utenti',
    history,
    'Gestisci i Referenti Amministrativi e Operativi abilitati alla gestione del prodotto App IO'
  );
});

test('test routing add new user product', async () => {
  const { history } = await renderApp();
  await toVerifyPath(
    '/dashboard/onboarded/prod-io/users/add',
    'Aggiungi un Referente',
    history,
    'Inserisci i dati della persona che vuoi autorizzare a gestire App IO'
  );
});

test('test routing modify user product', async () => {
  const { history } = await renderApp();
  await toVerifyPath(
    '/dashboard/onboarded/prod-io/users/uid/edit',
    'Modifica il profilo utente',
    history
  );
});
