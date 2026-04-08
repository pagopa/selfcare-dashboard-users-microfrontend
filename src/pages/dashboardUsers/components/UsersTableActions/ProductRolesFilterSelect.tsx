import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole, UserRoleFilters } from '../../../../model/Party';
import { ProductRole } from '../../../../model/ProductRole';
import { CustomSelect, labels, productList, ProductRolesGroupByTitle } from './helpers';

const MenuProps = {
  PaperProps: {
    style: {
      width: '300px',
    },
  },
};

type Props = {
  productRolesList: Array<ProductRole>;
  productRoleCheckedBySelcRole: { [selcRole in UserRoleFilters]: ProductRolesGroupByTitle };
  showSelcRoleGrouped: boolean;
  handleUserRole: (
    isSelected: boolean,
    selcGroup: ProductRolesGroupByTitle,
    selcRole: UserRole
  ) => void;
  handleProductRole: (
    isSelected: boolean,
    selcGroupSelected: ProductRolesGroupByTitle,
    selcRole: UserRole,
    title: string,
    roles: Array<ProductRole>
  ) => void;
};

export const ProductRolesFilterSelect = ({
  productRolesList,
  productRoleCheckedBySelcRole,
  showSelcRoleGrouped,
  handleUserRole,
  handleProductRole,
}: Props) => {
  const { t } = useTranslation();
  const isPnpg = window.location.hostname?.startsWith('imprese');

  const selcRoleGroup = useMemo(() => productList(productRolesList), [productRolesList]);
  const selcGroups = Object.keys(selcRoleGroup) as Array<UserRoleFilters>;

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
          value={`child-${selcRole}-${title}`}
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

  return (
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
          ? [`group-${s}-${t(labels[s].titleKey)}`]
          : Object.keys(productRoleCheckedBySelcRole[s]).map((title) => `child-${s}-${title}`)
      )}
      renderValue={(selected: any) => {
        if (selected.length === 0) {
          return (
            <Box sx={{ fontStyle: 'normal', cursor: 'pointer' }}>
              {t('usersTable.filterRole.placeholder')}
            </Box>
          );
        }

        const displayValues = selected.map((value: string) => {
          const secondDashIndex = value.indexOf('-', value.indexOf('-') + 1);
          return secondDashIndex !== -1 ? value.substring(secondDashIndex + 1) : value;
        });

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
            {displayValues.join(', ')}
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
              value={`group-${selcRole}-${t(labels[selcRole].titleKey)}`}
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
  );
};
