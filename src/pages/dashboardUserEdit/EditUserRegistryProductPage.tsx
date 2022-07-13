import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { PeopleAlt } from '@mui/icons-material';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import { Product } from '../../model/Product';
import withUserRegistry, { withUserRegistryProps } from '../../decorators/withUserRegistry';
import EditUserRegistryForm from './components/EditUserRegistryForm';

type Props = withUserRegistryProps & {
  selectedProduct: Product;
  products: Array<Product>;
};

function EditUserRegistryProductPage({ party, user, selectedProduct }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
    /*
    history.push(
      resolvePathVariables(
        DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.PARTY_PRODUCT_USER_DETAIL.path,
        {
          partyId: party.partyId,
          productId: selectedProduct.id,
          userId: user.id,
        }
      )
    );
    */
  };

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      icon: PeopleAlt,
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.path, {
            partyId: party.partyId,
            productId: selectedProduct.id,
          })
        ),
    },
    {
      description: `${user.name} ${user.surname}`,
      onClick: goBack,
    },
    {
      description: t('userPagesPath.editUser'),
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={3}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={8}>
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar
            paths={paths}
            selectedProduct={selectedProduct}
            showBackComponent={true}
            goBack={goBack}
          />
        </Grid>
        <Grid item xs={12}>
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('userEdit.editRegistryForm.title')}
            mbTitle={5}
          />
        </Grid>
        <Grid item xs={12}>
          {user ? (
            <EditUserRegistryForm
              party={party}
              user={{
                id: user.id,
                taxCode: user.taxCode,
                name: user.name,
                surname: user.surname,
                email: user.email,
                certifiedName: user.certifiedName,
                certifiedSurname: user.certifiedSurname,
                certifiedMail: user.certifiedMail,
                confirmEmail: '',
              }}
              goBack={goBack}
            />
          ) : (
            t('userEdit.editRegistryForm.errors.userNotFind')
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withUserRegistry(EditUserRegistryProductPage);
