import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { store } from '../../../redux/store';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentUser.test';
import { Trans } from 'react-i18next';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const renderApp = async (partyId: string = 'onboarded', userId: string = 'uid') => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/users/${userId}`);
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
    expect(history.location.pathname).toBe('/dashboard/onboarded/users/uid/edit')
  );
  screen.getByRole('heading', { name: 'Modifica il profilo utente' });
});

test('Test: go to users Page', async () => {
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
  await renderApp();
  const suspendUserButton = screen.getByText('Sospendi');
  fireEvent.click(suspendUserButton);
  screen.getByText('Sospendi ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Ruolo sospeso correttamente',
  });
});

test('Test: rehabilitate user', async () => {
  await renderApp();
  const rehabilitateUserButton = screen.getByRole('button', { name: 'Riabilita' });
  fireEvent.click(rehabilitateUserButton);
  screen.getByText('Riabilita ruolo');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  expect({
    component: 'Toast',
    title: 'Ruolo riabilitato correttamente',
  });
});

test('Test: delete a user', async () => {
  const { history, store } = await renderApp();
  const deleteButton = screen.getByRole('button', { name: 'Elimina' });
  fireEvent.click(deleteButton);
  screen.getByText('Elimina Referente');
  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  fireEvent.click(confirmButton);
  await waitFor(() => expect(history.location.pathname).toBe('/dashboard/onboarded/users'));
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'REFERENTE ELIMINATO',
    message: (
      <Trans i18nKey="userDetail.actions.deleteUser.message">
        {'Hai eliminato correttamente il referente '}
        <strong>
          {{
            user: 'Elena Verdi',
          }}
        </strong>
        {'.'}
      </Trans>
    ),
  });
});
