import { Grid, Link, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

type Props = {
  fetchNextPage: () => void;
};

export default function UserTableLoadMoreData({ fetchNextPage }: Props) {
  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 1,
        backgroundColor: 'white',
      }}
      justifyContent="center"
    >
      <Typography>
        <Link
          onClick={fetchNextPage}
          sx={{
            textDecoration: 'none!important',
            cursor: 'pointer',
            position: 'relative',
            fontWeight: 600,
          }}
        >
          Carica altri
          <ExpandMore fontSize="small" sx={{ position: 'absolute', bottom: 0 }} />
        </Link>
      </Typography>
    </Grid>
  );
}
