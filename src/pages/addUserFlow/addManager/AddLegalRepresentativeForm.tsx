import { Grid } from '@mui/material';

import { ButtonNaked } from '@pagopa/mui-italia';
import { TitleBox, useErrorDispatcher, useLoading } from '@pagopa/selfcare-common-frontend/lib';

import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useFormik } from 'formik';
import { uniqueId } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ProductOnBoardingStatusEnum } from '../../../api/generated/b4f-dashboard/OnboardedProductResource';
import { ProductUserResource } from '../../../api/generated/b4f-dashboard/ProductUserResource';
import { InstitutionTypeEnum } from '../../../api/generated/onboarding/OnboardingUserDto';
import { RoleEnum, UserDto } from '../../../api/generated/onboarding/UserDto';
import { Party } from '../../../model/Party';
import { AddedUsersList } from '../../../model/PartyUser';
import { RequestOutcomeMessage } from '../../../model/UserRegistry';
import {
  checkManagerService,
  onboardingAggregatorService,
  onboardingPostUser,
  searchUserService,
  validateLegalRepresentative,
} from '../../../services/onboardingService';
import { getLegalRepresentativeService } from '../../../services/usersService';
import {
  LOADING_TASK_CHECK_MANAGER,
  LOADING_TASK_GET_LEGAL_REPRESENTATIVE,
  LOADING_TASK_ONBOARDING_USER_WITH_LEGAL_REPRESENTATIVE,
  LOADING_TASK_SEARCH_USER_PDV,
} from '../../../utils/constants';
import { ENV } from '../../../utils/env';
import { findNewestManager, getOutcomeContent, renderErrorMessage } from '../utils/helpers';
import { validateManagerForm } from '../utils/validation';
import { ConfirmChangeLRModal } from './components/ConfirmChangeLRModal';
import { FormFields } from './components/FormFields';
import { FormActions } from './components/FromActions';

type LegalRepresentativeProps = {
  party: Party;
  productId: string;
  productName: string;
  backPreviousStep: () => void;
  addedUserList: Array<AddedUsersList>;
  setOutcome: Dispatch<SetStateAction<RequestOutcomeMessage | null | undefined>>;
  isAddInBulkEAFlow: boolean;
};

export default function AddLegalRepresentativeForm({
  party,
  productName,
  productId,
  backPreviousStep,
  addedUserList,
  setOutcome,
  isAddInBulkEAFlow,
}: Readonly<LegalRepresentativeProps>) {
  const [isChangedManager, setIsChangedManager] = useState(false);
  const [previousLegalRepresentative, setPreviousLegalRepresentative] =
    useState<ProductUserResource | null>();

  const requestId = uniqueId();
  const { t } = useTranslation();
  const setLoadingSearchUserPDV = useLoading(LOADING_TASK_SEARCH_USER_PDV);
  const setLoadingCheckManager = useLoading(LOADING_TASK_CHECK_MANAGER);
  const setLoadingGetLegalRepresentative = useLoading(LOADING_TASK_GET_LEGAL_REPRESENTATIVE);
  const setLoadingOnboarding = useLoading(LOADING_TASK_ONBOARDING_USER_WITH_LEGAL_REPRESENTATIVE);
  const addError = useErrorDispatcher();
  const activeOnboardingOnSelectedProduct = party.products.filter(
    (p) =>
      p.productOnBoardingStatus &&
      p.productOnBoardingStatus === ProductOnBoardingStatusEnum.ACTIVE &&
      p.productId === productId
  )[0];

  const setFormValues = async (formik: any, manager: ProductUserResource | null) => {
    await formik.setValues({
      name: manager?.name ?? '',
      surname: manager?.surname ?? '',
      taxCode: manager?.fiscalCode ?? '',
      email: manager?.email ?? '',
      role: RoleEnum.MANAGER,
    });
  };

  useEffect(() => {
    setLoadingGetLegalRepresentative(true);
    getLegalRepresentativeService(party, productId, RoleEnum.MANAGER)
      .then(async (r) => {
        const newestManager = findNewestManager(r);
        await setFormValues(formik, newestManager);
        setPreviousLegalRepresentative(newestManager);
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

  const searchUser = async (user: AddedUsersList) => {
    setLoadingSearchUserPDV(true);
    await searchUserService({ taxCode: user.taxCode })
      .then(async (data) => {
        if (data.id) {
          await checkManager(data.id, user);
        } else {
          await validateUser(user);
        }
      })
      .catch(async (error) => {
        await validateUser(user);
        addError({
          id: `SEARCH_USER_ERROR`,
          blocking: false,
          error,
          techDescription: `Something gone wrong while calling search-user`,
          toNotify: true,
        });
      })
      .finally(() => setLoadingSearchUserPDV(false));
  };

  const checkManager = async (userId: string, user: AddedUsersList) => {
    setLoadingCheckManager(true);
    checkManagerService({
      institutionType: activeOnboardingOnSelectedProduct.institutionType as InstitutionTypeEnum,
      origin: party?.origin,
      originId: party?.originId,
      productId,
      subunitCode: party?.subunitCode,
      taxCode: party.vatNumber,
      userId,
    })
      .then(async (data) => {
        if (data) {
          setIsChangedManager(!data.result);
          if (!data.result) {
            trackEvent('CHANGE_LEGAL_REPRESENTATIVE', {
              request_id: requestId,
              party_id: party.partyId,
              product_id: productId,
              from: 'dashboard',
            });
          } else {
            await validateUser(user);
          }
        }
      })
      .catch(async (error) => {
        await validateUser(user);
        addError({
          id: `VALIDATE_USER_ERROR`,
          blocking: false,
          error,
          techDescription: `Something gone wrong while calling validate-user`,
          toNotify: true,
        });
      })
      .finally(() => setLoadingCheckManager(false));
  };

  const initialFormData = {
    taxCode: '',
    name: '',
    surname: '',
    email: '',
    role: RoleEnum.MANAGER,
  };

  const formik = useFormik<AddedUsersList>({
    initialValues: initialFormData,
    validate: (user) => validateManagerForm(user, addedUserList, t),

    onSubmit: async (user) => {
      if (previousLegalRepresentative) {
        await searchUser(user);
      } else {
        await validateUser(user);
      }
    },
  });

  const validateUser = async (user: AddedUsersList) => {
    validateLegalRepresentative({
      name: user.name,
      surname: user.surname,
      taxCode: user.taxCode,
    })
      .then(() => sendOnboardingData([...addedUserList, { ...user, role: RoleEnum.MANAGER }]))
      .catch((error) => {
        if (error && error.httpStatus === 409) {
          const invalidParams = error.httpBody?.invalidParams;

          if (invalidParams) {
            invalidParams.forEach((param: { name: string; reason: string }) => {
              formik.setFieldError(param.name, renderErrorMessage(param.name, t));
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

  const goToUsersPage = () => {
    window.location.assign(resolvePathVariables(ENV.ROUTES.USERS, { partyId: party.partyId }));
  };

  const outcomeContent = getOutcomeContent(t, goToUsersPage);

  const sendOnboardingData = (addedUserList: Array<AddedUsersList>) => {
    setLoadingOnboarding(true);
    const submitRequestData = {
      productId,
      institutionType: activeOnboardingOnSelectedProduct.institutionType as InstitutionTypeEnum,
      origin: activeOnboardingOnSelectedProduct.origin,
      originId: activeOnboardingOnSelectedProduct.originId,
      subunitCode: party?.subunitCode,
      taxCode: party?.fiscalCode,
      users: addedUserList as Array<UserDto>,
    };

    const submitApiToCall = isAddInBulkEAFlow
      ? onboardingAggregatorService(submitRequestData)
      : onboardingPostUser(submitRequestData);

    submitApiToCall
      .then((res) => {
        if (res === null) {
          setOutcome(outcomeContent.error);
          return;
        }
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
      })
      .finally(() => setLoadingOnboarding(false));
  };

  return (
    <Grid>
      <ConfirmChangeLRModal
        open={isChangedManager}
        onConfirm={async () => {
          setIsChangedManager(false);
          await validateUser(formik.values);
        }}
        onClose={() => setIsChangedManager(false)}
        managerFullName={`${previousLegalRepresentative?.name} ${previousLegalRepresentative?.surname}`}
      />
      <Grid>
        <form onSubmit={formik.handleSubmit} noValidate>
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
                    window.open(ENV.DOCUMENTATION_LINKS.USERS, '_blank');
                  }}
                >
                  {t('userEdit.addForm.role.documentationLink')}
                </ButtonNaked>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <FormFields formik={formik} />
              </Grid>
            </Grid>
          </Grid>
          <FormActions onBack={backPreviousStep} isSubmitting={formik.isSubmitting} />
        </form>
      </Grid>
    </Grid>
  );
}
