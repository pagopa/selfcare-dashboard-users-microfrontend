import React from 'react';
import { renderWithProviders } from '../../../utils/test-utils';
import EditUserRegistryProductPage from '../EditUserRegistryProductPage';

test('should render EditUserRegistryProductPage', async () => {
 renderWithProviders(< EditUserRegistryProductPage party={{
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
     status: undefined
 }} />);
});