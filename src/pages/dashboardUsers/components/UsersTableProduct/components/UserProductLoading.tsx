import { Grid, useTheme } from '@mui/material';
import MDSpinner from 'react-md-spinner';

export default function UserProductLoading() {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 1,
        backgroundColor: 'white',
        paddingTop: 3,
      }}
      py={3}
      justifyContent="center"
    >
      <MDSpinner singleColor={theme.palette.primary.main} />
    </Grid>
  );
}
