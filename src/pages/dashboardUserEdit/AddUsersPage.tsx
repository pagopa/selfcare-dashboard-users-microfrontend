import { Grid } from '@mui/material';
// import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
// import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { PeopleAlt } from '@mui/icons-material';
import { Product } from '../../model/Product';
import ProductNavigationBar from '../../components/ProductNavigationBar';
// import { DASHBOARD_USERS_ROUTES } from '../../routes';
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
  // const history = useHistory();

  const goBack = () => {
    /* TODO waiting for certain landing
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
        partyId: party.partyId,
      })
    ); */
  };

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      icon: PeopleAlt,
      onClick: goBack,
    },
    {
      description: t('userPagesPath.addUser'),
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={4}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={8}>
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar paths={paths} showBackComponent={true} goBack={goBack} />
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
    </Grid>
  );
}

export default AddUsersPage;
