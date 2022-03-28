import { Box, Chip, Grid, IconButton, Tooltip, Typography, styled } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  ProductRolesLists,
  transcodeProductRole2Description,
  transcodeProductRole2Title,
} from '../../../model/ProductRole';
import { Party } from '../../../model/Party';
import { PartyUserDetail, PartyUserProduct } from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import UserProductActions from './UserProductActions';
import UserProductAddRoles from './UserProductAddRoles';

type Props = {
  showActions: boolean;
  party: Party;
  user: PartyUserDetail;
  fetchPartyUser: () => void;
  userProduct: PartyUserProduct;
  product: Product;
  productRolesList: ProductRolesLists;
  canEdit: boolean;
  isProductDetailPage: boolean;
};

const CustomTextTransform = styled(Typography)({
  textTransform: 'capitalize',
});

export default function UserProductRoles({
  showActions,
  party,
  user,
  fetchPartyUser,
  userProduct,
  product,
  productRolesList,
  canEdit,
  isProductDetailPage,
}: Props) {
  return (
    <Grid container item xs={12}>
      {userProduct.roles.map((p) => (
        <Grid container item key={p.relationshipId}>
          <Grid item xs={3}>
            <Grid container item>
              <Box>
                <Typography variant="h6" className="CustomLabelStyle">
                  RUOLO
                </Typography>
              </Box>
              {p.status === 'SUSPENDED' &&
                (isProductDetailPage ||
                  userProduct.roles.find((r) => r.status !== 'SUSPENDED')) && (
                  <Box ml={14}>
                    <Chip
                      label="Sospeso"
                      variant="outlined"
                      sx={{
                        fontWeight: '600',
                        fontSize: '14px',
                        background: '#E0E0E0',
                        border: 'none',
                        borderRadius: '16px',
                        width: '76px',
                        height: '24px',
                      }}
                    />
                  </Box>
                )}
            </Grid>
          </Grid>

          <Grid item xs={9}>
            <Grid item container>
              <Grid item xs={5}>
                <CustomTextTransform
                  className="CustomInfoStyle"
                  variant="body2"
                  sx={{ color: p.status === 'SUSPENDED' ? '#A2ADB8' : '#000000' }}
                >
                  {transcodeProductRole2Title(p.role, productRolesList)}
                  <Tooltip title={transcodeProductRole2Description(p.role, productRolesList)}>
                    <IconButton
                      disableRipple
                      sx={{ padding: '0px', '&:hover': { backgroundColor: 'transparent' } }}
                    >
                      <InfoOutlinedIcon
                        sx={{ padding: '6px', color: '#A2ADB8', marginLeft: '8px' }}
                      />
                    </IconButton>
                  </Tooltip>
                </CustomTextTransform>
              </Grid>
              <Grid item xs={4}>
                <UserProductActions
                  showActions={showActions}
                  party={party}
                  user={user}
                  fetchPartyUser={fetchPartyUser}
                  role={p}
                  product={userProduct}
                  productRolesList={productRolesList}
                  canEdit={canEdit}
                  isProductDetailPage={isProductDetailPage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      {canEdit && (
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={9}>
            <UserProductAddRoles
              party={party}
              user={user}
              userProduct={userProduct}
              product={product}
              fetchPartyUser={fetchPartyUser}
              productRolesList={productRolesList}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
