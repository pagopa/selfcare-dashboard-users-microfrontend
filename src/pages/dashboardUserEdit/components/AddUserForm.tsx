import React, { useEffect, useState } from 'react';
import {
  FormControlLabel,
  Grid,
  TextField,
  Divider,
  Radio,
  Button,
  Typography,
  Box,
  Checkbox,
  styled,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import {
  useUnloadEventInterceptor,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Trans, useTranslation } from 'react-i18next';
import { Party } from '../../../model/Party';
import {
  fetchUserRegistryByFiscalCode,
  savePartyUser,
  addUserProductRoles,
} from '../../../services/usersService';
import {
  LOADING_TASK_SAVE_PARTY_USER,
  LOADING_TASK_FETCH_TAX_CODE,
} from '../../../utils/constants';
import { Product } from '../../../model/Product';
import { PartyUserOnCreation } from '../../../model/PartyUser';
import { ProductRole, ProductRolesLists, ProductsRolesMap } from '../../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';

const CustomTextField = styled(TextField)({
  '.MuiInputLabel-asterisk': {
    display: 'none',
  },
  '.MuiInput-root': {
    '&:after': {
      borderBottom: '2px solid text.primary',
      color: 'text.primary',
    },
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: 'text.primary',
    fontWeight: 'fontWeightBold',
  },
  '.MuiInputLabel-root': {
    color: 'text.primary',
    fontSize: 'fontSize',
    fontWeight: 'fontWeightBold',
  },
  label: {
    '&.Mui-error': {
      color: '#5C6F82 !important',
    },
  },
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      color: 'text.primary',
      opacity: '1',
      textTransform: 'none',
    },
  },
});

const CustomFormControlLabel = styled(FormControlLabel)({
  disabled: false,
  '.MuiRadio-root': {
    color: '#0073E6',
  },
});
const taxCodeRegexp = new RegExp(
  '^[A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1}$'
);
const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
const requiredError = 'Required';

type Props = {
  party: Party;
  userId?: string;
  selectedProduct?: Product;
  products: Array<Product>;
  productsRolesMap: ProductsRolesMap;
  canEditRegistryData: boolean;
  initialFormData: PartyUserOnCreation;
  goBack?: () => void;
};

type TextTransform = 'uppercase' | 'lowercase';

export default function AddUserForm({
  party,
  userId,
  selectedProduct,
  products,
  productsRolesMap,
  canEditRegistryData,
  initialFormData,
  goBack,
}: Props) {
  const { t } = useTranslation();
  const setLoadingSaveUser = useLoading(LOADING_TASK_SAVE_PARTY_USER);
  const setLoadingFetchTaxCode = useLoading(LOADING_TASK_FETCH_TAX_CODE);

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const history = useHistory();

  const [validTaxcode, setValidTaxcode] = useState<string>();
  const [userProduct, setUserProduct] = useState<Product>();
  const [productRoles, setProductRoles] = useState<ProductRolesLists>();

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const onExit = useUnloadEventOnExit();

  useEffect(() => {
    if (!initialFormData.taxCode) {
      if (validTaxcode && validTaxcode !== initialFormData.taxCode) {
        fetchTaxCode(validTaxcode, party.partyId);
      } else if (
        !validTaxcode &&
        formik.values.certifiedName === true &&
        formik.values.certifiedSurname === true
      ) {
        void formik.setValues(
          {
            ...formik.values,
            name: formik.initialValues.name,
            surname: formik.initialValues.surname,
            email: formik.initialValues.email,
            confirmEmail: '',
            certifiedName: formik.initialValues.certifiedName,
            certifiedSurname: formik.initialValues.certifiedSurname,
          },
          true
        );
      }
    }
  }, [validTaxcode]);

  useEffect(() => {
    if (initialFormData.taxCode) {
      setValidTaxcode(initialFormData.taxCode);
    }
  }, [initialFormData]);

  useEffect(() => {
    setUserProduct(selectedProduct);
  }, [selectedProduct]);

  const goBackInner =
    goBack ??
    (() =>
      history.push(
        resolvePathVariables(
          selectedProduct
            ? DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.path
            : DASHBOARD_USERS_ROUTES.PARTY_USERS.path,
          {
            partyId: party.partyId,
            productId: userProduct?.id ?? '',
          }
        )
      ));

  const fetchTaxCode = (taxCode: string, partyId: string) => {
    setLoadingFetchTaxCode(true);
    fetchUserRegistryByFiscalCode(taxCode.toUpperCase(), partyId)
      .then((userRegistry) => {
        void formik.setValues(
          {
            ...formik.values,
            name:
              userRegistry?.name ??
              (formik.values.certifiedName ? initialFormData.name : formik.values.name),
            surname:
              userRegistry?.surname ??
              (formik.values.certifiedSurname ? initialFormData.surname : formik.values.surname),
            email:
              userRegistry?.email ??
              (formik.values.certifiedMail ? initialFormData.email : formik.values.email),
            confirmEmail: '',
            certifiedName:
              userRegistry?.certifiedName ??
              (formik.values.certifiedName
                ? initialFormData.certifiedName
                : formik.values.certifiedName),
            certifiedSurname:
              userRegistry?.certifiedSurname ??
              (formik.values.certifiedSurname
                ? initialFormData.certifiedSurname
                : formik.values.certifiedSurname),
          },
          true
        );
      })
      .catch((errors) =>
        addError({
          id: 'FETCH_TAX_CODE',
          blocking: false,
          error: errors,
          techDescription: `An error occurred while fetching Tax Code of Product ${taxCode}`,
          toNotify: true,
        })
      )
      .finally(() => setLoadingFetchTaxCode(false));
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const validate = (values: Partial<PartyUserOnCreation>) => {
    const errors = Object.fromEntries(
      Object.entries({
        name: !values.name ? requiredError : undefined,
        surname: !values.surname ? requiredError : undefined,
        taxCode: !values.taxCode
          ? requiredError
          : !taxCodeRegexp.test(values.taxCode)
          ? t('userEdit.addForm.errors.invalidFiscalCode')
          : undefined,
        email: !values.email
          ? requiredError
          : !emailRegexp.test(values.email)
          ? t('userEdit.addForm.errors.invalidEmail')
          : undefined,
        confirmEmail: !values.confirmEmail
          ? requiredError
          : values.email &&
            values.confirmEmail.toLocaleLowerCase() !== values.email.toLocaleLowerCase()
          ? t('userEdit.addForm.errors.mismatchEmail')
          : undefined,
        productRoles: values.productRoles?.length === 0 ? requiredError : undefined,
      }).filter(([_key, value]) => value)
    );
    if (!errors.taxCode) {
      setValidTaxcode(values.taxCode);
    } else {
      setValidTaxcode(undefined);
    }
    return errors;
  };

  const save = (values: PartyUserOnCreation) => {
    setLoadingSaveUser(true);
    const values2submit = {
      ...values,
      taxCode: values.taxCode.toUpperCase(),
      email: values.email.toLowerCase(),
    };

    (userId
      ? addUserProductRoles(party, userProduct as Product, userId, values2submit)
      : savePartyUser(party, userProduct as Product, values2submit)
    )
      .then((userId) => {
        unregisterUnloadEvent();
        trackEvent(userId ? 'USER_UPDATE' : 'USER_ADD', {
          party_id: party.partyId,
          product: userProduct?.id,
          product_role: values2submit.productRoles,
        });
        addNotify({
          component: 'Toast',
          id: 'SAVE_PARTY_USER',
          title: userId
            ? t('userDetail.actions.successfulAddRole')
            : t('userEdit.addForm.saveUserSuccess'),
          message: '',
        });

        history.push(
          resolvePathVariables(
            selectedProduct
              ? DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.PARTY_PRODUCT_USER_DETAIL.path
              : DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
            {
              partyId: party.partyId,
              productId: selectedProduct?.id ?? '',
              userId,
            }
          )
        );
      })
      .catch((reason) =>
        addError({
          id: 'SAVE_PARTY_USER',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while saving party user ${party.partyId}`,
          toNotify: true,
          displayableTitle: userId
            ? t('userDetail.actions.addRoleError')
            : t('userEdit.addForm.saveUserError'),
          displayableDescription: '',
          component: 'Toast',
        })
      )
      .finally(() => setLoadingSaveUser(false));
  };

  const formik = useFormik<PartyUserOnCreation>({
    initialValues: initialFormData,
    validate,
    onSubmit: (values) => {
      if (values.productRoles.length >= 2) {
        addNotify({
          component: 'SessionModal',
          id: 'MULTI_ROLE_USER',
          title: t('userEdit.addForm.addMultiRoleModal.title'),
          message: (
            <Trans i18nKey="userEdit.addForm.addMultiRoleModal.message">
              {'Stai per assegnare a '}
              <strong>{{ user: `${values.name} ${values.surname} ` }}</strong>
              {`i ruoli `}
              <strong>
                {{
                  roles: `${values.productRoles
                    .map((r) => productRoles?.groupByProductRole[r].title)
                    .join(', ')}`,
                }}
              </strong>
              {' sul prodotto '}
              <strong>{{ productTitle: `${userProduct?.title}.` }}</strong>
              {
                <>
                  <br></br>
                  <br></br>
                </>
              }
              {' Confermi di voler continuare?'}
              {<br></br>}
            </Trans>
          ),
          onConfirm: () =>
            save({
              ...values,
              taxCode: values.taxCode.toUpperCase(),
              email: values.email.toLowerCase(),
            }),
          confirmLabel: t('userEdit.addForm.addMultiRoleModal.confirmButton'),
          closeLabel: t('userEdit.addForm.addMultiRoleModal.closeButton'),
        });
      } else {
        save(values);
      }
    },
  });

  useEffect(() => {
    if (formik.dirty || userProduct) {
      registerUnloadEvent();
    } else {
      unregisterUnloadEvent();
    }
  }, [formik.dirty, userProduct]);

  useEffect(() => {
    if (userProduct) {
      setProductRoles(productsRolesMap[userProduct.id]);
      void formik.setFieldValue('productRoles', [], true);
    }
  }, [userProduct]);

  const addRole = (r: ProductRole) => {
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
    void formik.setFieldValue('productRoles', nextProductRoles, true);
  };

  const baseTextFieldProps = (
    field: keyof PartyUserOnCreation,
    label: string,
    placeholder: string,
    textTransform?: TextTransform
  ) => {
    const isError = !!formik.errors[field] && formik.errors[field] !== requiredError;

    return {
      id: field,
      type: 'text',
      value: formik.values[field],
      label,
      placeholder,
      error: isError,
      helperText: isError ? formik.errors[field] : undefined,
      required: true,
      variant: 'outlined' as const,
      onChange: formik.handleChange,
      sx: { width: '100%' },
      InputProps: {
        style: {
          fontSize: 'fontSize',
          fontWeight: 'fontWeightMedium',
          lineHeight: '24px',
          color: 'text.primary',
          textAlign: 'start' as const,
        },
      },
      inputProps: {
        style: {
          textTransform,
        },
      },
    };
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="column"
          sx={{
            backgroundColor: 'background.paper',
            paddingTop: 3,
            paddingLeft: 3,
            paddingRight: 3,
          }}
        >
          {canEditRegistryData ? (
            <>
              <Grid item spacing={3}>
                <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
                  <CustomTextField
                    {...baseTextFieldProps(
                      'taxCode',
                      t('userEdit.addForm.fiscalCode.label'),
                      '',
                      'uppercase'
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3} mb={3}>
                <Grid item xs={6} mb={3} sx={{ height: '75px' }}>
                  <CustomTextField
                    {...baseTextFieldProps('name', t('userEdit.addForm.name.label'), '')}
                    disabled={formik.values.certifiedName || !validTaxcode}
                  />
                </Grid>
                <Grid item xs={6} mb={3} sx={{ height: '75px' }}>
                  <CustomTextField
                    {...baseTextFieldProps('surname', t('userEdit.addForm.surname.label'), '')}
                    disabled={formik.values.certifiedSurname || !validTaxcode}
                  />
                </Grid>
              </Grid>
              <Grid item spacing={3}>
                <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
                  <CustomTextField
                    {...baseTextFieldProps(
                      'email',
                      t('userEdit.addForm.institutionalEmail.label'),
                      '',
                      'lowercase'
                    )}
                    disabled={!validTaxcode}
                  />
                </Grid>
              </Grid>
              <Grid item spacing={3}>
                <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
                  <CustomTextField
                    {...baseTextFieldProps(
                      'confirmEmail',
                      t('userEdit.addForm.confirmInstitutionalEmail.label'),
                      '',
                      'lowercase'
                    )}
                    disabled={!validTaxcode}
                  />
                </Grid>
              </Grid>
            </>
          ) : undefined}
          {!selectedProduct ? (
            <Grid item xs={12} mb={3}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel
                  id="select-label-products"
                  sx={{
                    '.MuiInputLabel-root.Mui-focused': {
                      color: 'text.primary',
                      fontWeight: 'fontWeightMedium',
                      fontSize: 'fontSize',
                      whiteSpace: 'nowrap',
                    },
                  }}
                >
                  {t('userEdit.addForm.product.title')}
                </InputLabel>
                <Select
                  fullWidth
                  aria-label="user"
                  name="products"
                  value={userProduct?.title ?? ''}
                  labelId="select-label-products"
                  disabled={!validTaxcode}
                  variant="outlined"
                  renderValue={(userProduct) => (
                    <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                      {userProduct}
                    </Typography>
                  )}
                  input={<OutlinedInput label={t('userEdit.addForm.product.title')} />}
                >
                  {products
                    .filter((p) => p.userRole === 'ADMIN')
                    .map((p) => (
                      <MenuItem
                        key={p.id}
                        value={p.id}
                        sx={{
                          fontSize: 'fontSize',
                          fontWeight: 'fontWeightMedium',
                          color: 'text.primary',
                        }}
                        onClick={validTaxcode ? () => setUserProduct(p) : undefined}
                      >
                        {p.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          ) : undefined}

          {productRoles && (
            <Grid item container xs={12} mb={3} sx={{ flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontWeight: 'fontWeightMedium',
                  fontSize: 'fontSize',
                  color: 'colorTextPrimary',
                }}
                pb={3}
              >
                {t('userEdit.addForm.role.title')}
              </Typography>

              {Object.values(productRoles.groupBySelcRole).map((roles, selcRoleIndex) =>
                roles
                  .filter((r) => r.partyRole === 'OPERATOR' || r.partyRole === 'SUB_DELEGATE')
                  .map((p, index) => (
                    <Box key={p.productRole}>
                      <CustomFormControlLabel
                        sx={{ marginTop: 0 }}
                        checked={formik.values.productRoles.indexOf(p.productRole) > -1}
                        disabled={!validTaxcode}
                        value={p.productRole}
                        control={roles.length > 1 && p.multiroleAllowed ? <Checkbox /> : <Radio />}
                        label={
                          <>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 'fontWeightRegular', fontSize: '18px' }}
                            >
                              {p.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 'fontWeightRegular',
                                fontSize: 'fontSize',
                                color: '#5C6F82',
                              }}
                            >
                              {p.description}
                            </Typography>
                          </>
                        }
                        onClick={validTaxcode ? () => addRole(p) : undefined}
                      />

                      {(index !== roles.length - 1 ||
                        selcRoleIndex !== Object.keys(productRoles.groupBySelcRole).length - 1) && (
                        <Divider sx={{ borderColor: '#CFDCE6', my: '8px' }} />
                      )}
                    </Box>
                  ))
              )}
            </Grid>
          )}
        </Grid>

        <Grid item container justifyContent="space-between" mt={5}>
          <Grid item xs={3} display="flex" justifyContent="flex-start">
            <Button color="primary" variant="outlined" onClick={() => onExit(goBackInner)}>
              {t('userEdit.addForm.backButton')}
            </Button>
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="flex-end">
            <Button
              disabled={!formik.dirty || !formik.isValid}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t('userEdit.addForm.continueButton')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
