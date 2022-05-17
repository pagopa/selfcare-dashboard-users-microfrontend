import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { Trans } from 'react-i18next';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentProductUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

jest.setTimeout(100000);

const renderApp = async (institutionId: string = 'onboarded', productId: string = 'prod-io') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${institutionId}/${productId}/users`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getByText('Utenti'));
  await waitFor(() =>
    screen.getByText(
      'Gestisci i Referenti Amministrativi e Operativi abilitati alla gestione del prodotto App IO'
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
  const actionButton = screen.getByTestId('action-uid3');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Modifica')));
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid3/edit')
  );
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
    title: 'REFERENTE SOSPESO',
    message: (
      <Trans i18nKey="userDetail.actions.changeUserStatus.oneRoleOnProduct.message">
        Hai {{ userStatus: 'sospeso' }} correttamente il referente
        <strong> {{ user: 'Elena Verdi' }}</strong>.
      </Trans>
    ),
  });
});

test('test rehabilitate user from row action', async () => {
  await renderApp();
  const actionButton = screen.getByTestId('action-uid3');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Riabilita')));
  await waitFor(() => screen.getByText('Riabilita Referente'));
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'REFERENTE RIABILITATO',
    message: (
      <Trans i18nKey="userDetail.actions.changeUserStatus.oneRoleOnProduct.message">
        Hai {{ userStatus: 'riabilitato' }} correttamente il referente
        <strong> {{ user: 'Simone3 Bianchi3 Verdi Verdi Verdi' }}</strong>.
      </Trans>
    ),
  });
});

test('test delete user from row action', async () => {
  await renderApp();
  const actionButton = screen.getByTestId('action-uid3');
  fireEvent.click(actionButton);
  await waitFor(() => fireEvent.click(screen.getByText('Elimina')));
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByText('Conferma');
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'REFERENTE ELIMINATO',
    message: (
      <Trans i18nKey="userDetail.actions.deleteUser.message">
        {'Hai eliminato correttamente il referente '}
        <strong>
          {{
            user: 'Simone3 Bianchi3 Verdi Verdi Verdi',
          }}
        </strong>
        {'.'}
      </Trans>
    ),
  });
});
