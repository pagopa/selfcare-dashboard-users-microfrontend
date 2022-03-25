import { Grid, Box } from '@mui/material';
import { Footer, Header } from '@pagopa/selfcare-common-frontend';
import {
  useUnloadEventLogout,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const onExit = useUnloadEventOnExit();
  const onLogout = useUnloadEventLogout();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header
        withSecondHeader={true}
        subHeaderChild={"SUBHEADER"}
        onExitAction={onLogout}
      />
      <Grid container direction="row" flexGrow={1}>
        {children}
      </Grid>
      <Footer
        assistanceEmail="assistance@selfcare.it"
        onExit={onExit}
      />
    </Box>
  );
}
