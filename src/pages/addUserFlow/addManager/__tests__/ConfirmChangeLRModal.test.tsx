import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import { ConfirmChangeLRModal } from '../components/ConfirmChangeLRModal';

const onclose = jest.fn();
const onConfirm = jest.fn();

test('should render ConfirmChangeLRModal', () => {
  renderWithProviders(
    <ConfirmChangeLRModal
      open={true}
      onClose={onclose}
      onConfirm={onConfirm}
      managerFullName={''}
    />
  );
});

test('onClose of modal', () => {
  renderWithProviders(
    <ConfirmChangeLRModal
      open={true}
      onClose={onclose}
      onConfirm={onConfirm}
      managerFullName={'Name Surname'}
    />
  );
  const button = screen.getByRole('button', { name: 'Indietro' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(onclose).toHaveBeenCalled();
});

test('onConfirm of modal', () => {
  renderWithProviders(
    <ConfirmChangeLRModal
      open={true}
      onClose={onclose}
      onConfirm={onConfirm}
      managerFullName={'Name Surname'}
    />
  );

  const button = screen.getByRole('button', { name: 'Continua' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(onConfirm).toHaveBeenCalled();
});
