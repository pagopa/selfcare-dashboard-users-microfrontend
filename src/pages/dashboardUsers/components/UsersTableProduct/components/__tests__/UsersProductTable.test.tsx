import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { mockedParties } from '../../../../../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../../../../../microcomponents/mock_dashboard/data/product';
import { PartyProductUser } from '../../../../../../model/PartyUser';
import { renderWithProviders } from '../../../../../../utils/test-utils';
import UsersProductTable from '../UsersProductTable';

jest.mock('../../../../../../hooks/useIsMobile', () => {
  return {
    useIsMobile: jest.fn().mockReturnValue(true), // Mocking it for mobile condition
  };
});

export const mockedPartyProductUsers: PartyProductUser[] = [
  // use case ACTIVE on 1 product/role
  {
    id: 'uid',
    name: 'Elena',
    surname: 'Verdi',
    email: 'simone.v@comune.milano.it',
    userRole: 'ADMIN',
    status: 'ACTIVE',
    product: {
      title: 'App IO',
      id: 'prod-io',
      roles: [
        {
          relationshipId: 'rel1',
          role: 'incaricato-ente-creditore',
          selcRole: 'ADMIN',
          status: 'ACTIVE',
        },
      ],
    },

    isCurrentUser: false,
  },
];

test.skip('should render UserProductTable on mobile view', async () => {
  jest.requireMock('../../../../../../hooks/useIsMobile').useIsMobile.mockReturnValue(true);
  const onRowClick = jest.fn();
  const fetchPage = jest.fn((page?: number, size?: number, refetch?: boolean) => {
    console.log('Function not implemented.');
  });

  renderWithProviders(
    <UsersProductTable
      incrementalLoad={false}
      loading={false}
      noMoreData={false}
      party={mockedParties[0]}
      users={mockedPartyProductUsers}
      product={mockedPartyProducts[0]}
      productRolesLists={{
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
      fetchPage={fetchPage}
      page={{
        number: 1,
        size: 10,
        totalElements: 11,
        totalPages: 2,
      }}
      onSortRequest={jest.fn()}
      onRowClick={onRowClick}
      onDelete={jest.fn()}
      onStatusUpdate={jest.fn()}
    />
  );
  const userNameBtn = screen.getByText('Elena Verdi');

  expect(userNameBtn).toBeInTheDocument();
  expect(screen.getByText('simone.v@comune.milano.it')).toBeInTheDocument();

  fireEvent.click(userNameBtn);

  const nextPageIconButton = screen.getByTestId('NavigateNextIcon');

  fireEvent.click(nextPageIconButton);

  const previousPageIconButton = screen.getByTestId('NavigateBeforeIcon');

  fireEvent.click(previousPageIconButton);
});

test.skip('should render UserProductTable not on mobile view', async () => {
  jest.requireMock('../../../../../../hooks/useIsMobile').useIsMobile.mockReturnValue(false);
  const onRowClick = jest.fn();
  const fetchPage = jest.fn((page?: number, size?: number, refetch?: boolean) => {
    console.log('Function not implemented.');
  });

  renderWithProviders(
    <UsersProductTable
      incrementalLoad={false}
      loading={false}
      noMoreData={false}
      party={mockedParties[0]}
      users={mockedPartyProductUsers}
      product={mockedPartyProducts[0]}
      productRolesLists={{
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
      fetchPage={fetchPage}
      page={{
        number: 1,
        size: 10,
        totalElements: 11,
        totalPages: 2,
      }}
      onSortRequest={jest.fn()}
      onRowClick={onRowClick}
      onDelete={jest.fn()}
      onStatusUpdate={jest.fn()}
    />
  );
  const userNameBtn = screen.getByText('Elena Verdi');

  expect(userNameBtn).toBeInTheDocument();
  expect(screen.getByText('simone.v@comune.milano.it')).toBeInTheDocument();
});
