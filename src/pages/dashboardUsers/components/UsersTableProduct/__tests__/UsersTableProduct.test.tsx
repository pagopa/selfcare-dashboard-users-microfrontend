import { waitFor } from '@testing-library/react';
import React from 'react';
import { StatusEnum } from '../../../../../api/generated/b4f-dashboard/SubProductResource';
import { mockedParties } from '../../../../../microcomponents/mock_dashboard/data/party';
import { mockedPartyProducts } from '../../../../../microcomponents/mock_dashboard/data/product';
import { buildEmptyProductRolesLists } from '../../../../../model/ProductRole';
import { renderWithProviders } from '../../../../../utils/test-utils';
import UsersTableProduct from '../UsersTableProduct';

test('should render UserTableProducts product INACTIVE', async () => {
  const onFetchStatusUpdateMocked = jest.fn();
  await waitFor(() => {
    renderWithProviders(
      <UsersTableProduct
        incrementalLoad={false}
        initialPageSize={0}
        party={mockedParties[0]}
        product={{
          activationDateTime: undefined,
          description: '',
          id: 'prod-io',
          logo: '',
          title: 'App IO',
          urlBO: '',
          backOfficeEnvironmentConfigurations: undefined,
          urlPublic: undefined,
          tag: undefined,
          status: StatusEnum.INACTIVE,
          imageUrl: '',
          subProducts: undefined,
          logoBgColor: undefined,
          delegable: true,
        }}
        selected={false}
        productsMap={{}}
        onFetchStatusUpdate={onFetchStatusUpdateMocked}
        userDetailUrl={''}
        filterConfiguration={{
          productIds: [],
          productRoles: [],
        }}
        hideProductWhenLoading={false}
        productRolesLists={buildEmptyProductRolesLists()}
      />
    );
  });
}, 7000);

test('should render UserTableProducts product ACTIVE', async () => {
  const onFetchStatusUpdateMocked = jest.fn();
  await waitFor(() => {
    renderWithProviders(
      <UsersTableProduct
        incrementalLoad={true}
        initialPageSize={0}
        party={mockedParties[0]}
        product={mockedPartyProducts[0]}
        selected={true}
        productsMap={{}}
        onFetchStatusUpdate={onFetchStatusUpdateMocked}
        userDetailUrl={''}
        filterConfiguration={{
          productIds: [],
          productRoles: [],
        }}
        hideProductWhenLoading={true}
        productRolesLists={buildEmptyProductRolesLists()}
      />
    );
  });
}, 7000);
