import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useMemo } from 'react';
import { Box, Button, FormControl, Select, Typography, Grid, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTheme } from '@mui/material';
import MDSpinner from 'react-md-spinner';
import { ProductRole, productRolesGroupBySelcRole } from '../../../../model/ProductRole';
import { UserRole } from '../../../../model/Party';
import { UsersTableFiltersConfig } from './UsersTableFilters';

const CustomSelect = styled(Select)({
  '& .MuiInput-root': {
    cursor: 'pointer',
  },
  '& .MuiSelect-select.MuiSelect-outlined': {
    cursor: 'pointer',
    paddingTop: '7px',
    paddingBottom: '7px',
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
};

type ProductRolesGroupByTitle = { [title: string]: Array<ProductRole> };

const productRolesGroupByTitle = (roles: Array<ProductRole>): ProductRolesGroupByTitle =>
  roles.reduce((acc, r) => {
    // eslint-disable-next-line functional/immutable-data
    acc[r.title] = (acc[r.title] ?? []).concat([r]);
    return acc;
  }, {} as ProductRolesGroupByTitle);

const emptySelcRoleGroup = { ADMIN: {}, LIMITED: {} };
const labels = {
  ADMIN: {
    titleKey: 'usersTable.filterRole.admin.title',
    descriptionKey: 'usersTable.filterRole.admin.description',
  },
  LIMITED: {
    titleKey: 'usersTable.filterRole.limited.title',
    descriptionKey: 'usersTable.filterRole.limited.description',
  },
};

const productList = (
  productRoles: Array<ProductRole>
): {
  [selcRole in UserRole]: ProductRolesGroupByTitle;
} =>
  Object.fromEntries(
    Object.entries(productRolesGroupBySelcRole(productRoles)).map(([selcRole, roles]) => [
      selcRole,
      productRolesGroupByTitle(roles),
    ])
  ) as {
    [selcRole in UserRole]: ProductRolesGroupByTitle;
  };

export default function UsersTableRolesFilter({
  productRolesSelected,
  productRolesList,
  onFiltersChange,
  filters,
  showSelcRoleGrouped,
  loading,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const selcRoleGroup = useMemo(() => productList(productRolesList), [productRolesList]);
  const productFiltered = useMemo(() => productList(productRolesSelected), [productRolesSelected]);
  const selcGroups = Object.keys(selcRoleGroup) as Array<UserRole>;

  const [productRoleCheckedBySelcRole, setProductRoleCheckedBySelcRole] = React.useState<{
    [selcRole in UserRole]: ProductRolesGroupByTitle;
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
            ml: showSelcRoleGrouped ? 3 : 1,
            mb: 1,
          }}
          onClick={() => handleProductRole(isSelected, selcGroupSelected, selcRole, title, roles)}
        >
          <FormControlLabel
            key={title}
            sx={{ height: '30px' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
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

  const isSelcGroupTotallySelected = (selcRole: UserRole) => {
    const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
    const selcGroup = selcRoleGroup[selcRole];
    return Object.keys(selcGroupSelected).length === Object.keys(selcGroup).length;
  };

  const selcGroupTotallySelected: { [userRole in UserRole]: boolean } = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(selcRoleGroup) as Array<UserRole>).map((s: UserRole) => [
          s,
          showSelcRoleGrouped ? isSelcGroupTotallySelected(s) : false,
        ])
      ) as { [userRole in UserRole]: boolean },
    [selcRoleGroup, productRoleCheckedBySelcRole]
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl variant="standard">
        <Box display="flex" alignItems="center">
          {loading && (
            <Box mr={3} display="flex">
              <MDSpinner singleColor={theme.palette.primary.main} />
            </Box>
          )}
          <Box width="100%" mr={2}>
            <CustomSelect
              multiple
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
                width: '320px',
                '.MuiInput-input:focus': { backgroundColor: 'transparent' },
              }}
            >
              {selcGroups.map((selcRole) => {
                const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
                const selcGroup = selcRoleGroup[selcRole];
                const isSelected = selcGroupTotallySelected[selcRole];

                return [
                  showSelcRoleGrouped ? (
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
                        label={
                          <Grid container sx={{ height: '100%', whiteSpace: 'normal' }}>
                            <Grid item>
                              <Typography
                                variant="body2"
                                sx={{ color: 'colorTextPrimary', fontWeight: 'fontWeightMedium' }}
                              >
                                {t(labels[selcRole].titleKey)}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body2"
                                sx={{ color: '#475A6D', fontSize: '12px' }}
                              >
                                {t(labels[selcRole].descriptionKey)}
                              </Typography>
                            </Grid>
                          </Grid>
                        }
                        control={
                          <Checkbox
                            sx={{ padding: '0 9px' }}
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
          </Box>
          <Box display="flex" sx={{ width: '100%' }}>
            <Box mr={4}>
              <Button
                disabled={isEqual(productRolesSelected, nextProductRolesFilter)}
                sx={{ height: '40px' }}
                color="primary"
                variant="outlined"
                type="submit"
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    productIds: nextProductRolesFilter.map((f) => f.productId),
                    productRoles: nextProductRolesFilter,
                  });
                }}
              >
                {t('usersTable.filterRole.addFiltersButton')}
              </Button>
            </Box>
            <Box display="flex" alignItems="center" mr={1}>
              <ButtonNaked
                disabled={nextProductRolesFilter.length === 0}
                sx={{ width: '100%', height: '32px' }}
                color="primary"
                onClick={() => {
                  onFiltersChange({ ...filters, productIds: [], productRoles: [] });
                }}
              >
                {t('usersTable.filterRole.deleteFiltersButton')}
              </ButtonNaked>
            </Box>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
}
