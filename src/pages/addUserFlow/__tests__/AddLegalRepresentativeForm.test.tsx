import React from 'react';
import { RoleEnum } from '../../../../api/generated/onboarding/UserDto';
import { mockedParties } from '../../../../microcomponents/mock_dashboard/data/party';
import { renderWithProviders } from '../../../../utils/test-utils';
import AddLegalRepresentativeForm from '../AddLegalRepresentativeForm';
import { fireEvent, screen } from '@testing-library/react';

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

test('should render AddLegalRepresentativeForm with isAddInBulkEAFlow true', () => {
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

  const goBackButton = screen.getByRole('button', { name: 'Indietro' });
  expect(goBackButton).toBeInTheDocument();
  fireEvent.click(goBackButton);
});

test('should render AddLegalRepresentativeForm with product interop', () => {
  const mockedRomeParty = mockedParties[2];
  renderWithProviders(
    <AddLegalRepresentativeForm
      party={mockedRomeParty}
      productId={'prod-interop'}
      productName={'Interoperabilità'}
      backPreviousStep={jest.fn()}
      asyncUserData={[]}
      setOutcome={jest.fn()}
      isAddInBulkEAFlow={false}
    />
  );
  const userDocLink = screen.getByText('Dubbi? Vai al manuale');
  fireEvent.click(userDocLink);

  const nameInput = document.querySelector('#name') as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: 'FRANCO' } })
  expect(nameInput.value).toBe('FRANCO');

  const surnameInput = document.querySelector('#surname') as HTMLInputElement;
  fireEvent.change(surnameInput, { target: { value: 'ROSSI' } })
  expect(surnameInput.value).toBe('ROSSI');

  const taxCodeInput = document.querySelector('#taxCode') as HTMLInputElement;
  fireEvent.change(taxCodeInput, { target: { value: 'RSSFNC87A01F205L' } })
  expect(taxCodeInput.value).toBe('RSSFNC87A01F205L');

  const emailInput = document.querySelector('#email') as HTMLInputElement;
  fireEvent.change(emailInput, { target: { value: 'franco.rossi@test.it' } })
  expect(emailInput.value).toBe('franco.rossi@test.it');

  const sendRequest = screen.getByText('Invia richiesta');
  fireEvent.click(sendRequest);
});
