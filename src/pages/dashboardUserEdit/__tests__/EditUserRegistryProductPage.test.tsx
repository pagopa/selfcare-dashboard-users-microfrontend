import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '../../../locale';
import { Trans } from 'react-i18next';
import { renderComponent } from '../../../remotes/__tests__/RenderComponents/RenderComponentProductUser.test';

jest.mock('@pagopa/selfcare-common-frontend/decorators/withLogin');
jest.mock('../../../services/usersService');

const renderApp = async (
  partyId: string = 'onboarded',
  productId: string = 'prod-io',
  userId: string = 'uid'
) => {
  const history = createMemoryHistory();
  history.push(`/dashboard/${partyId}/${productId}/users/${userId}/edit`);
  const output = renderComponent(undefined, history);
  await waitFor(() => screen.getByRole('heading', { name: 'Modifica il profilo utente' }));
  return output;
};

test('render test', async () => {
  await renderApp();
});

test('test back button', async () => {
  const { history } = await renderApp();
  const backButton = screen.getAllByText('Indietro')[1];
  expect(backButton).toBeEnabled();
  fireEvent.click(backButton);
  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users/uid')
  );
});

test('test with no modify, so disabled button', async () => {
  await renderApp();

  const button = screen.getByRole('button', { name: 'Conferma' });

  expect(button).toBeDisabled();
});

test('test with email and confirm email modified but different, so disabled button', async () => {
  await renderApp();

  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  expect(confirmButton).toBeDisabled();

  const email = document.getElementById('email');
  const confirmEmail = document.getElementById('confirmEmail');

  fireEvent.change(email, { target: { value: 'a@a.com' } });
  fireEvent.change(confirmEmail, { target: { value: 'test@t.com' } });

  await waitFor(() => expect(confirmButton).toBeDisabled());
});

test('test with email and confirm email modified and equal, so enabled button and complete edit with toast notification', async () => {
  const { history, store } = await renderApp();

  const confirmButton = screen.getByRole('button', { name: 'Conferma' });
  expect(confirmButton).toBeDisabled();

  const email = document.querySelector('#email');
  const confirmEmail = document.querySelector('#confirmEmail');

  fireEvent.change(email, { target: { value: 'test@test.com' } });
  fireEvent.change(confirmEmail, { target: { value: 'test@test.com' } });

  expect(confirmButton).toBeEnabled();
  fireEvent.click(confirmButton);

  await waitFor(() =>
    expect(history.location.pathname).toBe('/dashboard/onboarded/prod-io/users/uid')
  );
  const notifies = store.getState().appState.userNotifies;
  expect(notifies).toHaveLength(1);
  expect(notifies[0]).toMatchObject({
    component: 'Toast',
    title: 'Profilo modificato correttamente',
  });
});
