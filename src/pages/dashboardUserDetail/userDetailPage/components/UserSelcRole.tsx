import { Grid, Typography } from '@mui/material';
import { roleLabels } from '@pagopa/selfcare-common-frontend/utils/constants';
import { UserRole } from '../../../../model/Party';

type Props = {
  selcRole: UserRole;
};

export default function UserSelcRole({ selcRole }: Props) {
  const roleLabel = roleLabels[selcRole];
  return (
    <>
      <Grid item xs={3}>
        <Typography variant="h6" className="CustomLabelStyle">
          RUOLO SU SELF CARE
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid item container spacing={1}>
          <Grid item>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {selcRole.toLocaleLowerCase()}
            </Typography>
          </Grid>
          <Grid item display="flex" alignItems="center">
            <Typography variant="body2" sx={{ fontSize: '12px', color: 'text.secondary' }}>
              {roleLabel.description} - {roleLabel.longLabel}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
