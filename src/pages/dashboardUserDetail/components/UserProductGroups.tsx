import { Chip, Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { fetchUserGroups } from '../../../services/usersService';
import { checkSuspendedUser, PartyUserDetail } from '../../../model/PartyUser';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { PartyGroup } from '../../../model/PartyGroup';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { ENV } from '../../../utils/env';

type Props = {
  user: PartyUserDetail;
  party: Party;
  product: Product;
};
export default function UserProductGroups({ user, party, product }: Props) {
  const { t } = useTranslation();
  const [userGroups, setUserGroups] = useState<Array<PartyGroup>>([]);
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const theme = useTheme();
  const isUserSuspended = checkSuspendedUser(user);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetchUserGroups(user.id, party, product)
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
  }, [user.id, party, product]);

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
                  color: 'colorTextPrimary',
                }}
              >
                {t('userDetail.group')}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {userGroups?.map((g) => (
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
                    color: isUserSuspended ? 'text.disabled' : 'colorTextPrimary',
                    borderRadius: theme.spacing(0.5),
                    mr: 1,
                    mb: 1,
                    backgroundColor: '#F5F5F5',
                    height: '22px',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </>
    )
  );
}
