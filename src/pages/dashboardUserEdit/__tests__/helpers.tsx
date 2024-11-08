import { getProductLink } from '../helpers';

describe('getProductLink', () => {
  test('should return the correct link for PagoPA product with institution types PA, GPS, GPU, PRV', () => {
    const productId = 'prog-pagopa';
    const institutionTypes = ['PA', 'GPS', 'GPU', 'PRV'];
    const expectedLink =
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-ec/manuale-operativo-back-office-pagopa-ente-creditore/funzionalita/matrice-ruoli-funzionalita';

    institutionTypes.forEach((type) => {
      expect(getProductLink(productId, type)).toBe(expectedLink);
    });
  });

  test('should return the correct link for PagoPA product with institution type PSP', () => {
    const productId = 'prog-pagopa';
    const institutionType = 'PSP';
    const expectedLink =
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-psp/manuale-operativo-pagamenti-pagopa-prestatore-di-servizi-di-pagamento/funzionalita';

    expect(getProductLink(productId, institutionType)).toBe(expectedLink);
  });

  test('should return the correct link for PagoPA product with institution type PT', () => {
    const productId = 'prog-pagopa';
    const institutionType = 'PT';
    const expectedLink =
      'https://developer.pagopa.it/pago-pa/guides/manuale-bo-pt/manuale-operativo-back-office-pagopa-partner-tecnologico/funzionalita/matrice-ruoli-funzionalita';

    expect(getProductLink(productId, institutionType)).toBe(expectedLink);
  });

  test('should return an empty string for PagoPA product with unknown institution type', () => {
    const productId = 'prog-pagopa';
    const institutionType = 'UNKNOWN';

    expect(getProductLink(productId, institutionType)).toBe('');
  });

  test('should return the correct link for SEND (prod-pn) product', () => {
    const productId = 'prod-pn';
    const expectedLink =
      'https://docs.pagopa.it/manuale-operativo/piattaforma-notifiche-digitali-manuale-operativo/mittente';

    expect(getProductLink(productId)).toBe(expectedLink);
  });

  test('should return the correct link for PDND (prod-interop) product', () => {
    const productId = 'prod-interop';
    const expectedLink =
      'https://docs.pagopa.it/interoperabilita-1/manuale-operativo/guida-alladesione#aggiungere-o-rimuovere-un-operatore-amministrativo-a-pdnd-interoperabilita';

    expect(getProductLink(productId)).toBe(expectedLink);
  });

  test('should return an empty string for unknown productId', () => {
    const productId = 'unknown-product';

    expect(getProductLink(productId)).toBe('');
  });
});
