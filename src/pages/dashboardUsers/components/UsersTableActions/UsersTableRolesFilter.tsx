import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useMemo } from 'react';
import { Box, FormControl, Select, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { ProductRole } from '../../../../model/ProductRole';
import { UserRole } from '../../../../model/Party';

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
      marginLeft: '12px',
      width: '300px',
    },
  },
};
type Props = {
  productRolesList: Array<ProductRole>;
  productRolesSelected: Array<ProductRole>;
  showSelcRoleGrouped: boolean;
  setProductRoleCheckedBySelcRole: React.Dispatch<
    React.SetStateAction<{
      ADMIN: ProductRolesGroupByTitle;
      LIMITED: ProductRolesGroupByTitle;
    }>
  >;
  productRoleCheckedBySelcRole: {
    ADMIN: ProductRolesGroupByTitle;
    LIMITED: ProductRolesGroupByTitle;
  };
  productFiltered: {
    ADMIN: ProductRolesGroupByTitle;
    LIMITED: ProductRolesGroupByTitle;
  };
  productList: (productRoles: Array<ProductRole>) => {
    ADMIN: ProductRolesGroupByTitle;
    LIMITED: ProductRolesGroupByTitle;
  };
};

type ProductRolesGroupByTitle = { [title: string]: Array<ProductRole> };

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

export default function UsersTableRolesFilter({
  productRolesSelected,
  productRolesList,
  showSelcRoleGrouped,
  setProductRoleCheckedBySelcRole,
  productRoleCheckedBySelcRole,
  productFiltered,
  productList,
}: Props) {
  const { t } = useTranslation();
  const selcRoleGroup = useMemo(() => productList(productRolesList), [productRolesList]);
  const selcGroups = Object.keys(selcRoleGroup) as Array<UserRole>;

  useEffect(() => {
    if (productRolesSelected) {
      setProductRoleCheckedBySelcRole(productFiltered);
    } else {
      setProductRoleCheckedBySelcRole(emptySelcRoleGroup);
    }
  }, [productRolesSelected]);

  const children = (
    selcRole: UserRole,
    selcGroup: ProductRolesGroupByTitle,
    selcGroupSelected: ProductRolesGroupByTitle
  ) => (
    <Box
      key={`${selcRole}-children`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ml: showSelcRoleGrouped ? 2 : 0,
      }}
    >
      {Object.entries(selcGroup).map(([title, roles]) => {
        const isSelected = !!selcGroupSelected[title];
        return (
          <FormControlLabel
            key={title}
            label={
              <Typography
                variant="body2"
                sx={{ color: 'black', fontSize: '14px' }}
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
                onChange={() => {
                  const nextSelcGroupSelected = isSelected
                    ? Object.fromEntries(
                        Object.entries(selcGroupSelected).filter(([t, _rs]) => t !== title)
                      )
                    : { ...selcGroupSelected, [title]: roles };
                  setProductRoleCheckedBySelcRole({
                    ...productRoleCheckedBySelcRole,
                    [selcRole]: nextSelcGroupSelected,
                  });
                }}
              />
            }
          />
        );
      })}
    </Box>
  );

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
    <Box>
      <FormControl sx={{ width: 300 }} variant="standard">
        <CustomSelect
          multiple
          MenuProps={MenuProps}
          variant="outlined"
          displayEmpty
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
            '.MuiInput-input:focus': { backgroundColor: 'transparent' },
          }}
        >
          <Box px={3} mt={showSelcRoleGrouped ? 0 : 1}>
            {selcGroups.map((selcRole) => {
              const selcGroupSelected = productRoleCheckedBySelcRole[selcRole];
              const selcGroup = selcRoleGroup[selcRole];
              const isSelected = selcGroupTotallySelected[selcRole];

              return [
                showSelcRoleGrouped ? (
                  <Box mt={2} key={selcRole}>
                    <FormControlLabel
                      sx={{ height: '70px', display: 'flex', alignItems: 'flex-start' }}
                      label={
                        <Grid container sx={{ height: '100%' }}>
                          <Grid item>
                            <Typography
                              variant="body2"
                              sx={{ color: 'black', fontStyle: 'italic' }}
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
                          sx={{ padding: '0 9px' }}
                          checked={isSelected}
                          indeterminate={!isSelected && Object.keys(selcGroupSelected).length > 0}
                          onChange={() => {
                            const nextSelcGroupSelected = isSelected ? {} : { ...selcGroup };
                            setProductRoleCheckedBySelcRole({
                              ...productRoleCheckedBySelcRole,
                              [selcRole]: nextSelcGroupSelected,
                            });
                          }}
                        />
                      }
                    />
                  </Box>
                ) : undefined,
                children(selcRole, selcGroup, selcGroupSelected),
              ];
            })}
          </Box>
        </CustomSelect>
      </FormControl>
    </Box>
  );
}
