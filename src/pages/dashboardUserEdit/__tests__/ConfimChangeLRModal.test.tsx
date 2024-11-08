import React from 'react';
import { renderWithProviders } from '../../../utils/test-utils';
import { ConfirmChangeLRModal } from '../components/ConfirmChangeLRModal';

test('Render ConfirmChangeLRModal open', () => {
  renderWithProviders(<ConfirmChangeLRModal open={true} />);
});

test('Render ConfirmChangeLRModal false', () => {
  renderWithProviders(<ConfirmChangeLRModal open={false} />);
});
