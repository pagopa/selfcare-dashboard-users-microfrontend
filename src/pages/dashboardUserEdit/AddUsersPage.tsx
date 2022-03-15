import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
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
  const history = useHistory();

  const paths = [
    {
      description: 'Referenti',
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
            institutionId: party.institutionId,
          })
        ),
    },
    {
      description: 'Aggiungi un Referente',
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
        <ProductNavigationBar paths={paths} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox
          title="Aggiungi un Referente"
          subTitle={`Inserisci i dati della persona che vuoi autorizzare a gestire i prodotti per il ${party.description}.`}
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
            certification: false,
            productRoles: [],
          }}
          canEditRegistryData={true}
        />
      </Grid>
    </Grid>
  );
}

export default AddUsersPage;
