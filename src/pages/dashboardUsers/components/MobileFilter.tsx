import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  styled,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Party } from '../../../model/Party';
import { Product } from '../../../model/Product';
import { ProductsRolesMap } from '../../../model/ProductRole';
import UsersTableActions from './UsersTableActions/UsersTableActions';
import { UsersTableFiltersConfig } from './UsersTableActions/UsersTableFilters';

const MobileDialog = styled(Dialog)(({ theme }) => {
  const baseStyles = {
    '& .MuiDialogContent-root': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: '1 1 auto',
      overflowX: 'hidden',
      paddingTop: '0px',
    },
    '& .MuiDialogActions-root': {
      display: 'block',
      textAlign: 'center',
      '& .MuiButton-root': {
        width: '100%',
        margin: '10px 0',
      },
    },
  };

  const xsStyles = {
    '& .MuiDialog-container': {
      height: 'auto',
      bottom: 0,
      position: 'absolute',
      width: '100%',
    },
    '& .MuiPaper-root': {
      borderRadius: '8px 8px 0px 0px',
      width: '100%',
      maxWidth: '100vw',
      margin: 0,
    },
  };

  const smStyles = {
    '& .MuiDialog-container': {
      height: '100%',
      right: 0,
      position: 'absolute',
      width: '70%',
    },
    '& .MuiPaper-root': {
      borderRadius: '0px 0px 0px 0px',
      width: '100%',
      height: '100%',
      maxWidth: '85vw',
      maxHeight: '100vh',
      margin: 0,
    },
  };

  return {
    ...baseStyles,
    ...xsStyles,
    [theme.breakpoints.up('sm')]: smStyles,
  };
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  loading: boolean;
  party: Party;
  productsRolesMap: ProductsRolesMap;
  filters: UsersTableFiltersConfig;
  setOpenDialogMobile: React.Dispatch<React.SetStateAction<boolean>>;
  openDialogMobile: boolean;
  activeProducts: Array<Product>;
  selectedProductSection: string | undefined;
  setFilters: React.Dispatch<React.SetStateAction<UsersTableFiltersConfig>>;
  searchByName: string;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
  disableRemoveFiltersButton: boolean;
  setDisableRemoveFiltersButton: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileFilter({
  loading,
  party,
  productsRolesMap,
  filters,
  setOpenDialogMobile,
  openDialogMobile,
  activeProducts,
  selectedProductSection,
  setFilters,
  searchByName,
  setSearchByName,
  disableRemoveFiltersButton,
  setDisableRemoveFiltersButton,
}: Props) {
  const { t } = useTranslation();
  const isMobile = useIsMobile('md');

  useEffect(() => {
    setOpenDialogMobile(false);
  }, [!isMobile]);

  const handleClose = () => {
    setOpenDialogMobile(false);
  };

  return (
    <MobileDialog
      open={openDialogMobile}
      fullWidth
      sx={{ alignItems: 'center' }}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle px={3} pt={3} pb={0}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant='overline'
              sx={{ fontSize: '14px', fontWeight: 'fontWeightBold', textAlign: 'left' }}
            >
              {t('usersTable.filterRole.addFilters')}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
            <CloseIcon
              onClick={handleClose}
              aria-label='Chiudi'
            />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex' }}>
        <Grid sx={{ flexGrow: 1, width: '100%', maxWidth: '100%', marginLeft: 0 }}>
          <UsersTableActions
            disableFilters={loading}
            loading={loading}
            party={party}
            products={activeProducts}
            productsRolesMap={
              !selectedProductSection
                ? productsRolesMap
                : { [selectedProductSection]: productsRolesMap[selectedProductSection] }
            }
            filters={filters}
            onFiltersChange={setFilters}
            showSelcRoleGrouped={false}
            setOpenDialogMobile={setOpenDialogMobile}
            searchByName={searchByName}
            setSearchByName={setSearchByName}
            disableRemoveFiltersButton={disableRemoveFiltersButton}
            setDisableRemoveFiltersButton={setDisableRemoveFiltersButton}
          />
        </Grid>
      </DialogContent>
    </MobileDialog>
  );
}
