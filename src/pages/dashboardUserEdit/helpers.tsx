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

