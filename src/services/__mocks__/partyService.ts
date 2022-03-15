import { Party } from '../../model/Party';

export const mockedParties: Array<Party> = [
  {
    userRole: 'ADMIN',
    description: 'Comune di Bari',
    urlLogo: 'image',
    status: 'PENDING',
    institutionId: '1',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeBari',
    category: '',
  },
  {
    userRole: 'ADMIN',
    description: 'Comune di Milano',
    urlLogo: 'image',
    status: 'PENDING',
    institutionId: '2',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeMilano',
    category: '',
  },
  {
    userRole: 'ADMIN',
    description: 'Comune di Roma',
    urlLogo: 'image',
    status: 'ACTIVE',
    institutionId: '3',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeRoma',
    category: '',
  },
  {
    userRole: 'LIMITED',
    description: 'Comune di Napoli',
    urlLogo: 'image',
    status: 'ACTIVE',
    institutionId: '4',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeNapoli',
    category: '',
  },
  {
    userRole: 'ADMIN',
    description: 'AGENCY ONBOARDED',
    urlLogo: 'https://selcdcheckoutsa.z6.web.core.windows.net/institutions/onboarded/logo.png',
    status: 'ACTIVE',
    institutionId: 'onboarded',
    digitalAddress: '',
    fiscalCode: 'fiscalCodeONBOARDED',
    category: '',
  },
];

export const verifyFetchPartiesMockExecution = (parties: Array<Party>) => {
  expect(parties).toStrictEqual(mockedParties);
};

export const fetchParties = () => new Promise((resolve) => resolve(mockedParties));

export const verifyFetchPartyDetailsMockExecution = (party: Party) => {
  expect(party).toStrictEqual(
    mockedParties.filter((p) => p.institutionId === party.institutionId)[0]
  );
};

export const fetchPartyDetails = (
  institutionId: string,
  _parties?: Array<Party>
): Promise<Party | null> =>
  new Promise((resolve) =>
    resolve(mockedParties.find((p) => p.institutionId === institutionId) ?? null)
  );
