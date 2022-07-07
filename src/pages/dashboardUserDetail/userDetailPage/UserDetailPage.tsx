import { Button, Grid, Tooltip, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useEffect } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { useTranslation, Trans } from 'react-i18next';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UserDetail from '../components/UserDetail';
import { PartyUserDetail } from '../../../model/PartyUser';
import ProductNavigationBar from '../../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import withUserDetail from '../../../decorators/withUserDetail';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { Party } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductsRolesMap, transcodeProductRole2Title } from '../../../model/ProductRole';
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
          {'Vuoi rimuovere '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ user: party && `${partyUser.name.toLocaleLowerCase()} ${partyUser.surname}` }}
          </strong>
          {'dal ruolo di'}
          <strong>
            {{
              role: transcodeProductRole2Title(product.roles[0].role, productsRolesMap[product.id]),
            }}
          </strong>
          {'?'}
          <br />
          <br />
          {'Se lo rimuovi da'}
          <strong style={{ textTransform: 'capitalize' }}>
            {{
              product: product.title,
            }}
          </strong>
          {' il profilo dell’utente verrà eliminato '}
          <br />
          {' dall’Area Riservata, poiché non è presente in altri prodotti.'}
          <br />
          {' Potrai nuovamente aggiungere l’utente, ma dovrai inserire di nuovo i'}
          <br />
          {' suoi dati anagrafici.'}
        </Trans>
      ),
      confirmLabel: t('userDetail.actions.deleteUserModal.confirmButton'),
      closeLabel: t('userDetail.actions.deleteUserModal.closeButton'),
      onConfirm: onDelete,
    });
  };

  const paths = [
    {
      icon: PeopleAltIcon,
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
    <div style={{ width: '100%' }}>
      <Grid
        container
        item
        alignItems={'center'}
        xs={8}
        px={2}
        mt={4}
        sx={{
          backgroundColor: 'transparent !important',
        }}
      >
        <Grid item xs={12} mb={3}>
          <ProductNavigationBar paths={paths} showBackComponent={true} goBack={goBack} />
        </Grid>
        <Grid container item mb={4}>
          <Grid item xs={10}>
            <Tooltip
              title={
                partyUser.name.length + partyUser.surname.length > 20
                  ? `${partyUser.name} ${partyUser.surname}`
                  : ''
              }
            >
              <Typography
                variant="h4"
                sx={{
                  lineHeight: '38px !important',
                  display: 'inline-block',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {partyUser.name} {partyUser.surname}
              </Typography>
            </Tooltip>
          </Grid>
          {partyUser.products.find((p) => productsMap[p.id]?.userRole === 'ADMIN') && (
            <Grid item xs={2} display="flex" justifyContent="flex-end" alignItems="flex-start">
              <Button
                disabled={partyUser.status === 'SUSPENDED'}
                disableRipple
                variant="outlined"
                sx={{ height: '40px' }}
                onClick={goEdit}
              >
                {t('userDetail.editButton')}
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid container item>
          <Grid item xs={12} sx={{ backgroundColor: 'background.default', padding: 3 }} mb={4}>
            <UserDetail
              userInfo={partyUser}
              roleSection={''}
              goEdit={goEdit}
              productsMap={productsMap}
            />
          </Grid>

          <Grid container>
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
    </div>
  );
}
export default withUserDetail(UserDetailPage);
