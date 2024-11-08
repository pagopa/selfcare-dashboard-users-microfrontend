import React from 'react';
import { renderWithProviders } from '../../../../utils/test-utils';
import { ConfirmChangeLRModal } from '../ConfirmChangeLRModal';
import { fireEvent, screen } from '@testing-library/react';
const onclose = jest.fn();
const onConfirm = jest.fn();
test('should render ConfirmChangeLRModal', () => {
  renderWithProviders(<ConfirmChangeLRModal open={true} onClose={onclose} onConfirm={onConfirm} />);
});

test('onClose of modal', () => {
  renderWithProviders(<ConfirmChangeLRModal open={true} onClose={onclose} onConfirm={onConfirm} />);
  const button = screen.getByRole('button', { name: 'userEdit.addForm.backButton' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(onclose).toHaveBeenCalled();
})

test('onConfirm of modal', () => {
  renderWithProviders(<ConfirmChangeLRModal open={true} onClose={onclose} onConfirm={onConfirm} />);
  const button = screen.getByRole('button', { name: 'userEdit.addForm.continueButton' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(onConfirm).toHaveBeenCalled();
})