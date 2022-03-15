import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import { Product } from '../../model/Product';
import withUserDetail, { withUserDetailProps } from '../../decorators/withUserDetail';
import EditUserRegistryForm from './components/EditUserRegistryForm';

type Props = withUserDetailProps & {
  selectedProduct: Product;
  products: Array<Product>;
};

function EditUserRegistryProductPage({ party, partyUser, selectedProduct }: Props) {
  const history = useHistory();

  const goBack = () =>
    history.push(
      resolvePathVariables(
        DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.PARTY_PRODUCT_USER_DETAIL.path,
        {
          institutionId: party.institutionId,
          productId: selectedProduct.id,
          userId: partyUser.id,
        }
      )
    );
  const paths = [
    {
      description: 'Referenti',
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.path, {
            institutionId: party.institutionId,
            productId: selectedProduct.id,
          })
        ),
    },
    {
      description: `${partyUser.name} ${partyUser.surname}`,
      onClick: goBack,
    },
    {
      description: 'Modifica Referente',
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
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} selectedProduct={selectedProduct} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox
          title="Modifica Referente"
          subTitle={`Modifica i dati della persona che hai autorizzato a gestire.`}
        />
      </Grid>
      <Grid item xs={12}>
        {partyUser ? (
          <EditUserRegistryForm party={party} user={partyUser} goBack={goBack} />
        ) : (
          "Impossibile individuare l'utente desiderato"
        )}
      </Grid>
    </Grid>
  );
}

export default withUserDetail(EditUserRegistryProductPage);
