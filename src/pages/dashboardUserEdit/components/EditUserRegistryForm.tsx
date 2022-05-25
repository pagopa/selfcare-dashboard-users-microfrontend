import React, { useEffect } from 'react';
import { Grid, TextField, Button, styled } from '@mui/material';
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
import { Party } from '../../../model/Party';
import { LOADING_TASK_SAVE_PARTY_USER } from '../../../utils/constants';
import { updatePartyUser } from '../../../services/usersService';
import { PartyUserOnEdit } from '../../../model/PartyUser';

const CustomTextField = styled(TextField)({
  '.MuiInputLabel-asterisk': {
    display: 'none',
  },
  '.MuiInput-root': {
    '&:after': {
      borderBottom: '2px solid #5C6F82',
      color: '#5C6F82',
    },
  },
  '.MuiInputLabel-root.Mui-focused': {
    color: '#5C6F82',
    fontWeight: '700',
  },
  '.MuiInputLabel-root': {
    color: '#5C6F82',
    fontSize: '16px',
    fontWeight: '700',
  },
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
      color: '#5C6F82',
      opacity: '1',
    },
  },
  label: {
    '&.Mui-error': {
      color: '#5C6F82 !important',
    },
  },
});

const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
const requiredError = 'Required';

type Props = {
  party: Party;
  user: PartyUserOnEdit;
  goBack: () => void;
};

export default function EditUserRegistryForm({ party, user, goBack }: Props) {
  const { t } = useTranslation();
  const setLoadingSaveUser = useLoading(LOADING_TASK_SAVE_PARTY_USER);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const onExit = useUnloadEventOnExit();

  const validate = (values: Partial<PartyUserOnEdit>) =>
    Object.fromEntries(
      Object.entries({
        name: !values.name ? requiredError : undefined,
        surname: !values.surname ? requiredError : undefined,
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
      updatePartyUser(party, values)
        .then(() => {
          unregisterUnloadEvent();
          trackEvent('USER_UPDATE', {
            party_id: party.partyId,
            user: user.id,
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

  const baseTextFieldProps = (field: keyof PartyUserOnEdit, label: string, placeholder: string) => {
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
      variant: 'standard' as const,
      onChange: formik.handleChange,
      sx: { width: '100%' },
      InputProps: {
        style: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          color: '#5C6F82',
          textAlign: 'start' as const,
          paddingLeft: '16px',
        },
      },
    };
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          item
          sx={{
            backgroundColor: '#FFFFFF',
            padding: '24px',
          }}
          xs={9}
        >
          <Grid item container spacing={3}>
            <Grid item xs={10} mb={3} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'taxCode',
                  t('userEdit.editRegistryForm.fiscalCode.label'),
                  t('userEdit.editRegistryForm.fiscalCode.placeholder')
                )}
                disabled={true}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={5} mb={3} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'name',
                  t('userEdit.editRegistryForm.name.label'),
                  t('userEdit.editRegistryForm.name.placeholder')
                )}
                disabled={formik.values.certifiedName}
              />
            </Grid>
            <Grid item xs={5} mb={3} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'surname',
                  t('userEdit.editRegistryForm.surname.label'),
                  t('userEdit.editRegistryForm.surname.placeholder')
                )}
                disabled={formik.values.certifiedSurname}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={10} mb={4} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'email',
                  t('userEdit.editRegistryForm.institutionalEmail.label'),
                  t('userEdit.editRegistryForm.institutionalEmail.placeholder')
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={10} mb={4} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'confirmEmail',
                  t('userEdit.editRegistryForm.confirmInstitutionalEmail.label'),
                  t('userEdit.editRegistryForm.confirmInstitutionalEmail.placeholder')
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container spacing={3}>
          <Grid item xs={3} mt={8}>
            <Button
              sx={{ width: '100%' }}
              color="primary"
              variant="outlined"
              onClick={() => onExit(goBack)}
            >
              {t('userEdit.editRegistryForm.backButton')}
            </Button>
          </Grid>
          <Grid item xs={3} mt={8}>
            <Button
              disabled={!formik.dirty || !formik.isValid}
              sx={{ width: '100%' }}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t('userEdit.editRegistryForm.confirmButton')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
