import { Box, Link, Typography } from '@mui/material';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/lib/hooks/useUserNotify';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Party, UserStatus } from '../../../model/Party';
import { PartyUserDetail, PartyUserProduct, PartyUserProductRole } from '../../../model/PartyUser';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../model/ProductRole';
import { updatePartyUserStatus } from '../../../services/usersService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS, PRODUCT_IDS } from '../../../utils/constants';
import { ENV } from '../../../utils/env';
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
  handleOpenDelete?: () => void;
};
export default function UserProductActions({
  showActions,
  party,
  user,
  role,
  product,
  fetchPartyUser,
  productRolesList,
  isProductDetailPage,
  handleOpenDelete,
  canEdit,
}: Props) {
  const { t } = useTranslation();
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const history = useHistory();

  const moreRolesOnProduct = product.roles.length > 1;
  const haveMoreProducts = user.products.length > 1;
  const isPnpg = product.id.startsWith('prod-pn-pg');

  const onDeleteMoreRole = () => {
    setLoading(true);
    const userRole = !isPnpg ? role : product.roles[0];
    deletePartyUser(party, user, product, userRole)
      .then((_) => {
        if (moreRolesOnProduct) {
          fetchPartyUser();
        } else {
          history.push(resolvePathVariables(ENV.ROUTES.USERS, { partyId: party.partyId }));
        }
        addNotify({
          component: 'Toast',
          id: 'DELETE_PARTY_USER',
          title: moreRolesOnProduct
            ? t('userDetail.actions.delete.userRoleDelete')
            : t('userDetail.actions.delete.userDelete'),
          message: '',
        });
      })
      .catch((error) =>
        addError({
          id: `DELETE_PARTY_USER_ERROR-${user.id}`,
          blocking: false,
          error,
          displayableTitle: moreRolesOnProduct
            ? t('userDetail.actions.changeUserStatusRemoveError')
            : t('userDetail.actions.delete.userDeleteError'),
          techDescription: `Something gone wrong while deleting role for product ${product.title}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleOpenDeleteMoreRole = () => {
    addNotify({
      component: 'SessionModal',
      id: 'DELETE_MODAL',
      title:
        moreRolesOnProduct || (!moreRolesOnProduct && haveMoreProducts)
          ? t('userDetail.actions.modalDelete.moreRolesOnProduct.title')
          : !moreRolesOnProduct && !haveMoreProducts
          ? t('userDetail.actions.modalDelete.oneRoleOnProduct.title')
          : '',
      message: moreRolesOnProduct ? (
        <Trans
          i18nKey="userDetail.actions.modalDelete.moreRolesOnProduct.message"
          values={{
            user: party && `${user.name} ${user.surname}`,
            role: transcodeProductRole2Title(role.role, productRolesList),
          }}
          components={{ 1: <strong style={{ textTransform: 'capitalize' }} />, 3: <strong /> }}
        >
          {`Vuoi rimuovere <1>{{user}}</1> dal ruolo di <3>{{role}}</3>? <6 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.`}
        </Trans>
      ) : !moreRolesOnProduct && haveMoreProducts ? (
        <Trans
          i18nKey="userDetail.actions.modalDelete.haveMoreProducts"
          values={{
            user: `${user.name} ${user.surname}`,
            productRole: transcodeProductRole2Title(role.role, productRolesList),
            productTitle: `${product.title}`,
          }}
          components={{
            2: <strong style={{ textTransform: 'capitalize' }} />,
            4: <strong />,
            7: <strong />,
          }}
        >
          {`Stai per rimuovere <2>{{user}}</2> dal ruolo di <4>{{productRole}}</4>. <5 />Se lo rimuovi, non potrà più operare su <7>{{productTitle}}</7>. <9 />Puoi assegnare di nuovo il ruolo in qualsiasi momento.`}
          ,
        </Trans>
      ) : (
        !moreRolesOnProduct &&
        !haveMoreProducts && (
          <Trans
            i18nKey="userDetail.actions.modalDelete.oneRoleOnProduct.message"
            values={{ user: party && `${user.name} ${user.surname}` }}
            components={{ 1: <strong style={{ textTransform: 'capitalize' }} /> }}
          >
            {`Stai per eliminare <1>{{user}}</1>.<3 />Vuoi continuare?`}
          </Trans>
        )
      ),
      confirmLabel: t('userDetail.actions.modalDelete.removeRoleButton'),
      closeLabel: t('userDetail.actions.modalDelete.closeButton'),
      onConfirm: onDeleteMoreRole,
    });
  };

  const handleDelete = () => {
    if (user.products[0].roles.length === 1 && handleOpenDelete && user.products.length === 1) {
      handleOpenDelete();
    } else {
      handleOpenDeleteMoreRole();
    }
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
        techDescription: `Invalid status transition while updating party (${party.partyId}) user (${user.id}): ${user.status}`,
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
          title: t('userDetail.actions.changeUserStatusSuccess', {
            userStatus: `${selectedUserStatus}`,
          }),
          message: '',
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          id: 'UPDATE_PARTY_USER_STATUS',
          blocking: false,
          error: reason,
          displayableTitle:
            `${selectedUserStatus}` === 'sospeso'
              ? t('userDetail.actions.changeUserStatusSuspendError')
              : `${selectedUserStatus}` === 'riabilitato'
              ? t('userDetail.actions.changeUserStatusRehabilitateError')
              : t('userDetail.actions.changeUserStatusRemoveError'),
          techDescription: `An error occurred while updating party (${party.partyId}) user (${user.id}): ${user.status} -> ${nextStatus}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };
  const handleOpen = () => {
    addNotify({
      component: 'SessionModal',
      id: 'CHANGE_USER_STATUS_MODAL',
      title:
        role.status === 'ACTIVE'
          ? t('userDetail.actions.changeUserStatusModal.suspend.title')
          : t('userDetail.actions.changeUserStatusModal.reactivate.title'),
      message:
        role.status === 'ACTIVE' && moreRolesOnProduct ? (
          <Trans
            i18nKey="userDetail.actions.changeUserStatusModal.suspend.messageWithMultipleRoles"
            values={{
              user: `${user.name} ${user.surname}`,
              productRole: `${transcodeProductRole2Title(role.role, productRolesList)}`,
            }}
            components={{ 1: <strong style={{ textTransform: 'capitalize' }} />, 3: <strong /> }}
          >
            {`Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi riabilitarlo in qualsiasi momento.`}
          </Trans>
        ) : role.status === 'ACTIVE' && !moreRolesOnProduct ? (
          <Trans
            i18nKey="userDetail.actions.changeUserStatusModal.suspend.messageWithOneRole"
            values={{
              user: `${user.name} ${user.surname}`,
              productRole: `${transcodeProductRole2Title(role.role, productRolesList)}`,
              productTitle: `${product.title}`,
            }}
            components={{ 1: <strong />, 3: <strong />, 6: <strong /> }}
          >
            {`Vuoi sospendere <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo sospendi, non potrà più operare su <6>{{productTitle}}</6>. <8 />Puoi riabilitarlo in qualsiasi momento.`}
          </Trans>
        ) : role.status === 'SUSPENDED' && moreRolesOnProduct ? (
          <Trans
            i18nKey="userDetail.actions.changeUserStatusModal.reactivate.messageWithMultipleRoles"
            values={{
              user: `${user.name} ${user.surname}`,
              productRole: `${transcodeProductRole2Title(role.role, productRolesList)}`,
            }}
            components={{ 1: <strong />, 3: <strong /> }}
          >
            {`Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Puoi sospenderlo di nuovo in qualsiasi momento.`}
          </Trans>
        ) : (
          !moreRolesOnProduct &&
          role.status === 'SUSPENDED' && (
            <Trans
              i18nKey="userDetail.actions.changeUserStatusModal.reactivate.messageWithOneRole"
              values={{
                user: `${user.name} ${user.surname}`,
                productRole: `${transcodeProductRole2Title(role.role, productRolesList)}`,
                productTitle: `${product.title}`,
              }}
              components={{ 1: <strong />, 3: <strong />, 6: <strong /> }}
            >
              {`Vuoi riabilitare <1>{{user}}</1> dal ruolo di <3>{{productRole}}</3>?<4 />Se lo riabiliti, potrà operare di nuovo su <6>{{productTitle}}</6>.<8 /> Puoi sospenderlo di nuovo in qualsiasi momento.`}
            </Trans>
          )
        ),
      confirmLabel:
        role.status === 'SUSPENDED'
          ? t('userDetail.actions.changeUserStatusModal.confirmButton')
          : t('userDetail.actions.changeUserStatusModal.confirmButtonSuspend'),
      closeLabel: t('userDetail.actions.changeUserStatusModal.closeButton'),
      onConfirm: confirmChangeStatus,
    });
  };

  return (
    <>
      {showActions && !user.isCurrentUser && canEdit && (
        <Box display="flex" justifyContent="flex-end">
          {(moreRolesOnProduct || !isProductDetailPage) &&
            !(product.id === PRODUCT_IDS.INTEROP && role.selcRole === 'ADMIN') && (
              <Box mr={3} width="52px" display="flex" justifyContent="flex-end">
                <Link onClick={handleDelete} component="button" sx={{ textDecoration: 'none' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                  {t('userDetail.actions.deleteButton')}
                  </Typography>
                </Link>
              </Box>
            )}
          {!isPnpg && (
            <Box display="flex">
              <Link
                onClick={handleOpen}
                component="button"
                sx={{ textDecoration: 'none!important' }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 'fontWeightBold', color: 'primary.main' }}
                >
                  {role.status === 'SUSPENDED'
                    ? t('userDetail.actions.reactivateRole')
                    : role.status === 'ACTIVE'
                    ? t('userDetail.actions.suspendRole')
                    : ''}
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
