import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, Divider, Grid, Radio, Tooltip, Typography } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { TitleBox } from '@pagopa/selfcare-common-frontend/lib';
import { FormikProps } from 'formik';
import React, { SetStateAction } from 'react';
import { Party } from '../../../../../../model/Party';
import { PartyUserOnCreation } from '../../../../../../model/PartyUser';
import { Product } from '../../../../../../model/Product';
import { ProductRole, ProductRolesLists } from '../../../../../../model/ProductRole';
import { commonStyles, CustomFormControlLabel } from '../../../../utils/helpers';
import { isAddRoleFromDashboard, isAddRoleFromDashboardAsync } from '../utils/addUserFormUtils';

interface ProductRolesSectionProps {
  party: Party;
  productRoles: ProductRolesLists;
  dynamicDocLink: string;
  formik: FormikProps<PartyUserOnCreation>;
  validTaxcode: string | undefined;
  setIsAddInBulkEAFlow: (value: SetStateAction<boolean>) => void;
  isAdminEaOnProdIO: boolean;
  setIsAsyncFlow: (value: SetStateAction<boolean>) => void;
  userProduct: Product | undefined;
  renderLabel: (role: ProductRole, enabled: boolean) => any;
  t: (key: string) => string;
}

// Divider with a word in the middle, e.g. "—— or ——"
const LabeledDivider = ({ label }: { label: string }) => (
  <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
    <Divider sx={{ borderColor: 'background.default', flexGrow: 1 }} />
    <Typography
      variant="body2"
      sx={{ mx: 2, color: 'text.secondary', whiteSpace: 'nowrap', textTransform: 'lowercase' }}
    >
      {label}
    </Typography>
    <Divider sx={{ borderColor: 'background.default', flexGrow: 1 }} />
  </Grid>
);

export const ProductRolesSection = ({
  productRoles,
  dynamicDocLink,
  formik,
  validTaxcode,
  setIsAddInBulkEAFlow,
  isAdminEaOnProdIO,
  setIsAsyncFlow,
  userProduct,
  party,
  renderLabel,
  t,
}: ProductRolesSectionProps) => {
  const addRole = async (r: ProductRole) => {
    // eslint-disable-next-line functional/no-let
    let nextProductRoles;
    if (r.multiroleGroups && r.multiroleGroups.length > 0 && formik.values.productRoles.length > 0) {
      const firstSelectedRole = productRoles?.groupByProductRole[formik.values.productRoles[0]];
      const shareGroup = firstSelectedRole?.multiroleGroups?.some((group) => r.multiroleGroups?.includes(group));

      if (!shareGroup) {
        nextProductRoles = [r.productRole];
      } else {
        const productRoleIndex = formik.values.productRoles.findIndex((p) => p === r.productRole);
        if (productRoleIndex === -1) {
          nextProductRoles = formik.values.productRoles.concat([r.productRole]);
        } else {
          nextProductRoles = formik.values.productRoles.filter((_p, i) => i !== productRoleIndex);
        }
      }
    } else {
      nextProductRoles = [r.productRole];
    }
    await formik.setFieldValue('productRoles', nextProductRoles, true);
  };

  const renderRoleRow = (p: ProductRole) => (
    <Box
      key={p.productRole}
      aria-label={`${p.title}`}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        my: 2,
      }}
    >
      <CustomFormControlLabel
        sx={{ marginTop: 0 }}
        checked={formik.values.productRoles.indexOf(p.productRole) > -1}
        disabled={!validTaxcode}
        value={p.productRole}
        control={p.multiroleGroups && p.multiroleGroups.length > 0 ? <Checkbox /> : <Radio />}
        label={renderLabel(p, !!validTaxcode)}
        aria-label={`${p.title}`}
        onClick={
          validTaxcode
            ? async () => {
              await addRole(p);
              if (!isAdminEaOnProdIO) {
                setIsAddInBulkEAFlow(
                  p?.phasesAdditionAllowed.includes('dashboard-aggregator') &&
                  party.products.some(
                    (prod) => prod.productId === userProduct?.id && prod.isAggregator
                  )
                );
              }

              setIsAsyncFlow(p?.phasesAdditionAllowed.includes('dashboard-async'));
            }
            : undefined
        }
      />
      {isAddRoleFromDashboardAsync(p?.phasesAdditionAllowed) && (
        <Tooltip title={t('userEdit.addForm.role.adminTooltip')} placement="top" arrow>
          <InfoOutlinedIcon sx={{ cursor: 'pointer' }} color="primary" />
        </Tooltip>
      )}
    </Box>
  );

  // Flatten all dashboard-eligible roles, then split into exclusive (radio) vs multi-select (checkbox)
  const allDashboardRoles = Object.values(productRoles.groupBySelcRole).flatMap((roles) =>
    roles.filter((r) => isAddRoleFromDashboard(r.phasesAdditionAllowed))
  );

  const exclusiveRoles = allDashboardRoles.filter(
    (r) => !r.multiroleGroups || r.multiroleGroups.length === 0
  );
  const multiSelectRoles = allDashboardRoles.filter(
    (r) => r.multiroleGroups && r.multiroleGroups.length > 0
  );

  // Group multi-select roles by their multiroleGroups key
  const groupedMultiRoles = multiSelectRoles.reduce((acc, r) => {
    const key = (r.multiroleGroups ?? []).join(',');
    if (!acc[key]) {
      // eslint-disable-next-line functional/immutable-data
      acc[key] = [];
    }
    // eslint-disable-next-line functional/immutable-data
    acc[key].push(r);
    return acc;
  }, {} as Record<string, Array<ProductRole>>);

  const multiRoleGroupEntries = Object.values(groupedMultiRoles);

  return (
    <Grid item container xs={12} mb={3} sx={{ ...commonStyles, flexDirection: 'column' }}>
      <TitleBox
        variantTitle="h6"
        variantSubTitle="body2"
        title={t('userEdit.addForm.role.title')}
        subTitle={t('userEdit.addForm.role.subTitle')}
        mbTitle={2}
        mbSubTitle={1}
      />
      {dynamicDocLink.length > 0 && (
        <Grid item xs={12} justifyContent={'left'}>
          <ButtonNaked
            component="button"
            color="primary"
            sx={{
              fontWeight: 'fontWeightBold',
              fontSize: '14px',
              textDecoration: 'underline',
            }}
            onClick={() => {
              window.open(dynamicDocLink);
            }}
          >
            {t('userEdit.addForm.role.documentationLink')}
          </ButtonNaked>
        </Grid>
      )}

      {/* Exclusive roles (radio) */}
      {exclusiveRoles.map((p) => renderRoleRow(p))}

      {/* Divider between exclusive and multi-select sections */}
      {exclusiveRoles.length > 0 && multiSelectRoles.length > 0 && <LabeledDivider label={t('userEdit.addForm.role.or')} />}

      {/* Multi-select roles (checkbox), grouped, with labeled divider between groups */}
      {multiRoleGroupEntries.map((group, groupIndex) => (
        <React.Fragment key={group[0].productRole}>
          {group.map((p) => renderRoleRow(p))}
          {multiRoleGroupEntries.length !== groupIndex + 1 && <LabeledDivider label={t('userEdit.addForm.role.or')} />}
        </React.Fragment>
      ))}
    </Grid>
  );
};