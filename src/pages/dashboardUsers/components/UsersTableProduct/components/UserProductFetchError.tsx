import { Grid, Link, Typography } from '@mui/material';
import { ReactComponent as DissatisfiedIcon } from '../../../../../assets/dissatisfied-face.svg';

type Props = {
  onRetry: () => void;
};

export default function UserProductFetchError({ onRetry }: Props) {
  return (
    <Grid
      container
      direction="row"
      sx={{
        padding: 2,
        backgroundColor: 'white',
      }}
      justifyContent="center"
    >
      <DissatisfiedIcon />
      <Typography>
        {'Spiacenti, qualcosa è andato storto. '}
        <Link onClick={onRetry} sx={{ textDecoration: 'none!important', cursor: 'pointer' }}>
          <b>Riprova</b>
        </Link>
        .
      </Typography>
    </Grid>
  );
}
