import { mockedParties } from '../../../microcomponents/mock_dashboard/data/party';
import { renderWithProviders } from '../../../utils/test-utils';
import AddUsersRoleOnProduct from '../AddUsersRoleOnProduct';

test('should render AddUsersRoleOnProduct with empty party', async () => {
  renderWithProviders(
    <AddUsersRoleOnProduct
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
    />
  );
});

test('should render AddUsersRoleOnProduct with party onboarded', async () => {
  const mockedOnboardedParty = mockedParties[4];
  renderWithProviders(<AddUsersRoleOnProduct party={mockedOnboardedParty} />);
});
