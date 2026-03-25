import { Alert, Box, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { ProductAvatar } from '@pagopa/mui-italia';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { Trans, useTranslation } from 'react-i18next';
import { Party } from '../../../../model/Party';
import {
  PartyUserDetail,
  PartyUserProduct,
  PartyUserProductRole,
} from '../../../../model/PartyUser';
import { Product } from '../../../../model/Product';
import { ProductRolesLists } from '../../../../model/ProductRole';
import { PRODUCT_IDS } from '../../../../utils/constants';
import { ENV } from '../../../../utils/env';
import UserProductRoles from '../../components/UserProductRoles';
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
  singleRoleForBackstage?: PartyUserProductRole;
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
  singleRoleForBackstage,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const showActionOnProduct = userProduct.roles.length === 1 || !!singleRoleForBackstage;
  const isPnpg = product.id.startsWith(PRODUCT_IDS.PNPG);

  return (
    <>
      <Grid item xs={12}>
        <Grid container mb={2}>
          <Grid item xs={7}>
            <Grid container item>
              {!isPnpg && (
                <Box display="flex" alignItems="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    mr={2}
                    height="32px"
                    width="32px"
                  >
                    <ProductAvatar
                      size={'small'}
                      logoUrl={product.logo ?? ''}
                      logoBgColor={product.logoBgColor ?? ''}
                      logoAltText={`${product.title} logo`}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '18px' }}>
                      {product.title}
                    </Typography>
                  </Box>
                </Box>
              )}
              {!isPagoPaUser() && (
                <Box
                  ml={isPnpg ? 0 : 4}
                  display="flex"
                  justifyContent="center"
                  alignItems={'center'}
                >
                  {userProduct.roles.find((p) => p.status === 'SUSPENDED') && (
                    <Chip
                      label={t('userDetail.statusLabel')}
                      aria-label={'Suspended'}
                      color="warning"
                      sx={{
                        fontSize: '14px',
                        borderRadius: '16px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
          {isPagoPaUser() && (
            <Grid item xs={5} display="flex" alignItems="center" justifyContent="flex-end">
              {partyUser.status === 'ACTIVE' && (
                <Chip
                  label={i18n.t('usersTable.usersProductTableColumns.rows.activeChip')}
                  color="success"
                />
              )}
              {partyUser.status === 'SUSPENDED' && (
                <Chip
                  label={i18n.t('usersTable.usersProductTableColumns.rows.suspendedChip')}
                  color="warning"
                />
              )}
              {partyUser.status === 'DELETED' && (
                <Chip
                  label={i18n.t('usersTable.usersProductTableColumns.rows.removedChip')}
                  color="error"
                />
              )}
            </Grid>
          )}
          {!isPnpg && (
            <Grid item xs={5} display="flex" alignItems="center" justifyContent="flex-end">
              <UserProductActions
                showActions={showActionOnProduct}
                party={party}
                role={singleRoleForBackstage ?? userProduct.roles[0]}
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
      {!isPagoPaUser() &&
        userProduct.id === PRODUCT_IDS.INTEROP &&
        userProduct.roles[0].selcRole === 'ADMIN' &&
        !partyUser.isCurrentUser && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Trans
              i18nKey="userDetail.removeRoleBannerText"
              components={{
                1: (
                  <Link
                    href={ENV.DOCUMENTATION_LINKS.PDND}
                    color={'text.primary'}
                    sx={{ textDecorationColor: 'text.primary' }}
                    target="_blank"
                  />
                ),
              }}
            >
              {
                'Per rimuovere un Amministratore, segui le indicazioni che trovi in <1>questa pagina</1>.'
              }
            </Trans>
          </Alert>
        )}
      <Grid item xs={12}>
        <UserProductRoles
          singleRoleForBackstage={singleRoleForBackstage}
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
      <UserProductGroups
        product={product}
        party={party}
        user={partyUser}
        userProduct={userProduct}
      />
    </>
  );
}
