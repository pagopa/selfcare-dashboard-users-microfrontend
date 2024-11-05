import React from 'react';
import { RoleEnum } from '../../../../api/generated/onboarding/UserDto';
import { mockedParties } from '../../../../microcomponents/mock_dashboard/data/party';
import { renderWithProviders } from '../../../../utils/test-utils';
import AddLegalRepresentativeForm from '../AddLegalRepresentativeForm';

test('should render AddLegalRepresentativeForm with empty props', () => {
  renderWithProviders(
    <AddLegalRepresentativeForm
      party={{
        partyId: '',
        products: [],
        externalId: undefined,
        originId: undefined,
        origin: undefined,
        description: '',
        digitalAddress: undefined,
        category: undefined,
        urlLogo: undefined,
        fiscalCode: undefined,
        registeredOffice: '',
        zipCode: '',
        typology: '',
        institutionType: undefined,
        recipientCode: undefined,
        geographicTaxonomies: [],
        vatNumberGroup: undefined,
        supportEmail: undefined,
        vatNumber: undefined,
        subunitCode: undefined,
        subunitType: undefined,
        aooParentCode: undefined,
        parentDescription: undefined,
        userRole: undefined,
        status: undefined,
      }}
      productId={''}
      productName={''}
      backPreviousStep={jest.fn()}
      asyncUserData={[]}
      setOutcome={jest.fn()}
      isAddInBulkEAFlow={false}
    />
  );
});

test('should render AddLegalRepresentativeForm wit props with value', () => {
  const mockedPartyAgencyOnboarded = mockedParties[4];
  renderWithProviders(
    <AddLegalRepresentativeForm
      party={mockedPartyAgencyOnboarded}
      productId={'prod-io'}
      productName={'IO'}
      backPreviousStep={jest.fn()}
      asyncUserData={[
        {
          name: 'name',
          surname: 'surname',
          taxCode: 'taxCode',
          email: 'emeal@mail.com',
          role: RoleEnum.DELEGATE,
        },
      ]}
      setOutcome={jest.fn()}
      isAddInBulkEAFlow={true}
    />
  );
});
