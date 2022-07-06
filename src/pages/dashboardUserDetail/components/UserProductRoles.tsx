import { Box, Chip, Grid, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { roleLabels } from '@pagopa/selfcare-common-frontend/utils/constants';
import { ProductRolesLists } from '../../../model/ProductRole';
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
  const { t } = useTranslation();
  return (
    <Grid container item xs={12}>
      {userProduct.roles.map((p) => (
        <Grid container item key={p.relationshipId} mt={2}>
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
                      {t(roleLabels[party.userRole].longLabelKey)}
                    </CustomTextTransform>
                  </Box>
                  {p.status === 'SUSPENDED' &&
                    (isProductDetailPage ||
                      userProduct.roles.find((r) => r.status !== 'SUSPENDED')) && (
                      <Box display="flex" justifyContent="center" alignItems="center" ml={1}>
                        <Chip
                          label={t('userDetail.statusLabel')}
                          aria-label={'Suspended'}
                          variant="outlined"
                          sx={{
                            fontSize: '14px',
                            background: '#FFCB46',
                            border: 'none',
                            borderRadius: '16px',
                            width: '78px',
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
                  {t(roleLabels[party.userRole].descriptionKey)}
                </Typography>
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
          <Grid item xs={9} mt={3}>
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
