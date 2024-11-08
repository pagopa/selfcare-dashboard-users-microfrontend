import React from 'react';
import { renderWithProviders } from '../../../../utils/test-utils';
import { ConfimChangeLRModal } from '../ConfimChangeLRModal';
import { fireEvent, screen } from '@testing-library/react';
const onclose = jest.fn();
const onConfirm = jest.fn();
test('should render ConfimChangeLRModal', () => {
  renderWithProviders(<ConfimChangeLRModal open={true} onClose={onclose} onConfirm={onConfirm} />);
});

test('onClose of modal', () => {
  renderWithProviders(<ConfimChangeLRModal open={true} onClose={onclose} onConfirm={onConfirm} />);
  const button = screen.getByRole('button', { name: 'userEdit.addForm.backButton' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(onclose).toHaveBeenCalled();
})

test('onConfirm of modal', () => {
  renderWithProviders(<ConfimChangeLRModal open={true} onClose={onclose} onConfirm={onConfirm} />);
  const button = screen.getByRole('button', { name: 'userEdit.addForm.continueButton' });
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(onConfirm).toHaveBeenCalled();
})