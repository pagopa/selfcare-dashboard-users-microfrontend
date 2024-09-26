import NavigationBar, {
  NavigationPath,
} from '@pagopa/selfcare-common-frontend/lib/components/NavigationBar';
import { useMemo } from 'react';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useMediaQuery } from '@mui/material';
import { Product } from '../model/Product';

type Props = {
  selectedProduct?: Product;
  paths: Array<NavigationPath>;
  showBackComponent?: boolean;
  goBack?: () => void;
  backLabel?: string;
  colorBackComponent?: string;
};

export default function ProductNavigationBar({
  selectedProduct,
  paths,
  showBackComponent,
  goBack,
  backLabel,
  colorBackComponent = 'text.primary',
}: Props) {
  const innerPaths = useMemo(
    () => (selectedProduct ? [{ description: selectedProduct.title }].concat(paths) : paths),
    [selectedProduct, paths]
  );

  const isMobile = useMediaQuery('@media (max-width: 600px)');

  return (
    <NavigationBar
      paths={innerPaths}
      showBackComponent={isMobile || showBackComponent}
      goBack={goBack}
      color={colorBackComponent}
      backLabel={backLabel}
    />
  );
}
