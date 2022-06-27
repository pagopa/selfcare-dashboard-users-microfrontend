import { Button, Divider, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useEffect } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { Trans, useTranslation } from 'react-i18next';
import UserDetail from '../components/UserDetail';
import { PartyUserDetail } from '../../../model/PartyUser';
import ProductNavigationBar from '../../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import withUserDetail from '../../../decorators/withUserDetail';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { Party } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductsRolesMap } from '../../../model/ProductRole';
import UserProductSection from './components/UserProductSection';
import { deletePartyUser } from './../../../services/usersService';

type Props = {
  partyUser: PartyUserDetail;
  fetchPartyUser: () => void;
  activeProducts: Array<Product>;
  party: Party;
  productsMap: ProductsMap;
  productsRolesMap: ProductsRolesMap;
};

function UserDetailPage({
  partyUser,
  fetchPartyUser,
  productsRolesMap,
  activeProducts,
  party,
  productsMap,
}: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const product = partyUser.products[0];
  const haveOneRoleAndOneProduct =
    partyUser.products.length === 1 && partyUser.products[0].roles.length === 1;

  useEffect(() => {
    if (party) {
      trackEvent('OPEN_USER_DETAIL', { party_id: party.partyId });
    }
  }, [party]);

  const goEdit = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.EDIT_USER.path, {
        partyId: party.partyId,
        userId: partyUser.id,
      })
    );

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
        partyId: party.partyId,
      })
    );

  const onDelete = () => {
    setLoading(true);
    deletePartyUser(party, partyUser, product, product.roles[0])
      .then((_) => {
        goBack();
        addNotify({
          component: 'Toast',
          id: 'DELETE_PARTY_USER',
          title: t('userDetail.actions.delete.userDelete'),
          message: '',
        });
      })
      .catch((reason) =>
        addError({
          id: `DELETE_PARTY_USER_ERROR-${partyUser.id}`,
          blocking: false,
          error: reason,
          displayableTitle: t('userDetail.actions.delete.userDeleteError'),
          displayableDescription: '',
          techDescription: `Something gone wrong while deleting role ${product.roles[0].relationshipId} for product ${product.title}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  const handleOpenDelete = () => {
    addNotify({
      component: 'SessionModal',
      id: 'USER_DELETE_MODAL',
      title: t('userDetail.actions.deleteUserModal.title'),
      message: (
        <Trans i18nKey="userDetail.actions.deleteUserModal.message">
          {'Stai per eliminare '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ user: party && `${partyUser.name.toLocaleLowerCase()} ${partyUser.surname}` }}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </Trans>
      ),
      confirmLabel: t('userDetail.actions.deleteUserModal.confirmButton'),
      closeLabel: t('userDetail.actions.deleteUserModal.closeButton'),
      onConfirm: onDelete,
    });
  };

  const paths = [
    {
      description: t('userDetail.pathDescription'),
      onClick: goBack,
    },
    {
      description: partyUser.name + ' ' + partyUser.surname,
    },
  ];
  const isProductDetailPage = false;
  return !party ? (
    <></>
  ) : (
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
      <Grid item xs={12} mb={7}>
        <Typography variant="h4">{t('userDetail.title')}</Typography>
      </Grid>
      <Grid container item sx={{ backgroundColor: 'background.paper', padding: 3 }}>
        <Grid item xs={12} mb={9}>
          <UserDetail
            party={party}
            userInfo={partyUser}
            roleSection={''}
            goEdit={goEdit}
            productsMap={productsMap}
          />
        </Grid>
        <Grid item xs={11} mb={4}>
          <Divider />
        </Grid>
        <Grid container>
          <UserProductSection
            isProductDetailPage={isProductDetailPage}
            partyUser={partyUser}
            party={party}
            fetchPartyUser={fetchPartyUser}
            productsRolesMap={productsRolesMap}
            products={activeProducts}
          />
        </Grid>
      </Grid>
      <Grid container item my={10} spacing={2}>
        <Grid item xs={2}>
          <Button
            disableRipple
            variant="outlined"
            sx={{ height: '40px', width: '100%' }}
            onClick={goBack}
          >
            {t('userDetail.backButton')}
          </Button>
        </Grid>
        {partyUser.products.length === 1 &&
          partyUser.products[0].roles.length === 1 &&
          !partyUser.isCurrentUser &&
          activeProducts.find((p) => p.id === partyUser.products[0].id)?.userRole === 'ADMIN' && (
            <Grid item xs={2}>
              <Button
                disableRipple
                variant="outlined"
                sx={{
                  height: '40px',
                  width: '100%',
                  color: '#C02927',
                  borderColor: '#C02927',
                  '&:hover': { borderColor: '#C02927', backgroundColor: 'transparent' },
                }}
                onClick={handleOpenDelete}
              >
                {haveOneRoleAndOneProduct
                  ? t('userDetail.deleteUserButton')
                  : t('userDetail.deleteButton')}
              </Button>
            </Grid>
          )}
      </Grid>
    </Grid>
  );
}
export default withUserDetail(UserDetailPage);
