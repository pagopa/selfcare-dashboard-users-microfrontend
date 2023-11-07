import React from 'react';
import { StatusEnum } from '../../../../../api/generated/b4f-dashboard/SubProductResource';
import { mockedParties } from '../../../../../microcomponents/mock_dashboard/data/party';
import { renderWithProviders } from '../../../../../utils/test-utils';
import UsersTableProduct from '../UsersTableProduct';

test.skip('should render UserTableProducts product INACTIVE', async () => {
  const onFetchStatusUpdateMocked = jest.fn();
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
    />
  );
  expect(onFetchStatusUpdateMocked).toBeCalledTimes(1);
});

test.skip('should render UserTableProducts product ACTIVE', async () => {
  const onFetchStatusUpdateMocked = jest.fn();
  renderWithProviders(
    <UsersTableProduct
      incrementalLoad={true}
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
        status: StatusEnum.ACTIVE,
        imageUrl: '',
        subProducts: undefined,
        logoBgColor: undefined,
        delegable: true,
      }}
      selected={true}
      productsMap={{}}
      onFetchStatusUpdate={onFetchStatusUpdateMocked}
      userDetailUrl={''}
      filterConfiguration={{
        productIds: [],
        productRoles: [],
      }}
      hideProductWhenLoading={true}
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
    />
  );
});
