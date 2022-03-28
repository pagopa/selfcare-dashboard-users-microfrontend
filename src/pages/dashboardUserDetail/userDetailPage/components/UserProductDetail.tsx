import { Grid, Typography, Chip, Box } from '@mui/material';
import { Party } from '../../../../model/Party';
import { Product } from '../../../../model/Product';
import { PartyUserDetail, PartyUserProduct } from '../../../../model/PartyUser';
import UserProductRoles from '../../components/UserProductRoles';
import { ProductRolesLists } from '../../../../model/ProductRole';
import UserProductActions from './../../components/UserProductActions';
import UserProductGroups from './../../components/UserProductGroups';

type Props = {
  partyUser: PartyUserDetail;
  party: Party;
  fetchPartyUser: () => void;
  userProduct: PartyUserProduct;
  productRolesList: ProductRolesLists;
  canEdit: boolean;
  product: Product;
  isProductDetailPage: boolean;
};

export default function UserProductDetail({
  partyUser,
  party,
  fetchPartyUser,
  userProduct,
  productRolesList,
  canEdit,
  product,
  isProductDetailPage,
}: Props) {
  const showActionOnProduct = userProduct.roles.length === 1;

  return (
    <>
      <Grid item xs={10}>
        <Grid container mb={2}>
          <Grid item xs={7}>
            <Grid container item>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '18px' }}>
                  {product.title}
                </Typography>
              </Box>
              <Box ml={2}>
                {!userProduct.roles.find((p) => p.status !== 'SUSPENDED') && (
                  <Chip
                    label="Sospeso"
                    variant="outlined"
                    sx={{
                      fontWeight: '600',
                      fontSize: '14px',
                      background: '#E0E0E0',
                      borderRadius: '16px',
                      border: 'none',
                      width: '76px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={3} display="flex" alignItems="center" ml="-10px">
            <UserProductActions
              showActions={showActionOnProduct}
              party={party}
              role={userProduct.roles[0]}
              user={partyUser}
              fetchPartyUser={fetchPartyUser}
              product={userProduct}
              productRolesList={productRolesList}
              canEdit={canEdit}
              isProductDetailPage={isProductDetailPage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <UserProductRoles
          showActions={!showActionOnProduct}
          party={party}
          user={partyUser}
          fetchPartyUser={fetchPartyUser}
          userProduct={userProduct}
          product={product}
          productRolesList={productRolesList}
          canEdit={canEdit}
          isProductDetailPage={isProductDetailPage}
        />
      </Grid>
      <Grid container item xs={10} mt={3}>
        <UserProductGroups product={product} party={party} user={partyUser} canEdit={canEdit} />
      </Grid>
    </>
  );
}
