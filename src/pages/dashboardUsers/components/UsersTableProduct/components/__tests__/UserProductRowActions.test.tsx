import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { mockedParties } from '../../../../../../microcomponents/mock_dashboard/data/party';
import { renderWithProviders } from '../../../../../../utils/test-utils';
import UserProductRowActions from '../UserProductRowActions';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ productId: 'mockedProductId' }),
}));

test('should navigate to correct path when productId is truthy and Suspend user action', async () => {
  const onDelete = jest.fn();
  const onStatusUpdate = jest.fn();

  const { history } = renderWithProviders(
    <UserProductRowActions
      party={mockedParties[0]}
      partyUser={{
        // use case status status and  isCurrent user true
        id: '123',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        userRole: 'ADMIN',
        status: 'ACTIVE',
        isCurrentUser: true,
        product: {
          id: 'productIdTest',
          title: 'productTitle',
          roles: [
            {
              relationshipId: 'relationshipId',
              role: 'productRole',
              selcRole: 'ADMIN',
              status: 'ACTIVE',
            },
          ],
        },
      }}
      partyUserProduct={{
        id: 'partyUserProductId',
        title: '',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      }}
      productRolesList={{
        list: [],
        groupByPartyRole: {
          DELEGATE: [],
          MANAGER: [],
          OPERATOR: [],
          SUB_DELEGATE: [],
        },
        groupBySelcRole: {
          ADMIN: [],
          LIMITED: [],
        },
        groupByProductRole: {},
      }}
      onDelete={onDelete}
      onStatusUpdate={onStatusUpdate}
    />
  );

  const actionsTootilip = screen.getByTestId('action-123');
  expect(actionsTootilip).toBeInTheDocument();

  fireEvent.click(actionsTootilip);
  // modify
  const modifyButton = screen.getByText('Modifica');

  fireEvent.click(modifyButton);

  const editPartyUserPath = `/dashboard/1/mockedProductId/users/123/edit`;

  expect(history.location.pathname).toBe(editPartyUserPath);

  // delete
  const removeButton = screen.getByText('Rimuovi');

  fireEvent.click(removeButton);

  // suspend
  fireEvent.click(modifyButton);

  const suspendButton = screen.getByText('Sospendi');

  fireEvent.click(suspendButton);
});

test('Should be able to reabilitate suspended user', async () => {
  const onDelete = jest.fn();

  const onStatusUpdate = jest.fn();

  const { history } = renderWithProviders(
    <UserProductRowActions
      party={mockedParties[0]}
      partyUser={{
        id: '123',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        userRole: 'ADMIN',
        status: 'SUSPENDED',
        isCurrentUser: true,
        product: {
          id: 'productIdTest',
          title: 'productTitle',
          roles: [
            {
              relationshipId: 'relationshipId',
              role: 'productRole',
              selcRole: 'ADMIN',
              status: 'ACTIVE',
            },
          ],
        },
      }}
      partyUserProduct={{
        id: 'partyUserProductId',
        title: '',
        roles: [
          {
            relationshipId: 'relationshipId',
            role: 'productRole',
            selcRole: 'ADMIN',
            status: 'ACTIVE',
          },
        ],
      }}
      productRolesList={{
        list: [],
        groupByPartyRole: {
          DELEGATE: [],
          MANAGER: [],
          OPERATOR: [],
          SUB_DELEGATE: [],
        },
        groupBySelcRole: {
          ADMIN: [],
          LIMITED: [],
        },
        groupByProductRole: {},
      }}
      onDelete={onDelete}
      onStatusUpdate={onStatusUpdate}
    />
  );

  const actionsTootilip = screen.getByTestId('action-123');
  expect(actionsTootilip).toBeInTheDocument();

  fireEvent.click(actionsTootilip);
  // modify
  const modifyButton = screen.getByText('Modifica');

  fireEvent.click(modifyButton);

  const editPartyUserPath = `/dashboard/1/mockedProductId/users/123/edit`;

  expect(history.location.pathname).toBe(editPartyUserPath);

  // reabilitate
  fireEvent.click(modifyButton);

  const reabilitateButton = screen.getByText('Riabilita');

  fireEvent.click(reabilitateButton);
});
