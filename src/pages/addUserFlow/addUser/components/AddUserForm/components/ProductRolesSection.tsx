import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Checkbox, Divider, Grid, Radio, Tooltip } from '@mui/material';
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

// 3. ProductRolesSection Component
interface ProductRolesSectionProps {
  party: Party;
  productRoles: ProductRolesLists;
  dynamicDocLink: string;
  formik: FormikProps<PartyUserOnCreation>;
  validTaxcode: string | undefined;
  setIsAddInBulkEAFlow: (value: SetStateAction<boolean>) => void;
  setIsAsyncFlow: (value: SetStateAction<boolean>) => void;
  userProduct: Product | undefined;
  renderLabel: (role: ProductRole, enabled: boolean) => any;
  t: (key: string) => string;
}

export const ProductRolesSection = ({
  productRoles,
  dynamicDocLink,
  formik,
  validTaxcode,
  setIsAddInBulkEAFlow,
  setIsAsyncFlow,
  userProduct,
  party,
  renderLabel,

  t,
}: ProductRolesSectionProps) => {
  const addRole = async (r: ProductRole) => {
    // eslint-disable-next-line functional/no-let
    let nextProductRoles;
    if (r.multiroleAllowed && formik.values.productRoles.length > 0) {
      if (productRoles?.groupByProductRole[formik.values.productRoles[0]].selcRole !== r.selcRole) {
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
      {Object.values(productRoles.groupBySelcRole).map((roles) =>
        roles
          .filter((r) => isAddRoleFromDashboard(r.phasesAdditionAllowed))
          .map((p, index: number, filteredRoles) => (
            <React.Fragment key={p.productRole}>
              <Box
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
                  control={roles.length > 1 && p.multiroleAllowed ? <Checkbox /> : <Radio />}
                  label={renderLabel(p, !!validTaxcode)}
                  aria-label={`${p.title}`}
                  onClick={
                    validTaxcode
                      ? async () => {
                          await addRole(p);
                          setIsAddInBulkEAFlow(
                            p?.phasesAdditionAllowed.includes('dashboard-aggregator') &&
                              party.products.some(
                                (p) => p.productId === userProduct?.id && p.isAggregator
                              )
                          );
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
              {filteredRoles.length !== index + 1 && (
                <Grid item xs={12}>
                  <Divider sx={{ borderColor: 'background.default' }} />
                </Grid>
              )}
            </React.Fragment>
          ))
      )}
    </Grid>
  );
};
