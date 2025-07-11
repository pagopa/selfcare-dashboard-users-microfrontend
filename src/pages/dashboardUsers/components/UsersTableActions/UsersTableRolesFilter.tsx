import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import { ButtonNaked } from '@pagopa/mui-italia';
import { isEqual } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { UserRole, UserRoleFilters } from '../../../../model/Party';
import { ProductRole } from '../../../../model/ProductRole';
import { UsersTableFiltersConfig } from './UsersTableFilters';
import { emptySelcRoleGroup, labels, productList, ProductRolesGroupByTitle } from './helpers';

const CustomSelect = styled(Select)({
  '& .MuiInput-root': {
    cursor: 'pointer',
  },
  '& .MuiSelect-select.MuiSelect-outlined': {
    cursor: 'pointer',
  },
});
const MenuProps = {
  PaperProps: {
    style: {
      width: '300px',
    },
  },
};

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
}: Props) {
  const { t } = useTranslation();
  // const theme = useTheme();
  const isMobile = useIsMobile('md');

  const selcRoleGroup = useMemo(() => productList(productRolesList), [productRolesList]);
  const productFiltered = useMemo(() => productList(productRolesSelected), [productRolesSelected]);
  const selcGroups = Object.keys(selcRoleGroup) as Array<UserRoleFilters>;

  const [productRoleCheckedBySelcRole, setProductRoleCheckedBySelcRole] = React.useState<{
    [selcRole in UserRoleFilters]: ProductRolesGroupByTitle;
  }>(emptySelcRoleGroup);

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

  const isPnpg = window.location.hostname?.startsWith('imprese');

  const children = (
    selcRole: UserRole,
    selcGroup: ProductRolesGroupByTitle,
    selcGroupSelected: ProductRolesGroupByTitle
  ) =>
    Object.entries(selcGroup).map(([title, roles]) => {
      const isSelected = !!selcGroupSelected[title];
      return (
        <MenuItem
          key={`${selcRole}-children-${title}`}
          sx={{
            display: 'flex',
            ml: isPnpg ? 0 : showSelcRoleGrouped ? 3 : 1,
            mb: isPnpg ? 0 : 1,
          }}
          onClick={() => handleProductRole(isSelected, selcGroupSelected, selcRole, title, roles)}
        >
          <FormControlLabel
            key={title}
            sx={{ height: '30px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label={`${title}`}
            label={
              <Typography
                variant="body2"
                sx={{ color: 'black', fontSize: '14px', fontWeight: 'fontWeightMedium' }}
              >{`${title}`}</Typography>
            }
            control={
              <Checkbox
                sx={{
                  color: '#5C6F82',
                  '&.Mui-checked': {
                    color: '#0073E6',
                  },
                }}
                checked={isSelected}
                onChange={() =>
                  handleProductRole(isSelected, selcGroupSelected, selcRole, title, roles)
                }
              />
            }
          />
        </MenuItem>
      );
    });

  const isSelcGroupTotallySelected = (selcRole: UserRoleFilters) => {
    const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
    const selcGroup = selcRoleGroup[selcRole];
    return Object.keys(selcGroupSelected).length === Object.keys(selcGroup).length;
  };

  const selcGroupTotallySelected: { [userRole in UserRoleFilters]: boolean } = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(selcRoleGroup) as Array<UserRoleFilters>).map((s: UserRoleFilters) => [
          s,
          showSelcRoleGrouped ? isSelcGroupTotallySelected(s) : false,
        ])
      ) as { [userRole in UserRoleFilters]: boolean },
    [selcRoleGroup, productRoleCheckedBySelcRole]
  );

  return (
    <Grid
      container
      width="100%"
      spacing={isMobile ? 3 : 2}
      display="flex"
      mt={isMobile ? 0 : 5}
      flexDirection={isMobile ? 'column' : 'row'}
    >
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
        <CustomSelect
          multiple
          fullWidth
          size="small"
          MenuProps={MenuProps}
          variant="outlined"
          displayEmpty
          native={false}
          value={selcGroups.flatMap((s) =>
            selcGroupTotallySelected[s]
              ? [t(labels[s].titleKey)]
              : Object.keys(productRoleCheckedBySelcRole[s])
          )}
          renderValue={(selected: any) => {
            if (selected.length === 0) {
              return (
                <Box sx={{ fontStyle: 'normal', cursor: 'pointer' }}>
                  {t('usersTable.filterRole.placeholder')}
                </Box>
              );
            }
            return (
              <Typography
                sx={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  fontWeight: 'fontWeightMedium',
                }}
              >
                {selected.join(', ')}
              </Typography>
            );
          }}
          sx={{
            width: '100%',
            '.MuiInput-input:focus': { backgroundColor: 'transparent' },
          }}
        >
          {selcGroups.map((selcRole) => {
            const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
            const selcGroup = selcRoleGroup[selcRole];
            const isSelected = selcGroupTotallySelected[selcRole];
            return [
              showSelcRoleGrouped && !isPnpg ? (
                <MenuItem
                  onClick={() => handleUserRole(isSelected, selcGroup, selcRole)}
                  key={selcRole}
                >
                  <FormControlLabel
                    sx={{
                      height: '60px',
                      padding: 1,
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    aria-label={t(labels[selcRole].titleKey)}
                    label={
                      <Grid container sx={{ height: '100%', whiteSpace: 'normal' }}>
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'colorTextPrimary',
                              fontWeight: 'fontWeightMedium',
                            }}
                          >
                            {t(labels[selcRole].titleKey)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" sx={{ color: '#475A6D', fontSize: '12px' }}>
                            {t(labels[selcRole].descriptionKey)}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                    control={
                      <Checkbox
                        sx={{ padding: isPnpg ? 0 : '0 9px' }}
                        checked={isSelected}
                        indeterminate={!isSelected && Object.keys(selcGroupSelected).length > 0}
                        onChange={() => handleUserRole(isSelected, selcGroup, selcRole)}
                      />
                    }
                  />
                </MenuItem>
              ) : undefined,
              children(selcRole, selcGroup, selcGroupSelected),
            ];
          })}
        </CustomSelect>
      </Grid>

      <Grid item xs={12} md={1}>
        <Button
          disabled={
            isEqual(productRolesSelected, nextProductRolesFilter) && searchByName.length < 3
          }
          color="primary"
          variant="outlined"
          type="submit"
          size="small"
          fullWidth
          onClick={() => {
            onFiltersChange({
              ...filters,
              productIds: nextProductRolesFilter.map((f) => f.productId),
              productRoles: nextProductRolesFilter,
            });
            setDisableRemoveFiltersButton(false);
          }}
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
          onClick={() => {
            onFiltersChange({ ...filters, productIds: [], productRoles: [] });
            setSearchByName('');
            setDisableRemoveFiltersButton(true);
          }}
        >
          {t('usersTable.filterRole.deleteFilters')}
        </ButtonNaked>
      </Grid>
    </Grid>
  );
}
