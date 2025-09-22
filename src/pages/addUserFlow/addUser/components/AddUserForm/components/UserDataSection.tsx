import { Grid } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { TitleBox } from '@pagopa/selfcare-common-frontend/lib';
import { FormikProps } from 'formik';
import { PartyUserOnCreation, TextTransform } from '../../../../../../model/PartyUser';
import { commonStyles, CustomTextField } from '../../../../utils/helpers';

type UserDataSectionProps = {
  formik: FormikProps<PartyUserOnCreation>;
  baseTextFieldProps: (
    field: keyof PartyUserOnCreation,
    label: string,
    placeholder: string,
    textTransform?: TextTransform
  ) => any;
  validTaxcode: string | undefined;
  isMobile: boolean;
  t: (key: string) => string;
};

export const UserDataSection = ({
  formik,
  baseTextFieldProps,
  validTaxcode,
  isMobile,
  t,
}: UserDataSectionProps) => (
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
        {...baseTextFieldProps('taxCode', t('userEdit.addForm.fiscalCode.label'), '', 'uppercase')}
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
);
