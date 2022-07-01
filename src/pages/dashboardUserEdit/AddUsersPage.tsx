import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { Product } from '../../model/Product';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import { Party } from '../../model/Party';
import { ProductsRolesMap } from '../../model/ProductRole';
import AddUserForm from './components/AddUserForm';

type Props = {
  party: Party;
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
};

function AddUsersPage({ party, activeProducts, productsRolesMap }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
            partyId: party.partyId,
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
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox
          variantTitle="h4"
          variantSubTitle="body1"
          title={t('userEdit.addForm.title')}
          subTitle={t('userEdit.addForm.subTitle')}
        />
      </Grid>
      <Grid item xs={12}>
        <AddUserForm
          party={party}
          products={activeProducts}
          productsRolesMap={productsRolesMap}
          initialFormData={{
            taxCode: '',
            name: '',
            surname: '',
            email: '',
            confirmEmail: '',
            certifiedMail: false,
            certifiedName: false,
            certifiedSurname: false,
            productRoles: [],
          }}
          canEditRegistryData={true}
        />
      </Grid>
    </Grid>
  );
}

export default AddUsersPage;
