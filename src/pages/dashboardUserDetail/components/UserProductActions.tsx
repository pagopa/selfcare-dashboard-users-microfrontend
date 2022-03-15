import { Link, Grid, Typography } from '@mui/material';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { Party, UserStatus } from '../../../model/Party';
import { PartyUser, PartyUserProductRole, PartyUserProduct } from '../../../model/PartyUser';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';
import { updatePartyUserStatus } from '../../../services/usersService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { deletePartyUser } from './../../../services/usersService';

type Props = {
  showActions: boolean;
  party: Party;
  user: PartyUser;
  fetchPartyUser: () => void;
  role: PartyUserProductRole;
  product: PartyUserProduct;
  productRolesList: ProductRolesLists;
  canEdit: boolean;
  isProductDetailPage: boolean;
};
export default function UserProductActions({
  showActions,
  party,
  user,
  role,
  product,
  fetchPartyUser,
  productRolesList,
  canEdit,
  isProductDetailPage,
}: Props) {
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const onDelete = () => {
    setLoading(true);
    deletePartyUser(party, user, product, role)
      .then((_) => {
        fetchPartyUser();
        addNotify({
          component: 'Toast',
          id: 'DELETE_PARTY_USER',
          title: 'RUOLO ELIMINATO',
          message: (
            <>
              {'Hai eliminato correttamente il ruolo '}
              {transcodeProductRole2Title(role.role, productRolesList)}
              {' assegnato a '}
              <strong>{`${user.name} ${user.surname}`}</strong>
              {'.'}
            </>
          ),
        });
      })
      .catch((error) =>
        addError({
          id: `DELETE_PARTY_USER_ERROR-${user.id}`,
          blocking: false,
          error,
          techDescription: `Something gone wrong while deleting role for product ${product.title}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  const handleOpenDelete = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: 'Elimina Ruolo',
      message: (
        <>
          {'Stai per eliminare il ruolo'}
          <strong> {transcodeProductRole2Title(role.role, productRolesList)} </strong>
          {'di '}
          <strong> {product.title} </strong>
          {' assegnato a '}
          <strong style={{ textTransform: 'capitalize' }}>
            {party && `${user.name} ${user.surname}`}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </>
      ),
      confirmLabel: 'Conferma',
      closeLabel: 'Annulla',
      onConfirm: onDelete,
    });
  };
  const confirmChangeStatus = () => {
    const nextStatus: UserStatus | undefined =
      role.status === 'ACTIVE' ? 'SUSPENDED' : role.status === 'SUSPENDED' ? 'ACTIVE' : undefined;
    const selectedUserStatus = nextStatus === 'SUSPENDED' ? 'sospeso' : 'riabilitato';

    if (!nextStatus) {
      addError({
        id: 'INVALID_STATUS_TRANSITION',
        blocking: false,
        error: new Error('INVALID_STATUS_TRANSITION'),
        techDescription: `Invalid status transition while updating party (${party.institutionId}) user (${user.id}): ${user.status}`,
        toNotify: true,
      });

      return;
    }
    setLoading(true);
    updatePartyUserStatus(party, user, product, role, nextStatus)
      .then((_) => {
        fetchPartyUser();
        addNotify({
          id: 'ACTION_ON_PARTY_USER_COMPLETED',
          title: `REFERENTE ${selectedUserStatus.toUpperCase()}`,
          message: (
            <>
              {`Hai ${selectedUserStatus} correttamente `}
              <strong>{`${user.name} ${user.surname}`}</strong>
              {'.'}
            </>
          ),
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          id: 'UPDATE_PARTY_USER_STATUS',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while updating party (${party.institutionId}) user (${user.id}): ${user.status} -> ${nextStatus}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };
  const handleOpen = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: role.status === 'ACTIVE' ? 'Sospendi Ruolo' : 'Riabilita Ruolo',
      message: (
        <>
          {role.status === 'ACTIVE'
            ? 'Stai per sospendere il ruolo'
            : 'Stai per riabilitare il ruolo'}
          <strong> {transcodeProductRole2Title(role.role, productRolesList)} </strong>
          {'di '}
          <strong> {product.title} </strong>
          {' assegnato a '}
          <strong style={{ textTransform: 'capitalize' }}>
            {party && `${user.name.toLocaleLowerCase()} ${user.surname}`}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </>
      ),
      confirmLabel: 'Conferma',
      closeLabel: 'Annulla',
      onConfirm: confirmChangeStatus,
    });
  };

  return (
    <>
      {showActions && !user.isCurrentUser && canEdit && (
        <Grid container item>
          <Grid item xs={6}>
            <Link onClick={handleOpen} component="button">
              <Typography variant="h3" sx={{ fontSize: '16px', color: '#0073E6' }}>
                {role.status === 'SUSPENDED'
                  ? 'Riabilita'
                  : role.status === 'ACTIVE'
                  ? 'Sospendi'
                  : ''}
              </Typography>
            </Link>
          </Grid>
          {(product.roles.length > 1 || (!isProductDetailPage && user.products.length > 1)) &&
            !user.isCurrentUser && (
              <Grid item xs={6}>
                <Link color="error" onClick={handleOpenDelete} component="button">
                  <Typography variant="h3" sx={{ fontSize: '16px', color: '#C02927' }}>
                    Elimina
                  </Typography>
                </Link>
              </Grid>
            )}
        </Grid>
      )}
    </>
  );
}
