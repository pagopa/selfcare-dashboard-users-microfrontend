import { Button, Grid, Typography, Divider } from '@mui/material';
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
};
export default function UserProductSection({
  partyUser,
  party,
  fetchPartyUser,
  productsRolesMap,
  products,
  isProductDetailPage,
}: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      <Grid item xs={10}>
        <Grid container item>
          <Grid item mb={1} xs={12}>
            <Typography sx={{ fontSize: '24px', fontWeight: 'fontWeightMedium' }}>
              {t('userDetail.productSection.title')}
            </Typography>
          </Grid>
          <Grid item mb={1} xs={12}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('userDetail.productSection.description')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {!partyUser.isCurrentUser &&
        products
          .filter((p) => p.userRole === 'ADMIN')
          .find((p) => !partyUser.products.find((pu) => pu.id === p.id)) && (
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ height: '40px', width: '100%' }}
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
          </Grid>
        )}
      {partyUser.products.map((userProduct, index) => {
        const product = products.find((p) => p.id === userProduct.id) as Product; // admin role will always see all products
        return (
          <Grid item xs={12} key={userProduct.id}>
            <UserProductDetail
              partyUser={partyUser}
              party={party}
              fetchPartyUser={fetchPartyUser}
              userProduct={userProduct}
              productRolesList={productsRolesMap[userProduct.id]}
              canEdit={product?.userRole === 'ADMIN' && product.status === 'ACTIVE'}
              product={product}
              isProductDetailPage={isProductDetailPage}
            />
            {index !== partyUser.products.length - 1 && (
              <Grid item xs={11} my={4}>
                <Divider />
              </Grid>
            )}
          </Grid>
        );
      })}
    </>
  );
}
