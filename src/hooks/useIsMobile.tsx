import { useMediaQuery } from '@mui/material';
import { Breakpoint, useTheme } from '@mui/system';

export const useIsMobile = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};
