import NavigationBar, {
  NavigationPath,
} from '@pagopa/selfcare-common-frontend/components/NavigationBar';
import { useMemo } from 'react';
import { Product } from '../model/Product';

type Props = {
  selectedProduct?: Product;
  paths: Array<NavigationPath>;
};

export default function ProductNavigationBar({ selectedProduct, paths }: Props) {
  const innerPaths = useMemo(
    () => (selectedProduct ? [{ description: selectedProduct.title }].concat(paths) : paths),
    [selectedProduct, paths]
  );

  return <NavigationBar paths={innerPaths} />;
}
