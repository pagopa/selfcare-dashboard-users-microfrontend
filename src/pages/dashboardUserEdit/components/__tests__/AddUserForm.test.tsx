import React from 'react';
import { renderWithProviders } from '../../../../utils/test-utils';

import { RoleEnum } from '../../../../api/generated/onboarding/UserDto';
import { mockedParties } from '../../../../microcomponents/mock_dashboard/data/party';
import AddUserForm from '../AddUserForm';

test('should render AddUserForm with false props', () => {
  const mockedPartyAgencyOnboarded = mockedParties[4];

  renderWithProviders(
    <AddUserForm
      party={mockedPartyAgencyOnboarded}
      products={[]}
      productsRolesMap={{}}
      canEditRegistryData={false}
      initialFormData={{
        name: '',
        surname: '',
        taxCode: '',
        email: '',
        confirmEmail: '',
        productRoles: [],
        role: undefined,
        certifiedName: false,
        certifiedSurname: false,
        certifiedMail: false,
      }}
      forwardNextStep={jest.fn()}
      setCurrentSelectedProduct={jest.fn()}
      setAsyncUserData={jest.fn()}
      isAddInBulkEAFlow={false}
      setIsAddInBulkEAFlow={jest.fn()}
    />
  );
});

test('should render AddUserForm with false props', () => {
  const mockedPartyAgencyOnboarded = mockedParties[4];

  renderWithProviders(
    <AddUserForm
      party={mockedPartyAgencyOnboarded}
      products={[]}
      productsRolesMap={{}}
      canEditRegistryData={true}
      initialFormData={{
        name: 'name',
        surname: 'surname',
        taxCode: 'taxCode',
        email: 'emeal@mail.com',
        confirmEmail: 'emeal@mail.com',
        productRoles: [],
        role: RoleEnum.DELEGATE,
        certifiedName: true,
        certifiedSurname: true,
        certifiedMail: true,
      }}
      forwardNextStep={jest.fn()}
      setCurrentSelectedProduct={jest.fn()}
      setAsyncUserData={jest.fn()}
      isAddInBulkEAFlow={true}
      setIsAddInBulkEAFlow={jest.fn()}
    />
  );
});
