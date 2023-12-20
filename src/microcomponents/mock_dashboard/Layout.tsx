import { Grid, Box } from '@mui/material';
import { Footer, Header } from '@pagopa/selfcare-common-frontend';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '@pagopa/selfcare-common-frontend/redux/slices/userSlice';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { ENV } from '../../utils/env';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const onExit = useUnloadEventOnExit();
  const loggedUser = useSelector(userSelectors.selectLoggedUser);

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
        onExit={onExit}
        assistanceEmail="assistance@selfcare.it"
        loggedUser={
          loggedUser
            ? {
                id: loggedUser ? loggedUser.uid : '',
                name: loggedUser?.name,
                surname: loggedUser?.surname,
                email: loggedUser?.email,
              }
            : false
        }
        onDocumentationClick={() => {
          trackEvent('OPEN_OPERATIVE_MANUAL', {
            from: 'dashboard',
          });
          window.open(ENV.URL_DOCUMENTATION, '_blank');
        }}
      />
      <Grid container direction="row" flexGrow={1}>
        {children}
      </Grid>
      <Footer onExit={onExit} loggedUser={!!loggedUser} />
    </Box>
  );
}
