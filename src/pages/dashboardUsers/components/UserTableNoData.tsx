import { Box, Grid, Link, Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import { ReactComponent as DissatisfiedIcon } from '../../../assets/dissatisfied-face.svg';

type Props = {
  removeFilters: () => void;
};

export default function UserTableNoData({ removeFilters }: Props) {
  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 7,
        padding: 2,
        backgroundColor: 'white',
      }}
      justifyContent="center"
    >
      <Box mr={2}>
        <DissatisfiedIcon />
      </Box>
      <Typography>
        <Trans i18nKey="usersTable.filterRole.noDataFilter">
          {'I filtri che hai applicato non hanno dato nessun risultato. '}
          <Link
            onClick={removeFilters}
            sx={{ textDecoration: 'none!important', cursor: 'pointer' }}
          >
            <b>Rimuovi filtri</b>
          </Link>
          .
        </Trans>
      </Typography>
    </Grid>
  );
}
