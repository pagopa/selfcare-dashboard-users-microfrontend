import { FormControlLabel, styled, TextField, Typography } from '@mui/material';
import { IllusCompleted, IllusError } from '@pagopa/mui-italia';
import { EndingPage } from '@pagopa/selfcare-common-frontend/lib';
import { Trans } from 'react-i18next';
import { ProductUserResource } from '../../../api/generated/b4f-dashboard/ProductUserResource';
import { ProductRole } from '../../../model/ProductRole';
import { RequestOutcomeOptions } from '../../../model/UserRegistry';
import { ENV } from '../../../utils/env';

export const CustomTextField = styled(TextField)({
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

export const commonStyles = {
  backgroundColor: 'background.paper',
  paddingTop: 3,
  paddingLeft: 3,
  paddingRight: 3,
  borderRadius: '4px',
  marginBottom: 5,
};

export const getProductLink = (productId: string, institutionType?: string): string => {
  switch (productId) {
    case 'prod-pagopa':
      if (['PA', 'GPS', 'GPU', 'PRV'].includes(institutionType ?? '')) {
        return ENV.DOCUMENTATION_LINKS.PAGOPA_EC;
      } else if (institutionType === 'PSP') {
        return ENV.DOCUMENTATION_LINKS.PAGOPA_PSP;
      } else if (institutionType === 'PT') {
        return ENV.DOCUMENTATION_LINKS.PAGOPA_PT;
      }
      return '';

    case 'prod-pn':
      return ENV.DOCUMENTATION_LINKS.SEND;

    case 'prod-interop':
      return ENV.DOCUMENTATION_LINKS.PDND;

    default:
      return '';
  }
};

export const findNewestManager = (
  managers: Array<ProductUserResource>
): ProductUserResource | null => {
  if (!managers || managers.length === 0) {
    return null;
  }

  return managers.reduce((newest, current) => {
    if (!newest.createdAt || !current.createdAt) {
      return newest;
    }
    return current.createdAt.getTime() > newest.createdAt.getTime() ? current : newest;
  }, managers[0]);
};

export const renderErrorMessage = (name: string, t: any) => {
  switch (name) {
    case 'name':
      return t('userEdit.mismatchWithTaxCode.name');
    case 'surname':
      return t('userEdit.mismatchWithTaxCode.surname');
    case 'taxCode':
      return t('userEdit.addForm.errors.invalidFiscalCode');
    case 'email':
      return t('userEdit.addForm.errors.invalidEmail');
    default:
      return '';
  }
};


export const getOutcomeContent = (t: any, goToUsersPage: () => void): RequestOutcomeOptions => ({
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
          variantTitle="h4"
          variantDescription="body1"
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
          variantTitle="h4"
          variantDescription="body1"
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
});

export const renderLabel = (p: ProductRole, validTaxcode: boolean) => (
  <>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 'fontWeightRegular',
        fontSize: '18px',
        color: !validTaxcode ? 'text.disabled' : 'colorTextPrimary',
      }}
    >
      {p.title}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'fontWeightRegular',
        fontSize: 'fontSize',
        color: !validTaxcode ? 'text.disabled' : 'text.secondary',
        marginBottom: 1,
      }}
    >
      {p.description}
    </Typography>
  </>
);

export const CustomFormControlLabel = styled(FormControlLabel)({
  disabled: false,
  '.MuiRadio-root': {
    color: '#0073E6',
  },
});

type RadioOptionLabelProps = {
  titleKey: string;
  descriptionKey: string;
  disabled: boolean;
  t: (t: string) => string;
};

export const RadioOptionLabel = ({ titleKey, descriptionKey, disabled, t }: RadioOptionLabelProps) => (
  <>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 'fontWeightRegular',
        fontSize: '18px',
        color: disabled ? 'text.disabled' : 'colorTextPrimary',
      }}
    >
      {t(titleKey)}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'fontWeightRegular',
        fontSize: 'fontSize',
        color: disabled ? 'text.disabled' : 'text.secondary',
        marginBottom: 1,
      }}
    >
      {t(descriptionKey)}
    </Typography>
  </>
);