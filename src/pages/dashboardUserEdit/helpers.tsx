import { styled, TextField } from '@mui/material';
import { ENV } from '../../utils/env';

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
        return ENV.DOCUMENTATION_LINKS.PAGOPA_EC;
      } else if (institutionType === 'PSP') {
        return ENV.DOCUMENTATION_LINKS.PAGOPA_PSP;
      } else if (institutionType === 'PT') {
        return ENV.DOCUMENTATION_LINKS.PAGOPA_PT;
      }
      return '';

    case 'prod-pn':
      return ENV.DOCUMENTATION_LINKS.SEND;

    case 'prod-interop':
      return ENV.DOCUMENTATION_LINKS.PDND;

    default:
      return '';
  }
};
