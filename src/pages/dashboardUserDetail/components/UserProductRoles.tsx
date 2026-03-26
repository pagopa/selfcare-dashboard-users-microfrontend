import { Box, Chip, Grid, Typography, styled } from '@mui/material';
import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useTranslation } from 'react-i18next';
import { Party } from '../../../model/Party';
import { PartyUserDetail, PartyUserProduct, PartyUserProductRole } from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import {
  ProductRolesLists,
  transcodeProductRole2Description,
  transcodeProductRole2Title,
} from '../../../model/ProductRole';
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
  singleRoleForBackstage?: PartyUserProductRole;
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
  singleRoleForBackstage,
}: Readonly<Props>) {
  const { t } = useTranslation();

  const isPnpg = product.id.startsWith('prod-pn-pg');
  const rolesToRender = singleRoleForBackstage ? [singleRoleForBackstage] : userProduct.roles;

  return (
    <Grid container item xs={12}>
      {rolesToRender.map((p) => (
        <Grid container item key={p.relationshipId} mt={3}>
          <Grid item xs={3}>
            <Grid container item>
              <Box>
                <Typography
                  sx={{
                    fontSize: 'fontSize',
                    fontWeight: 'fontWeightRegular',
                    color: p.status === 'SUSPENDED' ? 'text.disabled' : 'colorTextPrimary',
                  }}
                >
                  {t('userDetail.role')}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={9}>
            <Grid item container>
              <Grid item xs={8}>
                <Box display="flex">
                  <Box>
                    <CustomTextTransform
                      sx={{
                        color: p.status === 'SUSPENDED' ? 'text.disabled' : 'colorTextPrimary',
                        fontSize: 'fontSize',
                        fontWeight: 'fontWeightMedium',
                      }}
                    >
                      {isPagoPaUser()
                        ? `${transcodeProductRole2Title(p.role ?? '', productRolesList)} - ${
                            p.partyRole
                          } `
                        : transcodeProductRole2Title(p.role ?? '', productRolesList)}
                    </CustomTextTransform>
                  </Box>
                  {p.status === 'SUSPENDED' &&
                    (isProductDetailPage ||
                      userProduct.roles.find((r) => r.status !== 'SUSPENDED')) && (
                      <Box display="flex" justifyContent="center" alignItems="center" ml={1}>
                        <Chip
                          label={t('userDetail.statusLabel')}
                          aria-label={'Suspended'}
                          color="warning"
                          sx={{
                            fontSize: '14px',
                            borderRadius: '16px',
                            height: '24px',
                          }}
                        />
                      </Box>
                    )}
                </Box>
                <Typography
                  sx={{
                    fontSize: 'fontSize',
                    fontWeight: 'fontWeightRegular',
                    color: p.status === 'SUSPENDED' ? 'text.disabled' : 'colorTextPrimary',
                  }}
                >
                  {transcodeProductRole2Description(p.role ?? '', productRolesList)}
                </Typography>
              </Grid>
              {!isPnpg && (
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
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}
      {canEdit && (
        <UserProductAddRoles
          party={party}
          user={user}
          userProduct={userProduct}
          product={product}
          fetchPartyUser={fetchPartyUser}
          productRolesList={productRolesList}
        />
      )}
    </Grid>
  );
}
