import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { Trans, useTranslation } from 'react-i18next';
import { SessionModal, useErrorDispatcher, useUserNotify } from '@pagopa/selfcare-common-frontend';
import { useEffect, useState } from 'react';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import AddIcon from '@mui/icons-material/Add';
import { PartyGroup } from '../../../model/PartyGroup';
import { PartyUserDetail } from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import { addMemberToUserGroup } from '../../../services/groupsService';

type AddUserToGroupButtonProps = {
  user: PartyUserDetail;
  currentUser: User;
  product: Product;
  userGroupsComplement: Array<PartyGroup>;
  executeFetchUserGroups: () => void;
};

export default function AddUserToGroupButton({
  user,
  currentUser,
  product,
  userGroupsComplement,
  executeFetchUserGroups,
}: AddUserToGroupButtonProps) {
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<PartyGroup>();
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const { t } = useTranslation();

  const handleAssignNewGroup = () => {
    setOpen(false);
    if (selectedGroup) {
      addMemberToUserGroup(selectedGroup.id, currentUser.uid)
        .then((_) => {
          addNotify({
            component: 'Toast',
            id: 'ADD_USER_TO_GROUP',
            title: t('userDetail.actions.successfulAddUserToGroup'),
            message: '',
          });
          executeFetchUserGroups();
        })
        .catch((error) => {
          addError({
            component: 'Toast',
            id: `ADD_USER_TO_GROUP_ERROR-${user.id}`,
            displayableTitle: t('userDetail.actions.addRoleError'),
            displayableDescription: '',
            techDescription: `An error occurred while adding user to group`,
            blocking: false,
            error,
            toNotify: true,
          });
        })
        .finally(() => {
          setSelectedGroup(undefined);
        });
    }
  };

  useEffect(() => {
    if (userGroupsComplement.length === 1) {
      setSelectedGroup(userGroupsComplement[0]);
    }
  }, [userGroupsComplement]);

  return (
    <Grid>
      <ButtonNaked
        id="newGroupAssignModalOpen"
        component="button"
        onClick={() => {
          setOpen(true);
        }}
        startIcon={<AddIcon fontSize="medium" />}
        sx={{ color: 'primary.main' }}
        weight="default"
      >
        {t('userDetail.actions.newGroupAssign')}
      </ButtonNaked>
      <SessionModal
        open={open}
        title={t('userDetail.actions.newGroupAssignModal.title')}
        message={
          <>
            <Trans i18nKey="userDetail.actions.newGroupAssignModal.message">
              {'Seleziona il gruppo che vuoi assegnare a '}
              <strong> {{ user: `${user.name} ${user.surname}` }} </strong>
              {'per il prodotto '}
              <strong> {{ productTitle: `${product.title}.` }} </strong>
            </Trans>
            <FormControl sx={{ width: '100%', mt: 2 }}>
              <InputLabel
                id="select-label-products"
                sx={{
                  '.MuiInputLabel-root.Mui-focused': {
                    color: 'text.primary',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              >
                {t('userDetail.actions.newGroupAssignModal.groupPlaceholder')}
              </InputLabel>
              <Select
                id="group-select"
                data-testid="group-select"
                fullWidth
                value={selectedGroup?.name ?? ''}
                displayEmpty
                disabled={userGroupsComplement.length === 1}
                variant="outlined"
                labelId="select-label-groups"
                label={t('userDetail.actions.newGroupAssignModal.groupPlaceholder')}
                input={
                  <OutlinedInput
                    label={t('userDetail.actions.newGroupAssignModal.groupPlaceholder')}
                  />
                }
                renderValue={(selectedGroup) => (
                  <Typography
                    sx={{
                      fontSize: 'fontSize',
                      fontWeight: 'fontWeightMedium',
                    }}
                  >
                    {selectedGroup}
                  </Typography>
                )}
              >
                {userGroupsComplement.map((g: PartyGroup, index) => (
                  <MenuItem
                    key={index}
                    value={g.name}
                    sx={{ fontSize: '14px', color: '#000000' }}
                    onClick={() => setSelectedGroup(g)}
                  >
                    {g.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        }
        onConfirm={handleAssignNewGroup}
        onConfirmEnabled={selectedGroup ? true : false}
        handleClose={() => {
          setOpen(false);
          if (userGroupsComplement.length !== 1) {
            setSelectedGroup(undefined);
          }
        }}
        onConfirmLabel={t('userDetail.actions.newGroupAssignModal.confirmButton')}
        onCloseLabel={t('userDetail.actions.newGroupAssignModal.closeButton')}
      />
    </Grid>
  );
}
