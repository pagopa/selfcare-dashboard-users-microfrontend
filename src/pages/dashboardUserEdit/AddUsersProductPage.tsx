import { Grid } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation } from 'react-i18next';
import { PeopleAlt } from '@mui/icons-material';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { Product } from '../../model/Product';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { Party } from '../../model/Party';
import { ProductRolesLists } from '../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
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

  const goBack = () => {
    history.goBack();
    /* 
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.MAIN.path, {
        partyId: party.partyId,
        productId: selectedProduct.id,
      })
    ); */
  };

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      icon: PeopleAlt,
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
    <Grid
      container
      alignItems={'center'}
      px={2}
      mt={10}
      sx={{ backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={8}>
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar
            selectedProduct={selectedProduct}
            paths={paths}
            showBackComponent={true}
            goBack={goBack}
          />
        </Grid>
        <Grid item xs={12}>
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('userEdit.addForm.title')}
            subTitle={t('userEdit.addForm.subTitle')}
            mbTitle={1}
            mbSubTitle={5}
          />
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
    </Grid>
  );
}

export default AddUsersProductPage;
