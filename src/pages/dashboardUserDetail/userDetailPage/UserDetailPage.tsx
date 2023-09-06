import { Button, Grid, Stack, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useEffect } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { useTranslation, Trans } from 'react-i18next';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { theme } from '@pagopa/mui-italia';
import UserDetail from '../components/UserDetail';
import { PartyUserDetail } from '../../../model/PartyUser';
import ProductNavigationBar from '../../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import withUserDetail from '../../../decorators/withUserDetail';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { Party } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductsRolesMap, transcodeProductRole2Title } from '../../../model/ProductRole';
import UserProductActions from '../components/UserProductActions';
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

// eslint-disable-next-line sonarjs/cognitive-complexity
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

  const isPnpg = !!activeProducts.find((p) => p.id === 'prod-pn-pg');

  const product = partyUser.products[0];
  // const haveOneRoleAndOneProduct =
  //   partyUser.products.length === 1 && partyUser.products[0].roles.length === 1;

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

  const goBack = () => history.goBack();
  // history.push(
  //   resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
  //     partyId: party.partyId,
  //   })
  // );

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
          {'Vuoi rimuovere '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ user: party && `${partyUser.name.toLocaleLowerCase()} ${partyUser.surname}` }}
          </strong>
          {' dal ruolo di '}
          <strong>
            {{
              role: transcodeProductRole2Title(product.roles[0].role, productsRolesMap[product.id]),
            }}
          </strong>
          {'?'}
          <br />
          <br />
          {'Se lo rimuovi da '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{
              product: product.title,
            }}
          </strong>
          {
            ' il profilo dell’utente verrà eliminato dall’Area Riservata, poiché non è presente in altri prodotti. Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i suoi dati anagrafici.'
          }
        </Trans>
      ),
      confirmLabel: t('userDetail.actions.deleteUserModal.confirmButton'),
      closeLabel: t('userDetail.actions.deleteUserModal.closeButton'),
      onConfirm: onDelete,
    });
  };

  const paths = [
    {
      icon: !isPnpg ? PeopleAltIcon : undefined,
      description: t('userDetail.pathDescription'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
            partyId: party.partyId,
          })
        ),
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
      item
      alignItems={'center'}
      p={3}
      sx={{
        width: '100%',
        backgroundColor: 'transparent !important',
      }}
    >
      <Grid container item xs={12} lg={8}>
        <Grid item xs={12} mb={3}>
          <ProductNavigationBar paths={paths} showBackComponent={true} goBack={goBack} />
        </Grid>
        <Grid container item mb={4} xs={12}>
          <Grid item xs={10}>
            <Typography
              variant="h4"
              sx={{
                width: '100%',
                wordWrap: 'break-word',
              }}
            >
              {partyUser.name} {partyUser.surname}
            </Typography>
          </Grid>
          {partyUser.userRole === 'ADMIN' && (
            <Grid
              item
              xs={12}
              sm={2}
              display="flex"
              justifyContent={!isPnpg ? 'normal' : 'flex-end'}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'flex-start',
                  marginTop: 3,
                },
              }}
            >
              <Stack
                direction="row"
                display="flex"
                justifyContent={'flex-end'}
                alignItems={!isPnpg ? 'flex-start' : 'center'}
                spacing={isPnpg ? 4 : 0}
              >
                <Button
                  disabled={partyUser.status === 'SUSPENDED'}
                  disableRipple
                  variant="outlined"
                  sx={{ height: '40px' }}
                  onClick={goEdit}
                >
                  {t('userDetail.editButton')}
                </Button>
                {isPnpg && (
                  <UserProductActions
                    canEdit={true}
                    fetchPartyUser={fetchPartyUser}
                    isProductDetailPage={isProductDetailPage}
                    party={party}
                    product={product}
                    productRolesList={productsRolesMap[partyUser.id]}
                    role={partyUser.products[0].roles[0]}
                    showActions={true}
                    user={partyUser}
                  />
                )}
              </Stack>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          item
          sx={{
            backgroundColor: isPnpg ? 'background.paper' : undefined,
            padding: !isPnpg ? 3 : 0,
            borderRadius: '4px',
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: isPnpg ? 'background.paper' : 'background.default',
            }}
            mb={isPnpg ? 1 : 4}
          >
            <UserDetail
              userInfo={partyUser}
              roleSection={''}
              goEdit={goEdit}
              productsMap={productsMap}
            />
          </Grid>
          <Grid container pl={isPnpg ? 3 : 0}>
            <UserProductSection
              isProductDetailPage={isProductDetailPage}
              partyUser={partyUser}
              party={party}
              fetchPartyUser={fetchPartyUser}
              productsRolesMap={productsRolesMap}
              products={activeProducts}
              handleOpenDelete={handleOpenDelete}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default withUserDetail(UserDetailPage);
