export type Product = {
  activationDateTime?: Date;
  description: string;
  id: string;
  logo?: string;
  title: string;
  urlBO: string;
  urlPublic?: string;
  tag?: string;
  userRole?: string;
  authorized?: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
};

export type ProductsMap = { [id: string]: Product };

export const buildProductsMap = (products: Array<Product>): ProductsMap =>
  products.reduce((acc, p) => {
    // eslint-disable-next-line functional/immutable-data
    acc[p.id] = p;
    return acc;
  }, {} as ProductsMap);
