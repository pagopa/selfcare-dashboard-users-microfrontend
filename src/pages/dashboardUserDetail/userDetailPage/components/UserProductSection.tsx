import { Button, Grid, Stack, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { PartyUserDetail } from '../../../../model/PartyUser';
import { Party } from '../../../../model/Party';
import { ProductsRolesMap } from '../../../../model/ProductRole';
import { Product } from '../../../../model/Product';
import { DASHBOARD_USERS_ROUTES } from '../../../../routes';
import UserProductDetail from './UserProductDetail';

type Props = {
  partyUser: PartyUserDetail;
  party: Party;
  fetchPartyUser: () => void;
  productsRolesMap: ProductsRolesMap;
  products: Array<Product>;
  isProductDetailPage: boolean;
  handleOpenDelete: () => void;
};
export default function UserProductSection({
  partyUser,
  party,
  fetchPartyUser,
  productsRolesMap,
  products,
  isProductDetailPage,
  handleOpenDelete,
}: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const isPnpgProduct = products[0].id === 'prod-pn-pg';
  return (
    <>
      {!isPnpgProduct && (
        <Grid item xs={9} mb={3}>
          <Typography sx={{ fontSize: '24px', fontWeight: 'fontWeightMedium' }}>
            {t('userDetail.productSection.title')}
          </Typography>
        </Grid>
      )}

      {!partyUser.isCurrentUser &&
        products
          .filter((p) => p.userRole === 'ADMIN')
          .find((p) => !partyUser.products.find((pu) => pu.id === p.id)) && (
          <Grid item xs={3}>
            <Stack direction="row" display="flex" justifyContent="flex-end" alignItems="flex-start">
              <Button
                variant="contained"
                sx={{
                  height: '40px',
                  fontSize: '14px',
                  fontWeight: 'fontWeightBold',
                }}
                onClick={() =>
                  history.push(
                    resolvePathVariables(
                      DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.ADD_PRODUCT.path,
                      {
                        partyId: party.partyId,
                        userId: partyUser.id,
                      }
                    )
                  )
                }
              >
                {t('userDetail.productSection.addButton')}
              </Button>
            </Stack>
          </Grid>
        )}
      {partyUser.products.map((userProduct) => {
        const product = products.find((p) => p.id === userProduct.id) as Product; // admin role will always see all products
        return (
          <Grid
            item
            xs={12}
            key={userProduct.id}
            sx={{ backgroundColor: 'background.paper', padding: 3, mb: 2 }}
          >
            <UserProductDetail
              partyUser={partyUser}
              party={party}
              fetchPartyUser={fetchPartyUser}
              userProduct={userProduct}
              productRolesList={productsRolesMap[userProduct.id]}
              canEdit={
                product?.userRole === 'ADMIN' && product.productOnBoardingStatus === 'ACTIVE'
              }
              product={product}
              isProductDetailPage={isProductDetailPage}
              handleOpenDelete={handleOpenDelete}
            />
          </Grid>
        );
      })}
    </>
  );
}
