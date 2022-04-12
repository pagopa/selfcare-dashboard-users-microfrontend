import { Link, Grid, Typography } from '@mui/material';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { Trans, useTranslation } from 'react-i18next';
import { Party, UserStatus } from '../../../model/Party';
import { PartyUserDetail, PartyUserProductRole, PartyUserProduct } from '../../../model/PartyUser';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';
import { updatePartyUserStatus } from '../../../services/usersService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { deletePartyUser } from './../../../services/usersService';

type Props = {
  showActions: boolean;
  party: Party;
  user: PartyUserDetail;
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
  const { t } = useTranslation();
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const moreRolesOnProduct = product.roles.length > 1;

  const onDelete = () => {
    setLoading(true);
    deletePartyUser(party, user, product, role)
      .then((_) => {
        fetchPartyUser();
        addNotify({
          component: 'Toast',
          id: 'DELETE_PARTY_USER',
          title: t('userDetail.actions.delete.title'),
          message: (
            <>
              <Trans i18nKey="userDetail.actions.delete.message">
                {'Hai eliminato correttamente il ruolo '}
                <strong>{{ role: transcodeProductRole2Title(role.role, productRolesList) }}</strong>
                {' assegnato a '}
                <strong>{{ user: `${user.name} ${user.surname}` }}</strong>
                {'.'}
              </Trans>
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
      title: t('userDetail.actions.modalDelete.title'),
      message: (
        <Trans i18nKey="userDetail.actions.modalDelete.message">
          {'Stai per eliminare il ruolo'}
          <strong> {{ role: transcodeProductRole2Title(role.role, productRolesList) }} </strong>
          {'di '}
          <strong> {{ productTitle: product.title }} </strong>
          {' assegnato a '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ user: party && `${user.name} ${user.surname}` }}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </Trans>
      ),
      confirmLabel: t('userDetail.actions.modalDelete.confirmButton'),
      closeLabel: t('userDetail.actions.modalDelete.closeButton'),
      onConfirm: onDelete,
    });
  };
  const confirmChangeStatus = () => {
    const nextStatus: UserStatus | undefined =
      role.status === 'ACTIVE' ? 'SUSPENDED' : role.status === 'SUSPENDED' ? 'ACTIVE' : undefined;
    const selectedUserStatus =
      nextStatus === 'SUSPENDED' ? t('userDetail.suspended') : t('userDetail.rehabilitated');

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
          title:
            product.roles.length > 1
              ? t('userDetail.actions.changeUserStatus.moreRolesOnProduct.title', {
                  userStatus: `${selectedUserStatus.toUpperCase()}`,
                })
              : t('userDetail.actions.changeUserStatus.oneRoleOnProduct.title', {
                  userStatus: `${selectedUserStatus.toUpperCase()}`,
                }),
          message:
            product.roles.length > 1 ? (
              <Trans i18nKey="userDetail.actions.changeUserStatus.moreRolesOnProduct.message">
                Hai {{ userStatus: `${selectedUserStatus}` }}correttamente il ruolo
                <strong>{{ role: transcodeProductRole2Title(role.role, productRolesList) }}</strong>
                assegnato a<strong>{{ user: `${user.name} ${user.surname}` }}</strong>.
              </Trans>
            ) : (
              <Trans i18nKey="userDetail.actions.changeUserStatus.oneRoleOnProduct.message">
                Hai {{ userStatus: `${selectedUserStatus}` }}correttamente il referente
                <strong> {{ user: `${user.name} ${user.surname}` }}</strong>.
              </Trans>
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
      title: moreRolesOnProduct
        ? role.status === 'ACTIVE'
          ? t('userDetail.actions.changeUserStatusModal.moreRolesOnProduct.titleSuspend')
          : t('userDetail.actions.changeUserStatusModal.moreRolesOnProduct.titleReactivate')
        : role.status === 'ACTIVE'
        ? t('userDetail.actions.changeUserStatusModal.oneRoleOnProduct.titleSuspend')
        : t('userDetail.actions.changeUserStatusModal.oneRoleOnProduct.titleReactivate'),
      message: moreRolesOnProduct ? (
        <Trans i18nKey="userDetail.actions.changeUserStatusModal.moreRolesOnProduct.message">
          {role.status === 'ACTIVE'
            ? t('userDetail.actions.changeUserStatusModal.moreRolesOnProduct.messageSuspend')
            : t('userDetail.actions.changeUserStatusModal.moreRolesOnProduct.messageReactivate')}
          <strong>
            {{
              transcodeProductRole: `${transcodeProductRole2Title(role.role, productRolesList)}`,
            }}
          </strong>
          {'di '}
          <strong> {{ productTitle: product.title }} </strong>
          {' assegnato a '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ partyAndUser: party && `${user.name.toLocaleLowerCase()} ${user.surname}` }}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </Trans>
      ) : (
        <Trans i18nKey="userDetail.actions.changeUserStatusModal.oneRoleOnProduct.message">
          {role.status === 'ACTIVE'
            ? t('userDetail.actions.changeUserStatusModal.oneRoleOnProduct.messageSuspend')
            : t('userDetail.actions.changeUserStatusModal.oneRoleOnProduct.messageReactivate')}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ partyAndUser: party && `${user.name.toLocaleLowerCase()} ${user.surname}` }}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </Trans>
      ),
      confirmLabel: t('userDetail.actions.changeUserStatusModal.confirmButton'),
      closeLabel: t('userDetail.actions.changeUserStatusModal.closeButton'),
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
                  ? t('userDetail.actions.reactivateRole')
                  : role.status === 'ACTIVE'
                  ? t('userDetail.actions.suspendRole')
                  : ''}
              </Typography>
            </Link>
          </Grid>
          {(moreRolesOnProduct || (!isProductDetailPage && user.products.length > 1)) &&
            !user.isCurrentUser && (
              <Grid item xs={6}>
                <Link color="error" onClick={handleOpenDelete} component="button">
                  <Typography variant="h3" sx={{ fontSize: '16px', color: '#C02927' }}>
                    {t('userDetail.actions.deleteButton')}
                  </Typography>
                </Link>
              </Grid>
            )}
        </Grid>
      )}
    </>
  );
}
