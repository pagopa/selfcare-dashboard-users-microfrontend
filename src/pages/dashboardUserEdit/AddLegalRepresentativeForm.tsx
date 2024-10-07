import { Button, Grid, Stack } from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ButtonNaked, IllusCompleted, IllusError } from '@pagopa/mui-italia';
import {
  EndingPage,
  TitleBox,
  useErrorDispatcher,
  useLoading,
} from '@pagopa/selfcare-common-frontend/lib';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { InstitutionTypeEnum } from '../../api/generated/onboarding/OnboardingUserDto';
import { RoleEnum } from '../../api/generated/onboarding/User';
import { UserDto } from '../../api/generated/onboarding/UserDto';
import { Party } from '../../model/Party';
import { PartyUserLR, PartyUserOnCreation, TextTransform } from '../../model/PartyUser';
import { RequestOutcomeMessage, RequestOutcomeOptions } from '../../model/UserRegistry';
import {
  checkManagerService,
  onboardingPostUser,
  validateLegalRepresentative
} from '../../services/usersService';
import { LOADING_TASK_CHECK_MANAGER } from '../../utils/constants';
import { ENV } from '../../utils/env';
import { ConfimChangeLRModal } from './components/ConfimChangeLRModal';
import { CustomTextField, requiredError, taxCodeRegexp } from './helpers';

type LegalRepresentativeProps = {
  party: Party;
  productId: string;
  productName: string;
  backPreviousStep: () => void;
  addUserData: PartyUserOnCreation;
  setUserData: Dispatch<SetStateAction<PartyUserOnCreation>>;
  setOutcome: Dispatch<SetStateAction<RequestOutcomeMessage | null | undefined>>;
};

export default function AddLegalRepresentativeForm({
  party,
  productName,
  productId,
  backPreviousStep,
  addUserData,
  setOutcome,
}: LegalRepresentativeProps) {
  const [isChangedManager, setIsChangedManager] = useState(false);
  const setLoading = useLoading(LOADING_TASK_CHECK_MANAGER);
  const addError = useErrorDispatcher();
  const { t } = useTranslation();

  const baseTextFieldProps = (
    field: keyof PartyUserLR,
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

  const validate = (values: Partial<PartyUserLR>) =>
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
  };

  const formik = useFormik<PartyUserLR>({
    initialValues: initialFormData,
    validate,
    onSubmit: (user) => {
      setLoading(true);
      
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
            setIsChangedManager(data.right);
            validateUser(user);
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
        .finally(() => setLoading(false));
    },
  });

  const validateUser = (user: PartyUserLR) => {
    void validateLegalRepresentative(user)
      .then(() => {
        sendOnboardingData([addUserData, user]);
      })
      .catch((error) => {
        if (error && error.description && error.status === '409') {
          trackEvent(`ONBOARDING_ADD_MANAGER_CONFLICT_ERROR`, {
            party_id: party?.partyId,
            reason: error?.detail,
          });
        } else {
          trackEvent(`ONBOARDING_ADD_MANAGER_GENERIC_ERROR`, {
            party_id: party?.partyId,
            reason: error?.detail,
          });
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

  const sendOnboardingData = (users: Array<PartyUserLR | PartyUserOnCreation>) => {
    onboardingPostUser({
      productId,
      institutionType: party?.institutionType as InstitutionTypeEnum,
      origin: party?.origin,
      originId: party?.originId,
      subunitCode: party?.subunitCode,
      taxCode: party?.fiscalCode,
      users: users as Array<UserDto>,
    })
      .then(() => {
        setOutcome(outcomeContent.success);
      })
      .catch((_err) => {
        setOutcome(outcomeContent.error);
      });
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
            onButtonClick={() => window.location.assign(ENV.ROUTES.USERS)}
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
            onButtonClick={() => window.location.assign(ENV.ROUTES.USERS)}
          />
        </>,
      ],
    },
  };

  return (
    <Grid>
      <ConfimChangeLRModal
        open={isChangedManager}
        onConfirm={() => {
          sendOnboardingData([addUserData, formik.values]);
          setIsChangedManager(false);
        }}
        onClose={() => setIsChangedManager(false)}
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
                mbTitle={1}
                mbSubTitle={1}
              />
              <Grid item xs={12} mb={3}>
                <ButtonNaked
                  component="button"
                  color="primary"
                  startIcon={<MenuBookIcon />}
                  sx={{
                    fontWeight: '700',
                    fontSize: '14px',
                    textDecoration: 'underline',
                  }}
                  onClick={() => {
                    const docLink = 'https://docs.pagopa.it/area-riservata/area-riservata/ruoli';
                    window.open(docLink);
                  }}
                >
                  {t('userEdit.addForm.addLegalRepresentative.moreInformationOnRoles')}
                </ButtonNaked>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
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
