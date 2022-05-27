import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { useTranslation, Trans } from 'react-i18next';
import { PartyProductUser, PartyUserProduct } from '../../../../../model/PartyUser';
import { Party, UserStatus } from '../../../../../model/Party';
import { LOADING_TASK_ACTION_ON_PARTY_USER } from '../../../../../utils/constants';
import { deletePartyUser, updatePartyUserStatus } from '../../../../../services/usersService';
import { DASHBOARD_USERS_ROUTES } from '../../../../../routes';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../../../model/ProductRole';

type selectedProductByParams = {
  productId: string;
};

type Props = {
  party: Party;
  partyUser: PartyProductUser;
  partyUserProduct: PartyUserProduct;
  productRolesList: ProductRolesLists;
  onDelete: (partyUser: PartyProductUser) => void;
  onStatusUpdate: (partyUser: PartyProductUser, nextStatus: UserStatus) => void;
};

const ITEM_HEIGHT = 48;

export default function UserProductRowActions({
  party,
  partyUser,
  partyUserProduct,
  productRolesList,
  onDelete,
  onStatusUpdate,
}: Props) {
  const { productId } = useParams<selectedProductByParams>();
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

  const askConfirm = (title: string, actionMessage: any, onConfirm: () => void) => {
    addNotify({
      id: `CONFIRM_ACTION_${title}_ON_${partyUser.id}`,
      title,
      message: actionMessage,
      onConfirm,
      confirmLabel: t('usersTable.rowActions.changeUserRoleStatusModal.confirmButton'),
    });
  };

  const performAction = (action: () => Promise<void>, title: string, onComplete: () => void) => {
    setLoading(true);
    action()
      .then((_) => {
        onComplete();
        addNotify({
          id: 'ACTION_ON_PARTY_USER_COMPLETED',
          title,
          message: '',
          component: 'Toast',
        });
      })
      .catch((reason) =>
        addError({
          id: 'ACTION_ON_PARTY_USER_ERROR',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while performing action ${title} on party (${party.partyId}) and user (${partyUser.id})`,
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
        techDescription: `Invalid status transition while updating party (${party.partyId}) user (${partyUser.id}): ${partyUser.status}`,
        toNotify: true,
      });
      return;
    }

    askConfirm(
      nextStatus === 'SUSPENDED'
        ? t('usersTable.rowActions.changeUserRoleStatusModal.suspend.title')
        : t('usersTable.rowActions.changeUserRoleStatusModal.reactivate.title'),
      nextStatus === 'SUSPENDED' ? (
        <Trans i18nKey="usersTable.rowActions.changeUserRoleStatusModal.suspend.message">
          {'Vuoi sospendere '}
          <strong>
            {{
              user: `${partyUser.name} ${partyUser.surname}`,
            }}
          </strong>
          {' dal ruolo di '}
          <strong>
            {{
              userRole: `${transcodeProductRole2Title(
                partyUserProduct.roles[0].role,
                productRolesList
              )}`,
            }}
          </strong>
          <br />
          {'Se lo sospendi, non potrà più operare su '}
          <strong>
            {{
              productTitle: `${partyUser.product.title}`,
            }}
          </strong>
          . {' Puoi riabilitarlo in qualsiasi momento.'}
        </Trans>
      ) : (
        <Trans i18nKey="usersTable.rowActions.changeUserRoleStatusModal.reactivate.message">
          {'Vuoi riabilitare '}
          <strong>
            {{
              user: `${partyUser.name} ${partyUser.surname}`,
            }}
          </strong>
          {' dal ruolo di '}
          <strong>
            {{
              userRole: `${transcodeProductRole2Title(
                partyUserProduct.roles[0].role,
                productRolesList
              )}`,
            }}
          </strong>
          <br />
          {'Se lo riabiliti, potrà operare di nuovo su '}
          <strong>
            {{
              productTitle: `${partyUser.product.title}`,
            }}
          </strong>
          {'.'}
          <br />
          {' Puoi sospenderlo di nuovo in qualsiasi momento.'}
        </Trans>
      ),
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
      t('usersTable.rowActions.changeUserRoleSuccess', {
        userStatus: `${selectedUserStatus}`,
      }),
      () => onStatusUpdate(partyUser, nextStatus)
    );
  };

  const handleDelete = () => {
    handleClose();
    askConfirm(
      t('usersTable.rowActions.deleteModal.title'),
      <Trans i18nKey="usersTable.rowActions.deleteModal.message">
        {'Stai per rimuovere '}
        <strong>{{ user: `${partyUser.name} ${partyUser.surname}` }}</strong>
        {' dal ruolo di '}
        <strong>
          {{
            userRole: `${transcodeProductRole2Title(
              partyUserProduct.roles[0].role,
              productRolesList
            )}`,
          }}
        </strong>
        {'.'}
        <br />
        {'Se lo rimuovi, non potrà più operare su '}
        <strong>{{ productTitle: `${partyUser.product.title}` }}</strong>.
        <br />
        {' Puoi assegnare di nuovo il ruolo in qualsiasi momento'},
      </Trans>,
      deleteParty
    );
  };

  const deleteParty = () => {
    performAction(
      () => deletePartyUser(party, partyUser, partyUserProduct, partyUserProduct.roles[0]),
      t('usersTable.rowActions.deleteSuccess'),
      () => onDelete(partyUser)
    );
  };

  const handleModify = () => {
    handleClose();
    if (productId) {
      history.push(
        resolvePathVariables(
          DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.EDIT_PARTY_PRODUCT_USER.path,
          {
            partyId: party.partyId,
            productId,
            userId: partyUser.id,
          }
        )
      );
    } else {
      history.push(
        resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.EDIT_USER.path, {
          partyId: party.partyId,
          userId: partyUser.id,
        })
      );
    }
  };

  return (
    <div>
      <Tooltip
        aria-label="SelectAction"
        title={t('usersTable.rowActions.toolTipActions') as string}
      >
        <IconButton data-testid={`action-${partyUser.id}`} onClick={handleClick}>
          <MoreVertIcon color="primary" />
        </IconButton>
      </Tooltip>
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
