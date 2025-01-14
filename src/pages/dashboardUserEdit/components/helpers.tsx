import { Typography } from '@mui/material';
import { ProductRole } from '../../../model/ProductRole';

export const renderLabel = (p: ProductRole, validTaxcode: boolean, isAddAdminDisabledForPSP: boolean) => (
  <>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 'fontWeightRegular',
        fontSize: '18px',
        color: !validTaxcode || isAddAdminDisabledForPSP ? 'text.disabled' : 'colorTextPrimary',
      }}
    >
      {p.title}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'fontWeightRegular',
        fontSize: 'fontSize',
        color: !validTaxcode || isAddAdminDisabledForPSP ? 'text.disabled' : 'text.secondary',
        marginBottom: 1,
      }}
    >
      {p.description}
    </Typography>
  </>
);
