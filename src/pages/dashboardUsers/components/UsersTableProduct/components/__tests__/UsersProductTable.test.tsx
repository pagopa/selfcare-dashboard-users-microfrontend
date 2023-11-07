import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { mockedParties } from '../../../../../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../../../../../microcomponents/mock_dashboard/data/product';
import { transformToPartyProductUsers } from '../../../../../../model/PartyUser';
import { buildEmptyProductRolesLists } from '../../../../../../model/ProductRole';
import { mockedUsers } from '../../../../../../services/__mocks__/usersService';
import { renderWithProviders } from '../../../../../../utils/test-utils';
import UsersProductTable from '../UsersProductTable';

jest.mock('../../../../../../hooks/useIsMobile', () => {
  return {
    useIsMobile: jest.fn().mockReturnValue(true), // Mocking it for mobile condition
  };
});

test('should render UserProductTable on mobile view', async () => {
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
      users={transformToPartyProductUsers(mockedUsers)}
      product={mockedPartyProducts[0]}
      productRolesLists={buildEmptyProductRolesLists()}
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

test('should render UserProductTable not on mobile view', async () => {
  jest.requireMock('../../../../../../hooks/useIsMobile').useIsMobile.mockReturnValue(false);
  const onRowClick = jest.fn();
  const fetchPage = jest.fn((page?: number, size?: number, refetch?: boolean) => {
    console.log('Function not implemented.');
  });

  mockedUsers;

  renderWithProviders(
    <UsersProductTable
      incrementalLoad={false}
      loading={false}
      noMoreData={false}
      party={mockedParties[0]}
      users={transformToPartyProductUsers(mockedUsers)}
      product={mockedPartyProducts[0]}
      productRolesLists={buildEmptyProductRolesLists()}
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
