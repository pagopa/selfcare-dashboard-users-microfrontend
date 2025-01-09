import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { ButtonNaked, theme } from '@pagopa/mui-italia';
import { TitleBox, usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import {
  useUnloadEventInterceptor,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import useUserNotify from '@pagopa/selfcare-common-frontend/lib/hooks/useUserNotify';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { Actions, emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { RoleEnum } from '../../../api/generated/onboarding/UserDto';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Party } from '../../../model/Party';
import {
  AsyncOnboardingUserData,
  PartyUserOnCreation,
  TextTransform,
} from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import { ProductRole, ProductRolesLists, ProductsRolesMap } from '../../../model/ProductRole';
import { UserRegistry } from '../../../model/UserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import {
  addUserProductRoles,
  fetchUserRegistryByFiscalCode,
  savePartyUser,
} from '../../../services/usersService';
import {
  LOADING_TASK_FETCH_TAX_CODE,
  LOADING_TASK_SAVE_PARTY_USER,
} from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import {
  commonStyles,
  CustomTextField,
  getProductLink,
  requiredError,
  taxCodeRegexp,
} from '../helpers';
import { renderLabel } from './helpers';

const CustomFormControlLabel = styled(FormControlLabel)({
  disabled: false,
  '.MuiRadio-root': {
    color: '#0073E6',
  },
});

type Props = {
  party: Party;
  userId?: string;
  selectedProduct?: Product;
  products: Array<Product>;
  productsRolesMap: ProductsRolesMap;
  canEditRegistryData: boolean;
  initialFormData: PartyUserOnCreation;
  goBack?: () => void;
  forwardNextStep: () => void;
  handlePreviousStep?: () => void;
  setCurrentSelectedProduct: Dispatch<SetStateAction<Product | undefined>>;
  setAsyncUserData: Dispatch<SetStateAction<Array<AsyncOnboardingUserData>>>;
  isAddInBulkEAFlow: boolean;
  setIsAddInBulkEAFlow: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function AddUserForm({
  party,
  userId,
  selectedProduct,
  products,
  productsRolesMap,
  canEditRegistryData,
  initialFormData,
  goBack,
  forwardNextStep,
  setCurrentSelectedProduct,
  setAsyncUserData,
  isAddInBulkEAFlow,
  setIsAddInBulkEAFlow,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const setLoadingSaveUser = useLoading(LOADING_TASK_SAVE_PARTY_USER);
  const setLoadingFetchTaxCode = useLoading(LOADING_TASK_FETCH_TAX_CODE);

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const isMobile = useIsMobile('lg');

  const history = useHistory();

  const [validTaxcode, setValidTaxcode] = useState<string>();
  const [userProduct, setUserProduct] = useState<Product>();
  const [productRoles, setProductRoles] = useState<ProductRolesLists>();
  const [productInPage, setProductInPage] = useState<boolean>();
  const [isAsyncFlow, setIsAsyncFlow] = useState<boolean>(false);
  const [dynamicDocLink, setDynamicDocLink] = useState<string>('');

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const { hasPermission } = usePermissions();
  const onExit = useUnloadEventOnExit();
  const adminMaxLimit = parseInt(sessionStorage.getItem('adminMaxLimit') || '3', 10);

  const isPnpgTheOnlyProduct =
    !!products.find((p) => p.id === 'prod-pn-pg') && products.length === 1;
  const pnpgProduct = products.find((p) => p.id === 'prod-pn-pg');

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

  useEffect(() => {
    if (isPnpgTheOnlyProduct && initialFormData.taxCode === '') {
      setUserProduct(pnpgProduct);
    }
  }, []);

  useEffect(() => {
    if (userProduct) {
      setCurrentSelectedProduct(userProduct);
      setDynamicDocLink(getProductLink(userProduct?.id ?? '', party.institutionType));
    }
  }, [userProduct]);

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

  useEffect(() => {
    const isEnabled = products.filter((p) =>
      party.products.some(
        (pp) =>
          p.id === pp.productId &&
          hasPermission(pp.productId || '', Actions.ManageProductUsers) &&
          pp.productOnBoardingStatus === 'ACTIVE'
      )
    );

    setProductInPage(Object.keys(isEnabled).length === 1);
    if (productInPage) {
      setUserProduct(isEnabled[0]);
    }
  }, [productInPage]);

  const errorNotify = (errors: any, taxCode: string) =>
    addError({
      id: 'FETCH_TAX_CODE',
      blocking: false,
      error: errors,
      techDescription: `An error occurred while fetching Fiscal Code of Product ${taxCode}`,
      toNotify: true,
    });

  const buildFormValues = (userRegistry: UserRegistry | null) => {
    void formik.setValues({
      ...formik.values,
      name:
        userRegistry?.name ??
        (formik.values.certifiedName ? initialFormData.name : formik.values.name),
      surname:
        userRegistry?.surname ??
        (formik.values.certifiedSurname ? initialFormData.surname : formik.values.surname),
      email:
        userRegistry?.email ??
        (formik.values.certifiedName || formik.values.certifiedSurname
          ? initialFormData.email
          : formik.values.email),
      confirmEmail: '',
      certifiedName:
        userRegistry?.certifiedName ??
        (formik.values.certifiedName ? initialFormData.certifiedName : formik.values.certifiedName),
      certifiedSurname:
        userRegistry?.certifiedSurname ??
        (formik.values.certifiedSurname
          ? initialFormData.certifiedSurname
          : formik.values.certifiedSurname),
    });
  };

  const fetchTaxCode = (taxCode: string, partyId: string) => {
    setLoadingFetchTaxCode(true);
    fetchUserRegistryByFiscalCode(taxCode.toUpperCase(), partyId)
      .then((userRegistry) => {
        buildFormValues(userRegistry);
      })
      .catch((errors) => errorNotify(errors, taxCode))
      .finally(() => setLoadingFetchTaxCode(false));
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const validate = (values: Partial<PartyUserOnCreation>) => {
    const errors = Object.fromEntries(
      Object.entries({
        name: !values.name
          ? requiredError
          : verifyNameMatchWithTaxCode(values.name, values.taxCode)
          ? t('userEdit.mismatchWithTaxCode.name')
          : undefined,
        surname: !values.surname
          ? requiredError
          : verifySurnameMatchWithTaxCode(values.surname, values.taxCode)
          ? t('userEdit.mismatchWithTaxCode.surname')
          : undefined,
        taxCode: !values.taxCode
          ? requiredError
          : !taxCodeRegexp.test(values.taxCode) || verifyChecksumMatchWithTaxCode(values.taxCode)
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

    const partyRole = productRoles?.groupByProductRole[formik.values.productRoles[0]].partyRole;

    (userId
      ? addUserProductRoles(party, userProduct as Product, userId, values2submit, partyRole)
      : savePartyUser(party, userProduct as Product, values2submit, partyRole)
    )
      .then((userId) => {
        unregisterUnloadEvent();
        trackEvent(initialFormData.taxCode ? 'USER_ADD_ROLE' : 'USER_ADD', {
          party_id: party.partyId,
          product_id: userProduct?.id,
          product_role: values2submit.productRoles,
        });
        addNotify({
          component: 'Toast',
          id: 'SAVE_PARTY_USER',
          title: initialFormData.taxCode
            ? t('userDetail.actions.successfulAddRole')
            : t('userEdit.addForm.saveUserSuccess'),
          message: '',
        });

        history.push(
          resolvePathVariables(
            selectedProduct && !isPnpgTheOnlyProduct
              ? DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.PARTY_PRODUCT_USER_DETAIL.path
              : DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
            {
              partyId: party.partyId,
              productId: selectedProduct?.id ?? '',
              userId: userId ?? '',
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

  const addOneRoleModal = (values: PartyUserOnCreation) => {
    addNotify({
      component: 'SessionModal',
      id: 'ONE_ROLE_USER',
      title: t('userEdit.addForm.addOneRoleModal.title'),
      message: (
        <Trans
          i18nKey="userEdit.addForm.addOneRoleModal.message"
          values={{
            user: `${values.name} ${values.surname} `,
            role: `${values.productRoles.map((r) => productRoles?.groupByProductRole[r].title)}`,
            productTitle: `${userProduct?.title}`,
          }}
          components={{
            1: <strong />,
            3: <strong />,
            5: <strong />,
          }}
        >
          {`Vuoi assegnare a <1>{{user}}</1> il ruolo di <3>{{role}}</3> per <5>{{productTitle}}</5>?<7><8></8><9></9></7>`}
        </Trans>
      ),
      onConfirm: () =>
        save({
          ...values,
          taxCode: values.taxCode.toUpperCase(),
          email: values.email.toLowerCase(),
        }),
      confirmLabel: t('userEdit.addForm.addOneRoleModal.confirmButton'),
      closeLabel: t('userEdit.addForm.addOneRoleModal.closeButton'),
    });
  };

  const addMultiRoleModal = (values: PartyUserOnCreation) => {
    addNotify({
      component: 'SessionModal',
      id: 'MULTI_ROLE_USER',
      title: t('userEdit.addForm.addMultiRoleModal.title'),
      message: (
        <Trans
          i18nKey="userEdit.addForm.addMultiRoleModal.message"
          values={{
            user: `${values.name} ${values.surname} `,
            roles: `${values.productRoles
              .map((r) => productRoles?.groupByProductRole[r].title)
              .join(', ')}`,
            productTitle: `${userProduct?.title}.`,
          }}
          components={{ 1: <strong />, 3: <strong />, 5: <strong /> }}
        >
          {`Stai per assegnare a <1>{{user}}</1> i ruoli <3>{{roles}}</3> sul prodotto <5>{{productTitle}}</5><6><7></7><8></8></6>Confermi di voler continuare?<9></9>`}
        </Trans>
      ),
      // eslint-disable-next-line sonarjs/no-identical-functions
      onConfirm: () =>
        save({
          ...values,
          taxCode: values.taxCode.toUpperCase(),
          email: values.email.toLowerCase(),
        }),
      confirmLabel: t('userEdit.addForm.addMultiRoleModal.confirmButton'),
      closeLabel: t('userEdit.addForm.addMultiRoleModal.closeButton'),
    });
  };

  const formik = useFormik<PartyUserOnCreation>({
    initialValues: initialFormData,
    validate,
    onSubmit: (values) => {
      if (isAddInBulkEAFlow) {
        setAsyncUserData([
          {
            name: values.name,
            surname: values.surname,
            taxCode: values.taxCode.toUpperCase(),
            email: values.email.toLowerCase(),
            role: RoleEnum.DELEGATE,
          },
        ]);
        addNotify({
          component: 'SessionModal',
          id: 'ADD_IN_BULK_EA_USER',
          title: t('userEdit.addForm.addUserInBulkModal.title'),
          message: (
            <Trans
              i18nKey="userEdit.addForm.addUserInBulkModal.message"
              values={{
                user: `${values.name} ${values.surname} `,
                role: `${values.productRoles.map(
                  (r) => productRoles?.groupByProductRole[r].title
                )}`,
              }}
              components={{ 1: <strong />, 3: <strong />, 4: <strong />, 8: <strong /> }}
            >
              {`<1>{{user}}</1> verrà aggiunto come utente su <3>tutti gli enti aggregati </3> con il ruolo di <4>{{role}}</4>. Potrà gestire e operare su tutti gli enti.`}
            </Trans>
          ),
          confirmLabel: t('userEdit.addForm.addUserInBulkModal.confirmButton'),
          closeLabel: t('userEdit.addForm.addUserInBulkModal.closeButton'),
          onConfirm: forwardNextStep,
        });
        return;
      }

      if (isAsyncFlow) {
        setAsyncUserData([
          {
            name: values.name,
            surname: values.surname,
            taxCode: values.taxCode.toUpperCase(),
            email: values.email.toLowerCase(),
            role: RoleEnum.DELEGATE,
          },
        ]);
        forwardNextStep();
        return;
      }

      if (values.productRoles.length >= 2) {
        addMultiRoleModal(values);
      } else {
        addOneRoleModal(values);
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

  const selectLabel = t('userEdit.addForm.product.selectLabel');

  const isAddRoleFromDashboard = (phasesAdditionAllowed?: Array<string>) =>
    !!phasesAdditionAllowed && phasesAdditionAllowed[0].startsWith('dashboard');

  const isAddRoleFromDashboardAsync = (phasesAdditionAllowed?: Array<string>) =>
    !!phasesAdditionAllowed && phasesAdditionAllowed[0] === 'dashboard-async';

  const isAddAdminDisabledForPSP = (productRole: string) =>
    party.institutionType === 'PSP' &&
    userProduct?.id === 'prod-pagopa' &&
    adminMaxLimit >= ENV.MAX_ADMIN_COUNT &&
    productRole.toLowerCase().startsWith('admin');

  return (
    <form onSubmit={formik.handleSubmit}>
      {canEditRegistryData ? (
        <Grid container direction="column" sx={commonStyles}>
          <Grid item xs={12}>
            <TitleBox
              variantTitle="h6"
              variantSubTitle="body1"
              title={t('userEdit.addForm.userData.label')}
              subTitle={t('userEdit.addForm.userData.subTitle')}
              mbTitle={2}
              mbSubTitle={3}
            />
          </Grid>
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
              size="small"
              {...baseTextFieldProps(
                'taxCode',
                t('userEdit.addForm.fiscalCode.label'),
                '',
                'uppercase'
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              [theme.breakpoints.down('lg')]: {
                flexDirection: 'column',
                width: '100%',
              },
            }}
          >
            <CustomTextField
              size="small"
              style={{ width: isMobile ? '100%' : '49%' }}
              {...baseTextFieldProps('name', t('userEdit.addForm.name.label'), '')}
              disabled={formik.values.certifiedName || !validTaxcode}
            />
            <CustomTextField
              size="small"
              style={{ width: isMobile ? '100%' : '49%', marginTop: isMobile ? '24px' : 0 }}
              {...baseTextFieldProps('surname', t('userEdit.addForm.surname.label'), '')}
              disabled={formik.values.certifiedSurname || !validTaxcode}
            />
          </Grid>
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
              size="small"
              {...baseTextFieldProps(
                'email',
                t('userEdit.addForm.institutionalEmail.label'),
                '',
                'lowercase'
              )}
              disabled={!validTaxcode}
            />
          </Grid>
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
              size="small"
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
      ) : undefined}

      {!selectedProduct && !isPnpgTheOnlyProduct ? (
        <Grid container direction="column" sx={commonStyles}>
          <Grid item xs={12}>
            <TitleBox
              variantTitle="h6"
              variantSubTitle="body2"
              title={t('userEdit.addForm.product.title')}
              subTitle={t('userEdit.addForm.product.subTitle')}
              mbTitle={2}
              mbSubTitle={3}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel
                id="select-label-products"
                size="small"
                sx={{
                  color: !validTaxcode ? 'text.disabled' : '',
                  '& .MuiInputLabel-root.Mui-focused': {
                    fontWeight: 'fontWeightMedium',
                    fontSize: 'fontSize',
                    whiteSpace: 'nowrap',
                  },
                }}
              >
                {selectLabel}
              </InputLabel>
              <Select
                fullWidth
                size="small"
                aria-label="user"
                name="products"
                value={userProduct?.title ?? ''}
                labelId="select-label-products"
                disabled={!validTaxcode || productInPage}
                variant="outlined"
                renderValue={(userProduct) => (
                  <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                    {userProduct}
                  </Typography>
                )}
                input={<OutlinedInput label={selectLabel} />}
              >
                {products
                  .filter((p) =>
                    party.products.some(
                      (pp) =>
                        p.id === pp.productId &&
                        hasPermission(pp.productId, Actions.ManageProductUsers)
                    )
                  )
                  .map((p) => (
                    <MenuItem
                      key={p.id}
                      value={p.id}
                      data-testid={`product: ${p.id}`}
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
        </Grid>
      ) : undefined}

      {productRoles && (
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
                <>
                  <Box
                    key={p.productRole}
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
                      disabled={!validTaxcode || isAddAdminDisabledForPSP(p.selcRole)}
                      value={p.productRole}
                      control={roles.length > 1 && p.multiroleAllowed ? <Checkbox /> : <Radio />}
                      label={renderLabel(p, !!validTaxcode, isAddAdminDisabledForPSP(p.selcRole))}
                      onClick={
                        !validTaxcode || isAddAdminDisabledForPSP(p.selcRole)
                          ? undefined
                          : () => {
                              addRole(p);
                              setIsAddInBulkEAFlow(
                                p?.phasesAdditionAllowed.includes('dashboard-aggregator') &&
                                  party.products.some(
                                    (prod) =>
                                      prod.productId === userProduct?.id && prod.isAggregator
                                  )
                              );
                              setIsAsyncFlow(p?.phasesAdditionAllowed.includes('dashboard-async'));
                            }
                      }
                    />
                    {isAddRoleFromDashboardAsync(p?.phasesAdditionAllowed) && (
                      <Tooltip
                        title={t('userEdit.addForm.role.adminTooltip')}
                        placement="top"
                        arrow
                      >
                        <InfoOutlinedIcon sx={{ cursor: 'pointer' }} color="primary" />
                      </Tooltip>
                    )}
                  </Box>
                  {filteredRoles.length !== index && (
                    <Grid item xs={12}>
                      <Divider sx={{ borderColor: 'background.default' }} />
                    </Grid>
                  )}
                </>
              ))
          )}
        </Grid>
      )}

      <Stack direction="row" display="flex" justifyContent="space-between">
        <Button
          color="primary"
          variant="outlined"
          size="medium"
          onClick={() => onExit(goBackInner)}
        >
          {t('userEdit.addForm.backButton')}
        </Button>
        <Button
          disabled={!formik.dirty || !formik.isValid}
          color="primary"
          variant="contained"
          type="submit"
          size="medium"
        >
          {t('userEdit.addForm.continueButton')}
        </Button>
      </Stack>
    </form>
  );
}
