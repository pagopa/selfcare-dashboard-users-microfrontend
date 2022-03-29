import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { useTranslation } from 'react-i18next';
import { fetchUserGroups } from '../../../services/usersService';
import { PartyUserDetail } from '../../../model/PartyUser';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { PartyGroup } from '../../../model/PartyGroup';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';

type Props = {
  user: PartyUserDetail;
  party: Party;
  product: Product;
  canEdit: boolean;
};
export default function UserProductGroups({ user, party, product, canEdit }: Props) {
  const { t } = useTranslation();
  const [userGroups, setUserGroups] = useState<Array<PartyGroup>>([]);
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();

  useEffect(() => {
    if (canEdit) {
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
    }
  }, [user.id, party, product, canEdit]);

  return (
    <>
      {userGroups.length > 0 && canEdit && (
        <Grid container>
          <Grid item xs={3}>
            <Typography className="CustomLabelStyle" variant="h6">
              {t('userDetail.group')}
            </Typography>
          </Grid>

          <Grid item xs={9}>
            {userGroups?.map((g) => (
              <Typography key={g.id} variant="h6" className="CustomInfoStyle">
                {g.name}
              </Typography>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
}
