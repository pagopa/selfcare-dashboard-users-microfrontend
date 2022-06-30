import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
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

  const goBack = () =>
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
  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
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
      px={2}
      mt={10}
      sx={{ width: '985px', backgroundColor: 'transparent !important' }}
    >
      <Grid xs={5} mb={3}>
        <ProductNavigationBar paths={paths} selectedProduct={selectedProduct} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox variantTitle="h4" title={t('userEdit.editRegistryForm.title')} />
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
  );
}

export default withUserRegistry(EditUserRegistryProductPage);
