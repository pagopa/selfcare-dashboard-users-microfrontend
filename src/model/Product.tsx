import { ProductOnBoardingStatusEnum } from '../api/generated/b4f-dashboard/ProductsResource';
import { StatusEnum } from '../api/generated/b4f-dashboard/SubProductResource';
import { UserRole } from './Party';

export type Product = {
  activationDateTime?: Date;
  description: string;
  id: string;
  logo?: string;
  logoBgColor?: string;
  title: string;
  urlBO: string;
  urlPublic?: string;
  tag?: string;
  userRole?: UserRole;
  authorized?: boolean;
  // onboarding status of product. Products that have, or have not, completed the onboarding process.
  productOnBoardingStatus: ProductOnBoardingStatusEnum;
  // product status.The intrinsic state of the product. Product status is unrelated to product onboarding status.
  status: StatusEnum;
};

export type ProductsMap = { [id: string]: Product };

export const buildProductsMap = (products: Array<Product>): ProductsMap =>
  products.reduce((acc, p) => {
    // eslint-disable-next-line functional/immutable-data
    acc[p.id] = p;
    return acc;
  }, {} as ProductsMap);
