import { Box, Grid } from '@mui/material';
import { Footer, Header } from '@pagopa/selfcare-common-frontend/lib';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { userSelectors } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ENV } from '../../utils/env';

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  const onExit = useUnloadEventOnExit();
  const loggedUser = useSelector(userSelectors.selectLoggedUser);
  const [showDocBtn, setShowDocBtn] = useState(false);

  useEffect(() => {
    if (i18n.language === 'it') {
      setShowDocBtn(true);
    } else {
      setShowDocBtn(false);
    }
  }, [i18n.language]);

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
        onDocumentationClick={
          showDocBtn
            ? () => {
                trackEvent('OPEN_OPERATIVE_MANUAL', {
                  from: 'dashboard',
                });
                window.open(ENV.DOCUMENTATION_LINKS.SELFCARE, '_blank');
              }
            : undefined
        }
      />
      <Grid container direction="row" flexGrow={1}>
        {children}
      </Grid>
      <Footer onExit={onExit} loggedUser={!!loggedUser} />
    </Box>
  );
}
