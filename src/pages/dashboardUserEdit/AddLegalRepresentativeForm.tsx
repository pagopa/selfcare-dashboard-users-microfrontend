import { Grid, TextField } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend/lib';
import { emailRegexp } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { verifyChecksumMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyChecksumMatchWithTaxCode';
import { verifyNameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifyNameMatchWithTaxCode';
import { verifySurnameMatchWithTaxCode } from '@pagopa/selfcare-common-frontend/lib/utils/verifySurnameMatchWithTaxCode';
import { Form, Formik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { PartyUserOnCreation } from '../../model/PartyUser';
import { CustomTextField, requiredError, taxCodeRegexp } from './helpers';

type LegalRepresentativeProps = {
  productName: string;
};

export default function AddLegalRepresentativeForm({ productName }: LegalRepresentativeProps) {
  const { t } = useTranslation();

  const initialValues = {
    name: '',
    surname: '',
    email: '',
    taxCode: '',
  };

  const validate = (values: Partial<PartyUserOnCreation>) =>
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

  const handleSubmit = (values: any) => {
    console.log('Form values:', values, productName);
  };
  
  return (
    <Grid>
      <Grid>
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
                  values={{ productName: 'Test' }}
                  components={{ strong: <strong /> }}
                />
              }
              mbTitle={1}
              mbSubTitle={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
              {({ handleChange, handleBlur, values, errors }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <CustomTextField
                        as={TextField}
                        label={t('userEdit.addForm.addLegalRepresentative.name')}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        as={TextField}
                        label={t('userEdit.addForm.addLegalRepresentative.surname')}
                        name="surname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.surname}
                        fullWidth
                        error={!!errors.surname}
                        helperText={errors.surname}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        as={TextField}
                        label={t('userEdit.addForm.addLegalRepresentative.institutionalEmail')}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        as={TextField}
                        label={t('userEdit.addForm.addLegalRepresentative.taxCode')}
                        name="taxCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.taxCode}
                        fullWidth
                        error={!!errors.taxCode}
                        helperText={errors.taxCode}
                      />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
