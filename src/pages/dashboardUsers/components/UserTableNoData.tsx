import { Grid, Link, Typography } from '@mui/material';
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
      <DissatisfiedIcon />
      <Typography>
        {'I filtri che hai applicato non hanno dato nessun risultato. '}
        <Link onClick={removeFilters} sx={{ textDecoration: 'none!important', cursor: 'pointer' }}>
          <b>Rimuovi filtri</b>
        </Link>
        .
      </Typography>
    </Grid>
  );
}
