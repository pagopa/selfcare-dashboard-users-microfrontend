import NavigationBar, {
  NavigationPath,
} from '@pagopa/selfcare-common-frontend/components/NavigationBar';
import { useMemo } from 'react';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Product } from '../model/Product';

type Props = {
  selectedProduct?: Product;
  paths: Array<NavigationPath>;
  showBackComponent?: boolean;
  goBack?: () => void;
};

export default function ProductNavigationBar({
  selectedProduct,
  paths,
  showBackComponent,
  goBack,
}: Props) {
  const innerPaths = useMemo(
    () => (selectedProduct ? [{ description: selectedProduct.title }].concat(paths) : paths),
    [selectedProduct, paths]
  );

  return <NavigationBar paths={innerPaths} showBackComponent={showBackComponent} goBack={goBack} />;
}
