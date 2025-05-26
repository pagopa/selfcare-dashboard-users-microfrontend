import { Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { AddedUsersList, TextTransform } from "../../../model/PartyUser";
import { CustomTextField } from "../utils/helpers";
import { requiredError } from "../utils/validation";

export const FormFields = ({ formik }: { formik: any }) => {
  const { t } = useTranslation();

  const baseTextFieldProps = (
    field: keyof AddedUsersList,
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
  );
};