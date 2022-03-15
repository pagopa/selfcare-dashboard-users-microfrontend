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
import { Party } from '../../../model/Party';
import { LOADING_TASK_SAVE_PARTY_USER } from '../../../utils/constants';
import { updatePartyUser } from '../../../services/usersService';
import { PartyUser, PartyUserOnEdit } from '../../../model/PartyUser';

const CustomTextField = styled(TextField)({
  '.MuiInputLabel-asterisk': {
    display: 'none',
  },
  '.MuiInput-root': {
    '&:after': {
      borderBottom: '2px solid #5C6F82',
      color: 'green',
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
});

const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
const requiredError = 'Required';

type Props = {
  party: Party;
  user: PartyUser;
  goBack: () => void;
};

export default function EditUserRegistryForm({ party, user, goBack }: Props) {
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
          ? 'L’indirizzo email non è valido'
          : undefined,
        confirmEmail: !values.confirmEmail
          ? requiredError
          : values.confirmEmail !== values.email
          ? 'Gli indirizzi email non corrispondono'
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
            party_id: party.institutionId,
            user: user.id,
          });
          addNotify({
            component: 'Toast',
            id: 'EDIT_PARTY_USER',
            title: 'REFERENTE MODIFICATO',
            message: (
              <>
                {'Hai modificato correttamente i dati di '}
                <strong>{`${values.name} ${values.surname}`}</strong>
                {'.'}
              </>
            ),
          });
          goBack();
        })
        .catch((reason) =>
          addError({
            id: 'EDIT_PARTY_USER_ERROR',
            blocking: false,
            error: reason,
            techDescription: `An error occurred while editing party user ${user.id} of institution ${party.institutionId}`,
            toNotify: true,
            displayableTitle: 'ERRORE DURANTE LA MODIFICA',
            displayableDescription: (
              <>
                {"C'è stato un errore durante la modifica del referente "}
                <strong>{`${values.name} ${values.surname}`}</strong>.
              </>
            ),
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
        <Grid container direction="column">
          <Grid item container spacing={3}>
            <Grid item xs={8} mb={3} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'taxCode',
                  'Codice Fiscale',
                  'Inserisci il Codice Fiscale del referente'
                )}
                disabled={true}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={4} mb={3} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps('name', 'Nome', 'Inserisci il nome del referente')}
                disabled={formik.values.certification}
              />
            </Grid>
            <Grid item xs={4} mb={3} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps('surname', 'Cognome', 'Inserisci il cognome del referente')}
                disabled={formik.values.certification}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={8} mb={4} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'email',
                  'Email istituzionale',
                  'Inserisci l’indirizzo email istituzionale del referente'
                )}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={8} mb={4} sx={{ height: '75px' }}>
              <CustomTextField
                {...baseTextFieldProps(
                  'confirmEmail',
                  'Conferma email',
                  'Conferma l’indirizzo email istituzionale del referente'
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
              Indietro
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
              Conferma
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
