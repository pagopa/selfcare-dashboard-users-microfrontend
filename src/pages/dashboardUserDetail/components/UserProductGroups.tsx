import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import SessionModal from '@pagopa/selfcare-common-frontend/components/SessionModal';
import { useEffect, useState } from 'react';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { fetchUserGroups } from '../../../services/usersService';
import { PartyUserDetail, PartyUserProduct, partyUserDetail2User } from '../../../model/PartyUser';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { PartyGroup } from '../../../model/PartyGroup';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import { addMemberToUserGroup, fetchPartyGroups } from '../../../services/groupsService';

type Props = {
  user: PartyUserDetail;
  party: Party;
  product: Product;
  userProduct: PartyUserProduct;
};
export default function UserProductGroups({ user, party, product, userProduct }: Props) {
  const { t } = useTranslation();
  const pageRequest = { page: 0, size: 100 };
  const [userGroups, setUserGroups] = useState<Array<PartyGroup>>([]);
  const [productGroups, setProductGroups] = useState<Array<PartyGroup>>([]);
  const [userGroupsComplement, setUserGroupsComplement] = useState<Array<PartyGroup>>([]);
  const [selectedGroup, setSelectedGroup] = useState<PartyGroup>();
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const [open, setOpen] = useState(false);
  const addError = useErrorDispatcher();
  const theme = useTheme();
  const history = useHistory();

  const addNotify = useUserNotify();

  const currentUser = partyUserDetail2User(user);

  const userProductRoleSuspended = userProduct.roles.every((p) => p.status === 'SUSPENDED');

  const handleAssignNewGroup = () => {
    setOpen(false);
    setLoading(true);
    if (selectedGroup) {
      addMemberToUserGroup(selectedGroup.id, currentUser.uid)
        .then((_) => {
          trackEvent('ADD_USER_TO_GROUP', {
            party_id: party.partyId,
            product_id: product.id,
            group_id: selectedGroup.id,
          });
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
          setLoading(false);
          setSelectedGroup(undefined);
        });
    }
  };

  const executeFetchUserGroups = () => {
    setLoading(true);
    fetchUserGroups(party, product, user.id)
      .then((groups) => {
        setUserGroups(groups);
      })
      .catch((reason) =>
        addError({
          id: `FETCH_USER_GROUPS_ERROR-${user.id}`,
          blocking: false,
          error: reason,
          techDescription: `Something gone wrong while fetching user groups for product ${product.title}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    executeFetchUserGroups();
  }, [user.id, party, product]);

  useEffect(() => {
    setLoading(true);
    fetchPartyGroups(party, product, currentUser, pageRequest)
      .then((r) => {
        setProductGroups(r.content);
      })
      .catch((reason) => {
        addError({
          id: `FETCH_PARTY_GROUPS_ERROR-${currentUser.uid}`,
          blocking: false,
          error: reason,
          techDescription: `Something gone wrong while fetching party groups for product ${product.title}`,
          toNotify: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const activeProductGroups = productGroups.filter((g) => g.status === 'ACTIVE');

    if (userGroups.length > 0 && activeProductGroups.length > 0) {
      setUserGroupsComplement(
        activeProductGroups.filter((g) => !userGroups.find((element) => element.id === g.id))
      );
    } else {
      setUserGroupsComplement(activeProductGroups);
    }
  }, [productGroups, userGroups]);

  return (
    userGroups && (
      <>
        {userGroups.length > 0 && (
          <Grid container item xs={12} mt={3}>
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontSize: 'fontSize',
                  fontWeight: 'fontWeightRegular',
                  color: userProductRoleSuspended ? 'text.disabled' : 'colorTextPrimary',
                }}
              >
                {t('userDetail.group')}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {userGroups.length > 0 &&
                userGroups?.map((g) => (
                  <Chip
                    onClick={() =>
                      history.push(
                        resolvePathVariables(ENV.ROUTES.GROUP_DETAIL, {
                          partyId: party.partyId,
                          groupId: g.id,
                        })
                      )
                    }
                    label={g.name}
                    key={g.id}
                    sx={{
                      color: userProductRoleSuspended ? 'text.disabled' : 'colorTextPrimary',
                      borderRadius: theme.spacing(0.5),
                      mr: 1,
                      mb: 1,
                      backgroundColor: '#F5F5F5',
                      height: '22px',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              {userGroupsComplement.length > 0 && (
                <Grid>
                  <ButtonNaked
                    id="newGroupAssignModalOpen"
                    component="button"
                    onClick={() => {
                      setOpen(true);
                    }}
                    sx={{ color: 'primary.main', fontWeight: 'bold' }}
                    weight="default"
                  >
                    + {t('userDetail.actions.newGroupAssign')}
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
                                sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}
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
                      setSelectedGroup(undefined);
                    }}
                    onConfirmLabel={t('userDetail.actions.newGroupAssignModal.confirmButton')}
                    onCloseLabel={t('userDetail.actions.newGroupAssignModal.closeButton')}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </>
    )
  );
}
