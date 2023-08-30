import { ProductsResource } from '../api/generated/b4f-dashboard/ProductsResource';
import { StatusEnum, SubProductResource } from '../api/generated/b4f-dashboard/SubProductResource';

export type Product = {
  activationDateTime?: Date;
  description: string;
  id: string;
  logo: string;
  title: string;
  urlBO: string;
  backOfficeEnvironmentConfigurations?: Array<{
    environment?: string;
    url?: string;
  }>;
  urlPublic?: string;
  tag?: string;
  // product status.The intrinsic state of the product. Product status is unrelated to product onboarding status.
  status: StatusEnum;
  imageUrl: string;
  subProducts?: Array<SubProductResource>;
  logoBgColor?: string;
  delegable: boolean;
};

export type ProductsMap = { [id: string]: Product };

export const buildProductsMap = (products: Array<Product>): ProductsMap =>
  products.reduce((acc, p) => {
    // eslint-disable-next-line functional/immutable-data
    acc[p.id] = p;
    return acc;
  }, {} as ProductsMap);

export const productResource2Product = (resource: ProductsResource): Product => ({
  description: resource.description ?? '',
  id: resource.id ?? '',
  imageUrl: resource.imageUrl ?? '',
  logo: resource.logo ?? '',
  activationDateTime: resource.activatedAt,
  status: resource.status ?? StatusEnum.INACTIVE,
  title: resource.title ?? '',
  urlBO: resource.urlBO ?? '',
  backOfficeEnvironmentConfigurations: resource.backOfficeEnvironmentConfigurations?.slice(),
  logoBgColor: resource.logoBgColor,
  urlPublic: resource.urlPublic,
  tag: undefined,
  subProducts: resource.children as Array<SubProductResource>,
  delegable: resource.delegable ?? false,
});
