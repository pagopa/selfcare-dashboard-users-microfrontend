import { styled, TextField } from '@mui/material';

export const CustomTextField = styled(TextField)({
  '.MuiInputLabel-asterisk': {
    display: 'none',
  },
  '.MuiInput-root': {
    '&:after': {
      borderBottom: '2px solid text.primary',
      color: 'text.primary',
    },
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: 'text.primary',
    fontWeight: 'fontWeightBold',
  },
  '.MuiInputLabel-root': {
    color: 'text.primary',
    fontSize: 'fontSize',
    fontWeight: 'fontWeightBold',
  },
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      color: 'text.primary',
      opacity: '1',
      textTransform: 'none',
    },
  },
});

export const commonStyles = {
  backgroundColor: 'background.paper',
  paddingTop: 3,
  paddingLeft: 3,
  paddingRight: 3,
  borderRadius: '4px',
  marginBottom: 5,
};

export const taxCodeRegexp = new RegExp(
  '^[A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1}$'
);
export const requiredError = 'Required';

export const getProductLink = (productId: string, institutionType?: string): string => {
  switch (productId) {
    case 'prog-pagopa':
      if (['PA', 'GPS', 'GPU', 'PRV'].includes(institutionType ?? '')) {
        return 'https://developer.pagopa.it/pago-pa/guides/manuale-bo-ec/manuale-operativo-back-office-pagopa-ente-creditore/funzionalita/matrice-ruoli-funzionalita';
      } else if (institutionType === 'PSP') {
        return 'https://developer.pagopa.it/pago-pa/guides/manuale-bo-psp/manuale-operativo-pagamenti-pagopa-prestatore-di-servizi-di-pagamento/funzionalita';
      } else if (institutionType === 'PT') {
        return 'https://developer.pagopa.it/pago-pa/guides/manuale-bo-pt/manuale-operativo-back-office-pagopa-partner-tecnologico/funzionalita/matrice-ruoli-funzionalita';
      }
      return '';

    case 'prod-pn':
      return 'https://docs.pagopa.it/manuale-operativo/piattaforma-notifiche-digitali-manuale-operativo/mittente';

    case 'prod-interop':
      return "https://docs.pagopa.it/interoperabilita-1/manuale-operativo/guida-alladesione#aggiungere-o-rimuovere-un-operatore-amministrativo-a-pdnd-interoperabilita";

    default:
      return '';
  }
};
