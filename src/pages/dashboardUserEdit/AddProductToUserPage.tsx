import { Grid, styled, Typography } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withUserDetail, { withUserDetailProps } from '../../decorators/withUserDetail';
import { Party } from '../../model/Party';
import { PartyUserOnCreation } from '../../model/PartyUser';
import { Product } from '../../model/Product';
import { ProductsRolesMap } from '../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import AddUserForm from './components/AddUserForm';

const CustomTextTransform = styled(Typography)({
  textTransform: 'capitalize',
});

type Props = {
  party: Party;
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
} & withUserDetailProps;

function AddProductToUserPage({ party, activeProducts, productsRolesMap, partyUser }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        partyId: party.partyId,
        userId: partyUser.id,
      })
    );

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
      description: partyUser.name + ' ' + partyUser.surname,
      onClick: goBack,
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
          title={t('userEdit.addProduct.title')}
          subTitle={t('userEdit.addProduct.subTitle', {
            institutionName: `${party.description}`,
          })}
        />
      </Grid>
      <Grid item xs={12} mb={9}>
        <Grid
          container
          sx={{
            backgroundColor: '#FFFFFF',
            padding: '24px',
          }}
          xs={9}
        >
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid container item alignContent="center">
                <Grid item xs={3}>
                  <Typography variant="h6" className="CustomLabelStyle">
                    {t('userEdit.addProduct.name')}
                  </Typography>
                </Grid>
                <Grid item xs={9} className="partyUserStyle">
                  <CustomTextTransform variant="body2" className="CustomInfoStyle">
                    {partyUser.name.toLocaleLowerCase()}
                  </CustomTextTransform>
                </Grid>
              </Grid>
              <Grid container item alignContent="center">
                <Grid item xs={3}>
                  <Typography variant="h6" className="CustomLabelStyle">
                    {t('userEdit.addProduct.surname')}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <CustomTextTransform variant="body2" className="CustomInfoStyle">
                    {partyUser.surname}
                  </CustomTextTransform>
                </Grid>
              </Grid>
              <Grid container item alignContent="center">
                <Grid item xs={3}>
                  <Typography variant="h6" className="CustomLabelStyle">
                    {t('userEdit.addProduct.fiscalCode')}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <CustomTextTransform variant="body2" className="CustomInfoStyle">
                    {partyUser.taxCode}
                  </CustomTextTransform>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {partyUser.products.map((userProduct) => (
        <Grid item xs={12} mb={9} key={userProduct.id}>
          <AddUserForm
            goBack={goBack}
            party={party}
            products={activeProducts.filter((p) => p.id !== userProduct.id)}
            productsRolesMap={productsRolesMap}
            initialFormData={
              {
                taxCode: partyUser.taxCode,
                name: partyUser.name,
                surname: partyUser.surname,
                email: partyUser.email,
                confirmEmail: partyUser.email,
                id: partyUser.id,
                productRoles: [],
                certifiedName: false,
                certifiedSurname: false,
                certifiedMail: false,
              } as PartyUserOnCreation
            }
            canEditRegistryData={false}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default withUserDetail(AddProductToUserPage);
