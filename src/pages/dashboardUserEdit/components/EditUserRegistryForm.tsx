import React, { useEffect } from 'react';
import { Grid, TextField, Button, styled, Stack } from '@mui/material';
import { useFormik } from 'formik';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import {
  useUnloadEventInterceptor,
  useUnloadEventOnExit,
} from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { useTranslation } from 'react-i18next';
import { EmailString } from '@pagopa/ts-commons/lib/strings';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/utils/verifySurnameMatchWithTaxCode';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { theme } from '@pagopa/mui-italia';
import { emailRegexp } from '@pagopa/selfcare-common-frontend/utils/constants';
import { Party } from '../../../model/Party';
import { LOADING_TASK_SAVE_PARTY_USER } from '../../../utils/constants';
import { updatePartyUser } from '../../../services/usersService';
import { PartyUserOnEdit } from '../../../model/PartyUser';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import { useIsMobile } from '../../../hooks/useIsMobile';

const CustomTextField: any = styled(TextField)({
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
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      color: 'text.primary',
      opacity: '1',
      textTransform: 'none',
    },
  },
});

const requiredError = 'Required';

type Props = {
  party: Party;
  user: PartyUserOnEdit;
  goBack: () => void;
};

type TextTransform = 'uppercase' | 'lowercase';

export default function EditUserRegistryForm({ party, user, goBack }: Props) {
  const { t } = useTranslation();
  const isMobile = useIsMobile('lg');
  const setLoadingSaveUser = useLoading(LOADING_TASK_SAVE_PARTY_USER);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const history = useHistory();

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const onExit = useUnloadEventOnExit();

  const validate = (values: Partial<PartyUserOnEdit>) =>
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
        email: !values.email
          ? requiredError
          : !emailRegexp.test(values.email)
          ? t('userEdit.editRegistryForm.errors.invalidEmail')
          : undefined,
        confirmEmail: !values.confirmEmail
          ? requiredError
          : values.email &&
            values.confirmEmail.toLocaleLowerCase() !== values.email.toLocaleLowerCase()
          ? t('userEdit.editRegistryForm.errors.mismatchEmail')
          : undefined,
      }).filter(([_key, value]) => value)
    );

  const formik = useFormik<PartyUserOnEdit>({
    initialValues: { ...user, confirmEmail: user.email },
    validate,
    onSubmit: (values) => {
      setLoadingSaveUser(true);
      updatePartyUser(party, {
        ...values,
        taxCode: values.taxCode.toUpperCase(),
        email: values.email.toLowerCase() as EmailString,
      })
        .then(() => {
          unregisterUnloadEvent();
          trackEvent('USER_UPDATE', {
            party_id: party.partyId,
          });
          addNotify({
            component: 'Toast',
            id: 'EDIT_PARTY_USER',
            title: t('userEdit.editRegistryForm.editUserSuccess'),
            message: '',
          });
          goBack();
        })
        .catch((reason) =>
          addError({
            id: 'EDIT_PARTY_USER_ERROR',
            blocking: false,
            error: reason,
            techDescription: `An error occurred while editing party user ${user.id} of institution ${party.partyId}`,
            toNotify: true,
            displayableTitle: t('userEdit.editRegistryForm.editUserError'),
            displayableDescription: '',
            component: 'Toast',
          })
        )
        .finally(() => setLoadingSaveUser(false));
    },
  });

  useEffect(() => {
    if (formik.dirty) {
      registerUnloadEvent();
    } else {
      unregisterUnloadEvent();
    }
  }, [formik.dirty]);

  const baseTextFieldProps = (
    field: keyof PartyUserOnEdit,
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
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
              size="small"
              {...baseTextFieldProps(
                'taxCode',
                t('userEdit.editRegistryForm.fiscalCode.label'),
                '',
                'uppercase'
              )}
              disabled={true}
            />
          </Grid>
          <Grid
            item
            container
            spacing={2}
            mb={isMobile ? 3 : 1}
            sx={{
              [theme.breakpoints.down('lg')]: {
                flexDirection: 'column',
              },
            }}
          >
            <Grid item xs={12} lg={6} sx={{ height: '75px' }}>
              <CustomTextField
                size="small"
                {...baseTextFieldProps('name', t('userEdit.editRegistryForm.name.label'), '')}
                disabled={formik.values.certifiedName}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                height: '75px',
                [theme.breakpoints.down('lg')]: {
                  marginTop: 1,
                },
              }}
            >
              <CustomTextField
                size="small"
                {...baseTextFieldProps('surname', t('userEdit.editRegistryForm.surname.label'), '')}
                disabled={formik.values.certifiedSurname}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
              size="small"
              {...baseTextFieldProps(
                'email',
                t('userEdit.editRegistryForm.institutionalEmail.label'),
                '',
                'lowercase'
              )}
            />
          </Grid>
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
              size="small"
              {...baseTextFieldProps(
                'confirmEmail',
                t('userEdit.editRegistryForm.confirmInstitutionalEmail.label'),
                '',
                'lowercase'
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="space-between" mt={5}>
          <Stack display="flex" justifyContent="flex-start">
            <Button
              color="primary"
              variant="outlined"
              onClick={() =>
                onExit(() =>
                  history.push(
                    resolvePathVariables(
                      DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
                      {
                        partyId: party.partyId,
                        userId: user.id,
                      }
                    )
                  )
                )
              }
            >
              {t('userEdit.editRegistryForm.backButton')}
            </Button>
          </Stack>
          <Stack display="flex" justifyContent="flex-end">
            <Button
              disabled={!formik.dirty || !formik.isValid}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t('userEdit.editRegistryForm.confirmButton')}
            </Button>
          </Stack>
        </Stack>
      </form>
    </React.Fragment>
  );
}
