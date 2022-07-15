import { Grid, Typography, Chip, Box, Divider, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
  handleOpenDelete: () => void;
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
  handleOpenDelete,
}: Props) {
  const { t } = useTranslation();
  const showActionOnProduct = userProduct.roles.length === 1;
  return (
    <>
      <Grid item xs={12}>
        <Grid container mb={2}>
          <Grid item xs={7}>
            <Grid container item>
              <Box display="flex">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mr={2}
                  height="32px"
                  width="32px"
                >
                  <img src={product.logo} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '18px' }}>
                    {product.title}
                  </Typography>
                </Box>
              </Box>

              <Box ml={4} display="flex" justifyContent="center" alignItems={'center'}>
                {!userProduct.roles.find((p) => p.status !== 'SUSPENDED') && (
                  <Chip
                    label={t('userDetail.statusLabel')}
                    aria-label={'Suspended'}
                    variant="outlined"
                    sx={{
                      fontSize: '14px',
                      background: '#FFCB46',
                      borderRadius: '16px',
                      border: 'none',
                      width: '78px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>

          {product.authorized === false && !partyUser.isCurrentUser ? (
            <Grid item xs={5} display="flex" alignItems="center" justifyContent="flex-end">
              <Tooltip title={t('userDetail.infoIcon')}>
                <InfoOutlinedIcon sx={{ cursor: 'pointer' }} color="primary" />
              </Tooltip>
            </Grid>
          ) : (
            <Grid item xs={5} display="flex" alignItems="center" justifyContent="flex-end">
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
                handleOpenDelete={handleOpenDelete}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Divider sx={{ borderColor: 'background.default' }} />
      </Grid>
      <Grid item xs={12}>
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
      <UserProductGroups product={product} party={party} user={partyUser} />
    </>
  );
}
