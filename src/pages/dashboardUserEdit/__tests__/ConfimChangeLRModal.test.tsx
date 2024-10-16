import React from 'react';
import { renderWithProviders } from '../../../utils/test-utils';
import { ConfimChangeLRModal } from '../components/ConfimChangeLRModal';

test('Render ConfirmChangeLRModal open', () => {
  renderWithProviders(<ConfimChangeLRModal open={true} />);
});

test('Render ConfirmChangeLRModal false', () => {
  renderWithProviders(<ConfimChangeLRModal open={false} />);
});
