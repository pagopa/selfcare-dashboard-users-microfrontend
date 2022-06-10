import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { Product } from '../../model/Product';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import { Party } from '../../model/Party';
import { ProductRolesLists } from '../../model/ProductRole';
import AddUserForm from './components/AddUserForm';

type Props = {
  party: Party;
  activeProducts: Array<Product>;
  selectedProduct: Product;
  productRolesList: ProductRolesLists;
};

function AddUsersProductPage({ party, selectedProduct, activeProducts, productRolesList }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const productsRolesMap = {
    [selectedProduct.id]: productRolesList,
  };

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.MAIN.path, {
            partyId: party.partyId,
            productId: selectedProduct.id,
          })
        ),
    },
    {
      description: t('userPagesPath.addUser'),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Grid
        container
        alignItems={'center'}
        px={2}
        mt={10}
        sx={{ width: '985px', backgroundColor: 'transparent !important' }}
      >
        <Grid item xs={12} mb={3}>
          <ProductNavigationBar selectedProduct={selectedProduct} paths={paths} />
        </Grid>
        <Grid item xs={12} mb={9}>
          <TitleBox title={t('userEdit.addForm.title')} subTitle={t('userEdit.addForm.subTitle')} />
        </Grid>
        <Grid item xs={12}>
          <AddUserForm
            party={party}
            selectedProduct={selectedProduct}
            products={activeProducts}
            productsRolesMap={productsRolesMap}
            canEditRegistryData={true}
            initialFormData={{
              taxCode: '',
              name: '',
              surname: '',
              email: '',
              confirmEmail: '',
              productRoles: [],
              certifiedMail: false,
              certifiedName: false,
              certifiedSurname: false,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AddUsersProductPage;
