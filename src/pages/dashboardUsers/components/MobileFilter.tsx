import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  styled,
  Typography,
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

const MobileDialog = styled(Dialog)(() => ({
  '& .MuiDialog-container': {
    height: 'auto',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  '& .MuiPaper-root': {
    borderRadius: '24px 24px 0px 0px',
    width: '100%',
    maxWidth: '100vw',
    margin: 0,
  },
  '& .MuiDialogContent-root': {
    paddingTop: '20px !important',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1 1 auto',
    overflowX: 'hidden',
  },
  '& .MuiDialogActions-root': {
    display: 'block',
    textAlign: 'center',
    padding: '20px 24px',

    '.MuiButton-root': {
      width: '100%',
      margin: '10px 0',
    },
  },
}));

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
      <DialogTitle p={3}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              sx={{ fontSize: '24px', fontWeight: 'fontWeightBold', textAlign: 'left' }}
            >
              {t('usersTable.filterRole.addFilters')}
            </Typography>
          </Grid>
          <Grid item>
            <CloseIcon
              onClick={handleClose}
              sx={{
                color: 'action.active',
                width: '32px',
                height: '32px',
              }}
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, width: 'calc(100vw - 100px)' }}>
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
        </Box>
      </DialogContent>
    </MobileDialog>
  );
}
