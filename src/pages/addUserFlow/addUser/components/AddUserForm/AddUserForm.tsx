import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/lib/hooks/useLoading';
import {
  useUnloadEventInterceptor,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import useUserNotify from '@pagopa/selfcare-common-frontend/lib/hooks/useUserNotify';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIsMobile } from '../../../../../hooks/useIsMobile';
import { Party } from '../../../../../model/Party';
import { AddedUsersList, PartyUserOnCreation, TextTransform } from '../../../../../model/PartyUser';
import { Product } from '../../../../../model/Product';
import { ProductRolesLists, ProductsRolesMap } from '../../../../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../../../../routes';
import { fetchUserRegistryByFiscalCode } from '../../../../../services/usersService';
import {
  LOADING_TASK_FETCH_TAX_CODE,
  LOADING_TASK_SAVE_PARTY_USER,
  PRODUCT_IDS,
} from '../../../../../utils/constants';
import {
  commonStyles,
  getProductLink,
  RadioOptionLabel,
  renderLabel,
} from '../../../utils/helpers';
import { requiredError } from '../../../utils/validation';
import { useCheckOnboardedUser } from '../../hooks/useCheckOnboardedUser';
import { useSaveUser } from '../../hooks/useSaveUser';
import { ProductRolesSection } from './components/ProductRolesSection';
import { ProductSelectionSection } from './components/ProductSelectionSection';
import { UserDataSection } from './components/UserDataSection';
import { useAddUserFormComputedValues, useFormValidation } from './hooks/useAddUserFormLogic';
import { buildFormValues, EA_RADIO_OPTIONS } from './utils/addUserFormUtils';

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
  setAddedUserList: Dispatch<SetStateAction<Array<AddedUsersList>>>;
  isAddInBulkEAFlow: boolean;
  setIsAddInBulkEAFlow: Dispatch<SetStateAction<boolean>>;
};

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
  setAddedUserList,
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

  // const [validTaxcode, setValidTaxcode] = useState<string>();
  const [userProduct, setUserProduct] = useState<Product>();
  const [productRoles, setProductRoles] = useState<ProductRolesLists>();
  const [productInPage, setProductInPage] = useState<boolean>();
  const [isAsyncFlow, setIsAsyncFlow] = useState<boolean>(false);
  const [dynamicDocLink, setDynamicDocLink] = useState<string>('');

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const { hasPermission } = usePermissions();
  const onExit = useUnloadEventOnExit();
  const { isPnpgTheOnlyProduct, pnpgProduct, activeOnboardings, isAdminEaOnProdIO } =
    useAddUserFormComputedValues(party, products, userProduct);
  const { validate, validTaxcode, setValidTaxcode } = useFormValidation(t, isAdminEaOnProdIO);

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

      const matchingProduct = activeOnboardings.find((p) => p.productId === userProduct.id);

      const institutionType = matchingProduct?.institutionType ?? party.institutionType;

      setDynamicDocLink(getProductLink(userProduct.id, institutionType));
    }
  }, [userProduct, activeOnboardings, party.institutionType]);

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
          hasPermission(pp.productId || '', Actions.CreateProductUsers) &&
          pp.productOnBoardingStatus === 'ACTIVE'
      )
    );

    setProductInPage(Object.keys(isEnabled).length === 1);
    if (productInPage) {
      setUserProduct(isEnabled[0]);
    }
  }, [productInPage]);

  const saveUser = useSaveUser({
    party,
    userProduct,
    productRoles,
    t,
    addNotify,
    addError,
    history,
    setLoadingSaveUser,
    unregisterUnloadEvent,
    initialFormData,
    selectedProduct,
    isPnpgTheOnlyProduct,
  });

  const checkOnboardedUser = useCheckOnboardedUser({
    partyId: party.partyId,
    userProductId: userProduct?.id,
    t,
    addError,
    addNotify,
    forwardNextStep,
    setAddedUserList,
    isAddInBulkEAFlow,
    isAsyncFlow,
    productRoles,
  });

  const errorNotify = (errors: any, taxCode: string) =>
    addError({
      id: 'FETCH_TAX_CODE',
      blocking: false,
      error: errors,
      techDescription: `An error occurred while fetching Fiscal Code of Product ${taxCode}`,
      toNotify: true,
    });

  const fetchTaxCode = (taxCode: string, partyId: string) => {
    setLoadingFetchTaxCode(true);
    fetchUserRegistryByFiscalCode(taxCode.toUpperCase(), partyId)
      .then(async (userRegistry) => {
        await buildFormValues(userRegistry, formik.values, initialFormData, formik);
      })
      .catch((errors) => errorNotify(errors, taxCode))
      .finally(() => setLoadingFetchTaxCode(false));
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
        saveUser(
          {
            ...values,
            taxCode: values.taxCode.toUpperCase(),
            email: values.email.toLowerCase(),
          },
          userId
        ),
      confirmLabel: t('userEdit.addForm.addOneRoleModal.confirmButton'),
      closeLabel: t('userEdit.addForm.addOneRoleModal.closeButton'),
    });
  };

  const formik = useFormik<PartyUserOnCreation>({
    initialValues: initialFormData,
    validate,
    onSubmit: (values: PartyUserOnCreation) => {
      if (isAsyncFlow || isAddInBulkEAFlow) {
        checkOnboardedUser(values);
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
        saveUser(
          {
            ...values,
            taxCode: values.taxCode.toUpperCase(),
            email: values.email.toLowerCase(),
          },
          userId
        ),
      confirmLabel: t('userEdit.addForm.addMultiRoleModal.confirmButton'),
      closeLabel: t('userEdit.addForm.addMultiRoleModal.closeButton'),
    });
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

  return (
    <form onSubmit={formik.handleSubmit}>
      {canEditRegistryData && (
        <UserDataSection
          formik={formik}
          baseTextFieldProps={baseTextFieldProps}
          validTaxcode={validTaxcode}
          isMobile={isMobile}
          t={t}
        />
      )}

      {!selectedProduct && !isPnpgTheOnlyProduct && (
        <ProductSelectionSection
          products={products}
          party={party}
          hasPermission={hasPermission}
          userProduct={userProduct}
          setUserProduct={setUserProduct}
          selectLabel={selectLabel}
          validTaxcode={validTaxcode}
          productInPage={productInPage}
          t={t}
        />
      )}

      {productRoles && (
        <ProductRolesSection
          productRoles={productRoles}
          dynamicDocLink={dynamicDocLink}
          formik={formik}
          validTaxcode={validTaxcode}
          setIsAddInBulkEAFlow={setIsAddInBulkEAFlow}
          isAdminEaOnProdIO={isAdminEaOnProdIO}
          setIsAsyncFlow={setIsAsyncFlow}
          userProduct={userProduct}
          party={party}
          renderLabel={renderLabel}
          t={t}
        />
      )}
      {/* TODO enable after groups automation is in placeS */}
      {isAdminEaOnProdIO &&
        userProduct?.id === PRODUCT_IDS.IO &&
        formik.values.productRoles.length > 0 && (
          <Grid container direction="column" sx={commonStyles}>
            <Grid item xs={12}>
              <Typography variant="body2" mb={3} fontWeight={'600'}>
                {t('userEdit.addForm.addOnAggregatedEntities.title')}
              </Typography>
            </Grid>
            <Grid item xs={12} mb={1}>
              <RadioGroup value={false}>
                {EA_RADIO_OPTIONS.map(({ value, titleKey, descriptionKey }) => (
                  <FormControlLabel
                    key={value.toString()}
                    sx={{ marginBottom: 2 }}
                    value={value}
                    disabled
                    control={<Radio disabled />}
                    label={
                      <RadioOptionLabel
                        titleKey={titleKey}
                        descriptionKey={descriptionKey}
                        disabled={true}
                        t={t}
                      />
                    }
                    aria-label={t(titleKey)}
                    /*
                    onClick={async () => {
                      // TODO set isAddINBulkEAFlow only for role admin not operator
                      setIsAddInBulkEAFlow(value);
                      await formik.setFieldValue('toAddOnAggregates', value, true);
                    }}
                    */
                  />
                ))}
              </RadioGroup>
            </Grid>
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
