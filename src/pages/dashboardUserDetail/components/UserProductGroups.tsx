import { Chip, Grid, Typography, useTheme } from '@mui/material';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Party } from '../../../model/Party';
import { PartyGroup } from '../../../model/PartyGroup';
import { PartyUserDetail, PartyUserProduct, partyUserDetail2User } from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import { fetchPartyGroups } from '../../../services/groupsService';
import { fetchUserGroups } from '../../../services/usersService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import AddUserToGroupButton from './AddUserToGroupButton';

type Props = {
  user: PartyUserDetail;
  party: Party;
  product: Product;
  userProduct: PartyUserProduct;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function UserProductGroups({ user, party, product, userProduct }: Props) {
  const { t } = useTranslation();
  const pageRequest = { page: 0, size: 100 };
  const [userGroups, setUserGroups] = useState<Array<PartyGroup>>([]);
  const [productGroups, setProductGroups] = useState<Array<PartyGroup>>([]);
  const [activeProductGroups, setActiveProductGroups] = useState<Array<PartyGroup>>([]);
  const [userGroupsComplement, setUserGroupsComplement] = useState<Array<PartyGroup>>([]);
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const theme = useTheme();
  const history = useHistory();
  const addError = useErrorDispatcher();
  const currentUser = partyUserDetail2User(user);
  const userProductRoleSuspended = userProduct.roles.every((p) => p.status === 'SUSPENDED');
  const { hasPermission } = usePermissions();

  const executeFetchUserGroups = () => {
    setLoading(true);
    fetchUserGroups(party, pageRequest, product, user.id)
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
        setActiveProductGroups(r.content.filter((g) => g.status === 'ACTIVE'));
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
    if (userGroups.length > 0 && activeProductGroups.length > 0) {
      setUserGroupsComplement(
        activeProductGroups.filter((g) => !userGroups.find((element) => element.id === g.id))
      );
    } else {
      setUserGroupsComplement(activeProductGroups);
    }
  }, [productGroups, userGroups, activeProductGroups]);

  const onboardedAdminProduct = party.products.find(
    (pp) =>
      pp.productId === product.id &&
      pp.productOnBoardingStatus === 'ACTIVE' &&
      hasPermission(pp.productId, Actions.ManageProductUsers)
  );

  return userGroups?.length > 0 || (onboardedAdminProduct && userGroupsComplement.length > 0) ? (
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
        {onboardedAdminProduct && userGroupsComplement.length > 0 && (
          <AddUserToGroupButton
            user={user}
            party={party}
            currentUser={currentUser}
            product={product}
            userGroupsComplement={userGroupsComplement}
            executeFetchUserGroups={executeFetchUserGroups}
          />
        )}
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
