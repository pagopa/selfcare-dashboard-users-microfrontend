import { Button, Grid, ListItemText, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useLiveAnnouncerWithRegion } from '@pagopa/selfcare-common-frontend/lib';
import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { PartyRole, UserRole, UserRoleFilters } from '../../../../model/Party';
import { ProductRole } from '../../../../model/ProductRole';
import {
  CustomSelect,
  emptySelcRoleGroup,
  partyRoleList,
  productList,
  ProductRolesGroupByTitle,
} from './helpers';
import { ProductRolesFilterSelect } from './ProductRolesFilterSelect';
import { UsersTableFiltersConfig } from './UsersTableFilters';

type Props = {
  productRolesList: Array<ProductRole>;
  productRolesSelected: Array<ProductRole>;
  filters: UsersTableFiltersConfig;
  onFiltersChange: (f: UsersTableFiltersConfig) => void;
  disableFilters: boolean;
  showSelcRoleGrouped: boolean;
  loading: boolean;
  setOpenDialogMobile: React.Dispatch<React.SetStateAction<boolean>>;
  searchByName: string;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
  disableRemoveFiltersButton: boolean;
  setDisableRemoveFiltersButton: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPartyRoles: Array<PartyRole>;
  setSelectedPartyRoles: React.Dispatch<React.SetStateAction<Array<PartyRole>>>;
};

export default function UsersTableRolesFilter({
  productRolesSelected,
  productRolesList,
  onFiltersChange,
  filters,
  showSelcRoleGrouped,
  searchByName,
  setSearchByName,
  disableRemoveFiltersButton,
  setDisableRemoveFiltersButton,
  selectedPartyRoles,
  setSelectedPartyRoles,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const isMobile = useIsMobile('md');

  const productFiltered = useMemo(() => productList(productRolesSelected), [productRolesSelected]);

  const { announce, LiveRegion } = useLiveAnnouncerWithRegion();

  const [productRoleCheckedBySelcRole, setProductRoleCheckedBySelcRole] = useState<{
    [selcRole in UserRoleFilters]: ProductRolesGroupByTitle;
  }>(emptySelcRoleGroup);

  const partyRoleOptions = useMemo(() => partyRoleList(productRolesList), [productRolesList]);

  const isPagoPa = isPagoPaUser();

  const nextProductRolesFilter = useMemo(
    () =>
      Object.values(productRoleCheckedBySelcRole)
        .flatMap((groupByTitle) => Object.values(groupByTitle))
        .flatMap((x) => x),
    [productRoleCheckedBySelcRole]
  );

  useEffect(() => {
    if (productRolesSelected) {
      setProductRoleCheckedBySelcRole(productFiltered);
    } else {
      setProductRoleCheckedBySelcRole(emptySelcRoleGroup);
    }
  }, [productRolesSelected]);

  const handleUserRole = (
    isSelected: boolean,
    selcGroup: ProductRolesGroupByTitle,
    selcRole: UserRole
  ) => {
    const nextSelcGroupSelected = isSelected ? {} : { ...selcGroup };
    setProductRoleCheckedBySelcRole({
      ...productRoleCheckedBySelcRole,
      [selcRole]: nextSelcGroupSelected,
    });
  };

  const handleProductRole = (
    isSelected: boolean,
    selcGroupSelected: ProductRolesGroupByTitle,
    selcRole: UserRole,
    title: string,
    roles: Array<ProductRole>
  ) => {
    const nextSelcGroupSelected = isSelected
      ? Object.fromEntries(Object.entries(selcGroupSelected).filter(([t, _rs]) => t !== title))
      : { ...selcGroupSelected, [title]: roles };
    setProductRoleCheckedBySelcRole({
      ...productRoleCheckedBySelcRole,
      [selcRole]: nextSelcGroupSelected,
    });
  };

  const handleSubmit = () => {
    if (isPagoPa) {
      onFiltersChange({
        ...filters,
        productIds: nextProductRolesFilter.map((f) => f.productId),
        partyRoles: selectedPartyRoles,
      });
    } else {
      onFiltersChange({
        ...filters,
        productIds: nextProductRolesFilter.map((f) => f.productId),
        productRoles: nextProductRolesFilter,
      });
    }
    setDisableRemoveFiltersButton(false);
    announce(t('accessibility.filterUsers'));
  };

  const handleResetFilters = () => {
    onFiltersChange({ ...filters, productIds: [], productRoles: [], partyRoles: [] });
    setSearchByName('');
    setSelectedPartyRoles([]);
    setDisableRemoveFiltersButton(true);
    announce(t('accessibility.removeFilters'));
  };

  const handleRolesChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as Array<PartyRole>;
    setSelectedPartyRoles(value);
  };

  const isFilterButtonDisabled = isPagoPa
    ? selectedPartyRoles.length === 0 && searchByName.length < 3
    : isEqual(productRolesSelected, nextProductRolesFilter) && searchByName.length < 3;
  /*
TODO for status filter
  const PARTY_STATUS_OPTIONS: Array<PartyStatus> = [
    'ACTIVE',
    'SUSPENDED',
    'PENDING',
    'TOBEVALIDATED',
    'REJECTED',
  ];

  const [selectedStatus, setSelectedStatus] = useState<PartyStatus | ''>('');

  const handleStatusChange = (event: SelectChangeEvent<PartyStatus | ''>) => {
    setSelectedStatus(event.target.value as PartyStatus | '');
  };
*/
  return (
    <Grid
      container
      width="100%"
      spacing={isMobile ? 3 : 2}
      display="flex"
      mt={isMobile ? 0 : 5}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {LiveRegion}
      <Grid item xs={12} md={5} width="100%">
        <TextField
          fullWidth
          size="small"
          type="search"
          label={t('usersTable.filterRole.searchByName')}
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4.5}>
        {isPagoPa ? (
          <CustomSelect
            fullWidth
            size="small"
            multiple
            value={selectedPartyRoles}
            onChange={handleRolesChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              (selected as Array<PartyRole>).length === 0
                ? t('usersTable.filterRole.placeholder')
                : (selected as Array<PartyRole>).join(', ')
            }
            displayEmpty
          >
            {partyRoleOptions.map((role) => (
              <MenuItem key={role} value={role}>
                <Checkbox checked={selectedPartyRoles.includes(role)} />
                <ListItemText primary={role} />
              </MenuItem>
            ))}
          </CustomSelect>
        ) : (
          <ProductRolesFilterSelect
            productRolesList={productRolesList}
            productRoleCheckedBySelcRole={productRoleCheckedBySelcRole}
            showSelcRoleGrouped={showSelcRoleGrouped}
            handleUserRole={handleUserRole}
            handleProductRole={handleProductRole}
          />
        )}
      </Grid>

      <Grid item xs={12} md={1}>
        <Button
          disabled={isFilterButtonDisabled}
          color="primary"
          variant="outlined"
          type="submit"
          size="small"
          fullWidth
          onClick={handleSubmit}
        >
          {t('usersTable.filterRole.addFilters')}
        </Button>
      </Grid>
      <Grid item xs={12} md={1.5} display="flex" alignItems="center">
        <ButtonNaked
          disabled={nextProductRolesFilter.length === 0 && disableRemoveFiltersButton}
          color="primary"
          fullWidth
          size="small"
          onClick={handleResetFilters}
        >
          {t('usersTable.filterRole.deleteFilters')}
        </ButtonNaked>
      </Grid>
    </Grid>
  );
}
