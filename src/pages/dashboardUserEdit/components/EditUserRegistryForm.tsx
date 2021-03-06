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

const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
const requiredError = 'Required';

type Props = {
  party: Party;
  user: PartyUserOnEdit;
  goBack: () => void;
};

type TextTransform = 'uppercase' | 'lowercase';

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
      updatePartyUser(party, {
        ...values,
        taxCode: values.taxCode.toUpperCase(),
        email: values.email.toLowerCase(),
      })
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
              {...baseTextFieldProps(
                'taxCode',
                t('userEdit.editRegistryForm.fiscalCode.label'),
                '',
                'uppercase'
              )}
              disabled={true}
            />
          </Grid>
          <Grid item container spacing={2} mb={3}>
            <Grid item xs={6} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps('name', t('userEdit.editRegistryForm.name.label'), '')}
                disabled={formik.values.certifiedName}
              />
            </Grid>
            <Grid item xs={6} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps('surname', t('userEdit.editRegistryForm.surname.label'), '')}
                disabled={formik.values.certifiedSurname}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3} sx={{ height: '75px' }}>
            <CustomTextField
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
            <Button color="primary" variant="outlined" onClick={() => onExit(goBack)}>
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
