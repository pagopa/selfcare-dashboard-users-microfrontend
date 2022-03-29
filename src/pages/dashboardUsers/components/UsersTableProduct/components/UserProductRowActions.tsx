import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { useTranslation } from 'react-i18next';
import { PartyUser, PartyUserProduct } from '../../../../../model/PartyUser';
import { Party, UserStatus } from '../../../../../model/Party';
import { LOADING_TASK_ACTION_ON_PARTY_USER } from '../../../../../utils/constants';
import { deletePartyUser, updatePartyUserStatus } from '../../../../../services/usersService';
import { DASHBOARD_USERS_ROUTES } from '../../../../../routes';

type Props = {
  party: Party;
  partyUser: PartyUser;
  partyUserProduct: PartyUserProduct;
  onDelete: (partyUser: PartyUser) => void;
  onStatusUpdate: (partyUser: PartyUser, nextStatus: UserStatus) => void;
};

const ITEM_HEIGHT = 48;

export default function UserProductRowActions({
  party,
  partyUser,
  partyUserProduct,
  onDelete,
  onStatusUpdate,
}: Props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const setLoading = useLoading(LOADING_TASK_ACTION_ON_PARTY_USER);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const askConfirm = (title: string, actionMessage: string, onConfirm: () => void) => {
    addNotify({
      id: `CONFIRM_ACTION_${title}_ON_${partyUser.id}`,
      title,
      message: (
        <>
          {actionMessage}
          <strong>{`${partyUser.name} ${partyUser.surname}`}</strong>
          {'.'}
          <br />
          {t('usersTable.rowActions.wantContinue')}
        </>
      ),
      onConfirm,
      confirmLabel: t('usersTable.changeUserStatusModal.confirmButton'),
    });
  };

  const performAction = (
    action: () => Promise<void>,
    title: string,
    actionMessage: string,
    onComplete: () => void
  ) => {
    setLoading(true);
    action()
      .then((_) => {
        onComplete();

        addNotify({
          id: 'ACTION_ON_PARTY_USER_COMPLETED',
          title,
          message: (
            <>
              {actionMessage}
              <strong>{`${partyUser.name} ${partyUser.surname}`}</strong>
              {'.'}
            </>
          ),
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          id: 'ACTION_ON_PARTY_USER_ERROR',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while performing action ${title} on party (${party.institutionId}) and user (${partyUser.id})`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  const handleChangeState = () => {
    handleClose();

    const nextStatus: UserStatus | undefined =
      partyUser.status === 'ACTIVE'
        ? 'SUSPENDED'
        : partyUser.status === 'SUSPENDED'
        ? 'ACTIVE'
        : undefined;
    if (!nextStatus) {
      addError({
        id: 'INVALID_STATUS_TRANSITION',
        blocking: false,
        error: new Error('INVALID_STATUS_TRANSITION'),
        techDescription: `Invalid status transition while updating party (${party.institutionId}) user (${partyUser.id}): ${partyUser.status}`,
        toNotify: true,
      });

      return;
    }

    askConfirm(
      nextStatus === 'SUSPENDED'
        ? t('usersTable.rowActions.changeUserStatusModal.titleSuspended')
        : t('usersTable.rowActions.changeUserStatusModal.titleReactivate'),
      nextStatus === 'SUSPENDED'
        ? t('usersTable.rowActions.changeUserStatusModal.messageSuspended')
        : t('usersTable.rowActions.changeUserStatusModal.messageReactivate'),
      () => updateStatus(nextStatus)
    );
  };

  const updateStatus = (nextStatus: UserStatus) => {
    const selectedUserStatus =
      nextStatus === 'SUSPENDED' ? t('userDetail.suspended') : t('userDetail.rehabilitated');
    performAction(
      () =>
        updatePartyUserStatus(
          party,
          partyUser,
          partyUserProduct,
          partyUserProduct.roles[0],
          nextStatus
        ),
      t('usersTable.rowActions.changeUserStatusSuccess.title', {
        userStatus: `${selectedUserStatus.toUpperCase()}`,
      }),
      t('usersTable.rowActions.changeUserStatusSuccess.message', {
        userStatus: `${selectedUserStatus}`,
      }),
      () => onStatusUpdate(partyUser, nextStatus)
    );
  };

  const handleDelete = () => {
    handleClose();
    askConfirm(
      t('usersTable.rowActions.deleteModal.title'),
      t('usersTable.rowActions.deleteModal.message'),
      deleteParty
    );
  };

  const deleteParty = () => {
    performAction(
      () => deletePartyUser(party, partyUser, partyUserProduct, partyUserProduct.roles[0]),
      t('usersTable.rowActions.deleteSuccess.title'),
      t('usersTable.rowActions.deleteSuccess.message'),
      () => onDelete(partyUser)
    );
  };

  const handleModify = () => {
    handleClose();
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.EDIT_USER.path, {
        institutionId: party.institutionId,
        userId: partyUser.id,
      })
    );
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleModify}>{t('usersTable.rowActions.edit')}</MenuItem>
        <MenuItem onClick={handleChangeState}>
          {partyUser.status === 'ACTIVE'
            ? t('usersTable.rowActions.suspend')
            : partyUser.status === 'SUSPENDED'
            ? t('usersTable.rowActions.rehabilitate')
            : ''}
        </MenuItem>
        <MenuItem onClick={handleDelete}>{t('usersTable.rowActions.delete')}</MenuItem>
      </Menu>
    </div>
  );
}
