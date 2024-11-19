import { ENV } from '../../../utils/env';
import { getProductLink } from '../helpers';

describe('getProductLink', () => {
  it('should return the correct link for PagoPA product with institution types PA, GPS, GPU, PRV', () => {
    const productId = 'prod-pagopa';
    const institutionTypes = ['PA', 'GPS', 'GPU', 'PRV'];
    const expectedLink = ENV.DOCUMENTATION_LINKS.PAGOPA_EC;

    institutionTypes.forEach((type) => {
      expect(getProductLink(productId, type)).toBe(expectedLink);
    });
  });

  it('should return the correct link for PagoPA product with institution type PSP', () => {
    const productId = 'prod-pagopa';
    const institutionType = 'PSP';
    const expectedLink = ENV.DOCUMENTATION_LINKS.PAGOPA_PSP;

    expect(getProductLink(productId, institutionType)).toBe(expectedLink);
  });

  it('should return the correct link for PagoPA product with institution type PT', () => {
    const productId = 'prod-pagopa';
    const institutionType = 'PT';
    const expectedLink = ENV.DOCUMENTATION_LINKS.PAGOPA_PT;

    expect(getProductLink(productId, institutionType)).toBe(expectedLink);
  });

  it('should return an empty string for PagoPA product with unknown institution type', () => {
    const productId = 'prod-pagopa';
    const institutionType = 'UNKNOWN';

    expect(getProductLink(productId, institutionType)).toBe('');
  });

  it('should return the correct link for SEND (prod-pn) product', () => {
    const productId = 'prod-pn';
    const expectedLink = ENV.DOCUMENTATION_LINKS.SEND;

    expect(getProductLink(productId)).toBe(expectedLink);
  });

  it('should return the correct link for PDND (prod-interop) product', () => {
    const productId = 'prod-interop';
    const expectedLink = ENV.DOCUMENTATION_LINKS.PDND;

    expect(getProductLink(productId)).toBe(expectedLink);
  });

  it('should return an empty string for unknown productId', () => {
    const productId = 'unknown-product';

    expect(getProductLink(productId)).toBe('');
  });
});
