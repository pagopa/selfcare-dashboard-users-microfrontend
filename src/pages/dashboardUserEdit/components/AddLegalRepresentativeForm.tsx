import { Button, Grid, Stack } from '@mui/material';

import { ButtonNaked, IllusCompleted, IllusError } from '@pagopa/mui-italia';
import {
  EndingPage,
  TitleBox,
  useErrorDispatcher,
  useLoading,
} from '@pagopa/selfcare-common-frontend/lib';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { useFormik } from 'formik';
import { uniqueId } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ProductUserResource } from '../../../api/generated/b4f-dashboard/ProductUserResource';
import { InstitutionTypeEnum } from '../../../api/generated/onboarding/OnboardingUserDto';
import { RoleEnum, UserDto } from '../../../api/generated/onboarding/UserDto';
import { Party } from '../../../model/Party';
import { AsyncOnboardingUserData, TextTransform } from '../../../model/PartyUser';
import { RequestOutcomeMessage, RequestOutcomeOptions } from '../../../model/UserRegistry';
import {
  checkManagerService,
  onboardingAggregatorService,
  onboardingPostUser,
  validateLegalRepresentative,
} from '../../../services/onboardingService';
import { getLegalRepresentativeService } from '../../../services/usersService';
import {
  LOADING_TASK_CHECK_MANAGER,
  LOADING_TASK_GET_LEGAL_REPRESENTATIVE,
} from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import { CustomTextField, getProductLink, requiredError, taxCodeRegexp } from '../helpers';
import { ConfirmChangeLRModal } from './ConfirmChangeLRModal';

type LegalRepresentativeProps = {
  party: Party;
  productId: string;
  productName: string;
  backPreviousStep: () => void;
  asyncUserData: Array<AsyncOnboardingUserData>;
  setOutcome: Dispatch<SetStateAction<RequestOutcomeMessage | null | undefined>>;
  isAddInBulkEAFlow: boolean;
};

export default function AddLegalRepresentativeForm({
  party,
  productName,
  productId,
  backPreviousStep,
  asyncUserData,
  setOutcome,
  isAddInBulkEAFlow,
}: Readonly<LegalRepresentativeProps>) {
  const [isChangedManager, setIsChangedManager] = useState(false);
  const [dynamicDocLink, setDynamicDocLink] = useState<string>('');
  const requestId = uniqueId();
  const { t } = useTranslation();
  const setLoadingCheckManager = useLoading(LOADING_TASK_CHECK_MANAGER);
  const setLoadingGetLegalRepresentative = useLoading(LOADING_TASK_GET_LEGAL_REPRESENTATIVE);
  const addError = useErrorDispatcher();

  useEffect(() => {
    setLoadingGetLegalRepresentative(true);
    getLegalRepresentativeService(party, productId, RoleEnum.MANAGER)
      .then(async (r) => {
        const newestManager = r.reduce(
          (newest: ProductUserResource, current: ProductUserResource) => {
            if (!newest) {
              return current;
            }
            if (!newest.createdAt || !current.createdAt) {
              return newest;
            }
            return new Date(current.createdAt).getTime() > new Date(newest.createdAt).getTime()
              ? current
              : newest;
          }
        );

        await formik.setValues({
          name: newestManager.name ?? '',
          surname: newestManager.surname ?? '',
          taxCode: newestManager.fiscalCode ?? '',
          email: newestManager.email ?? '',
          role: RoleEnum.MANAGER,
        });
      })
      .catch((error) => {
        addError({
          id: `GET_LEGAL_REPRESENTATIVE_ERROR`,
          blocking: false,
          error,
          techDescription: `Something gone wrong while calling check-manager`,
          toNotify: true,
        });
      })
      .finally(() => setLoadingGetLegalRepresentative(false));
  }, [productId, party]);

  const baseTextFieldProps = (
    field: keyof AsyncOnboardingUserData,
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

  const validate = (values: Partial<AsyncOnboardingUserData>) =>
    Object.fromEntries(
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
      }).filter(([_key, value]) => value)
    );

  const initialFormData = {
    taxCode: '',
    name: '',
    surname: '',
    email: '',
    role: RoleEnum.MANAGER,
  };

  const formik = useFormik<AsyncOnboardingUserData>({
    initialValues: initialFormData,
    validate,
    onSubmit: (user) => {
      setLoadingCheckManager(true);
      checkManagerService({
        institutionType: party.institutionType as any,
        origin: party?.origin,
        originId: party?.originId,
        productId,
        subunitCode: party?.subunitCode,
        taxCode: party.vatNumber,
        users: [{ ...user, role: RoleEnum.MANAGER as RoleEnum }],
      })
        .then((data) => {
          if (data) {
            setIsChangedManager(!data.result);
            if (!data.result) {
              trackEvent('CHANGE_LEGAL_REPRESENTATIVE', {
                request_id: requestId,
                party_id: party.partyId,
                product_id: productId,
                from: 'dashboard',
              });
            }
            if (data.result) {
              validateUser(user);
            }
          }
        })
        .catch((error) => {
          validateUser(user);
          addError({
            id: `VALIDATE_USER_ERROR`,
            blocking: false,
            error,
            techDescription: `Something gone wrong whilev calling check-manager`,
            toNotify: true,
          });
        })
        .finally(() => setLoadingCheckManager(false));
    },
  });

  const renderErrorMessage = (name?: string) => {
    if (name) {
      switch (name) {
        case 'name':
          return t('userEdit.mismatchWithTaxCode.name');
        case 'surname':
          return t('userEdit.mismatchWithTaxCode.surname');
        case 'taxCode':
          return t('userEdit.addForm.errors.invalidFiscalCode');
        case 'email':
          return t('userEdit.addForm.errors.invalidEmail');
      }
    }
    return '';
  };

  const validateUser = (user: AsyncOnboardingUserData) => {
    validateLegalRepresentative({
      name: user.name,
      surname: user.surname,
      taxCode: user.taxCode,
    })
      .then(() => sendOnboardingData([...asyncUserData, { ...user, role: RoleEnum.MANAGER }]))
      .catch((error) => {
        if (error && error.httpStatus === 409) {
          const invalidParams = error.httpBody?.invalidParams;

          if (invalidParams) {
            invalidParams.forEach((param: { name: string; reason: string }) => {
              formik.setFieldError(param.name, renderErrorMessage(param.name));
            });
          }
        } else {
          addError({
            id: `VALIDATE_USER_ERROR`,
            blocking: false,
            error,
            techDescription: `Something gone wrong while validating Manager`,
            toNotify: true,
          });
        }
      });
  };

  const sendOnboardingData = (asyncUserData: Array<AsyncOnboardingUserData>) => {
    const submitRequestData = {
      productId,
      institutionType: party?.institutionType as InstitutionTypeEnum,
      origin: party?.origin,
      originId: party?.originId,
      subunitCode: party?.subunitCode,
      taxCode: party?.fiscalCode,
      users: asyncUserData as Array<UserDto>,
    };

    const submitApiToCall = isAddInBulkEAFlow
      ? onboardingAggregatorService(submitRequestData)
      : onboardingPostUser(submitRequestData);

    submitApiToCall
      .then(() => {
        setOutcome(outcomeContent.success);
        if (!isAddInBulkEAFlow) {
          trackEvent('ONBOARDING_USER_SUCCESS', {
            request_id: requestId,
            party_id: party.partyId,
            product_id: productId,
            from: 'dashboard',
          });
        }
      })
      .catch((_err) => {
        setOutcome(outcomeContent.error);
      });
  };

  const goToUsersPage = () => {
    window.location.assign(resolvePathVariables(ENV.ROUTES.USERS, { partyId: party.partyId }));
  };

  const outcomeContent: RequestOutcomeOptions = {
    success: {
      title: '',
      description: [
        <>
          <EndingPage
            minHeight="52vh"
            icon={<IllusCompleted size={60} />}
            title={t('userEdit.addForm.addLegalRepresentative.requestOkTitle')}
            description={
              <Trans
                i18nKey="userEdit.addForm.addLegalRepresentative.requestOkMessage"
                components={{ 1: <br />, 3: <br /> }}
              >
                {`Invieremo un’email all’indirizzo PEC primario dell’ente. <1 /> Al suo interno, ci sono le istruzioni per completare <3 />l’operazione.`}
              </Trans>
            }
            variantTitle={'h4'}
            variantDescription={'body1'}
            buttonLabel={t('userEdit.addForm.addLegalRepresentative.backHome')}
            onButtonClick={goToUsersPage}
          />
        </>,
      ],
    },
    error: {
      title: '',
      description: [
        <>
          <EndingPage
            minHeight="52vh"
            icon={<IllusError size={60} />}
            variantTitle={'h4'}
            variantDescription={'body1'}
            title={t('userEdit.addForm.addLegalRepresentative.requestErrorTitle')}
            description={
              <Trans
                i18nKey="userEdit.addForm.addLegalRepresentative.requestErrorMessage"
                components={{ 1: <br /> }}
              >
                {`A causa di un errore del sistema non è possibile completare <1 />la procedura. Ti chiediamo di riprovare più tardi.`}
              </Trans>
            }
            buttonLabel={t('userEdit.addForm.addLegalRepresentative.backHome')}
            onButtonClick={goToUsersPage}
          />
        </>,
      ],
    },
  };

  useEffect(() => {
    setDynamicDocLink(getProductLink(productId ?? '', party.institutionType));
  }, [productId]);

  return (
    <Grid>
      <ConfirmChangeLRModal
        open={isChangedManager}
        onConfirm={() => {
          setIsChangedManager(false);
          validateUser(formik.values);
        }}
        onClose={() => setIsChangedManager(false)}
        managerFullName={`${formik.values.name} ${formik.values.surname}`}
      />
      <Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            sx={{
              backgroundColor: 'background.paper',
              padding: 3,
              borderRadius: '4px',
              marginBottom: 5,
            }}
          >
            <Grid item mb={3}>
              <Grid item xs={12}>
                <TitleBox
                  variantTitle="h6"
                  variantSubTitle="body2"
                  title={t('userEdit.addForm.addLegalRepresentative.title')}
                  subTitle={
                    <Trans
                      i18nKey="userEdit.addForm.addLegalRepresentative.subTitle"
                      values={{ productName }}
                      components={{ strong: <strong /> }}
                    />
                  }
                  mbTitle={2}
                  mbSubTitle={1}
                />
              </Grid>
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
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <CustomTextField
                    size="small"
                    fullWidth
                    {...baseTextFieldProps(
                      'name',
                      t('userEdit.addForm.addLegalRepresentative.name'),
                      ''
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    size="small"
                    fullWidth
                    {...baseTextFieldProps(
                      'surname',
                      t('userEdit.addForm.addLegalRepresentative.surname'),
                      ''
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    size="small"
                    fullWidth
                    {...baseTextFieldProps(
                      'taxCode',
                      t('userEdit.addForm.addLegalRepresentative.taxCode'),
                      ''
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    size="small"
                    fullWidth
                    {...baseTextFieldProps(
                      'email',
                      t('userEdit.addForm.addLegalRepresentative.institutionalEmail'),
                      ''
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Button
              color="primary"
              variant="outlined"
              size="medium"
              onClick={() => backPreviousStep()}
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
              {t('userEdit.addForm.addLegalRepresentative.sendRequest')}
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}
