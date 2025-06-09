import { Stack, Button } from "@mui/material";
import { useTranslation } from 'react-i18next';

export const FormActions = ({ 
  onBack, 
  isSubmitting 
}: { 
  onBack: () => void;
  isSubmitting: boolean;
}) => {
  const { t } = useTranslation();
  
  return (
    <Stack direction="row" display="flex" justifyContent="space-between">
      <Button
        color="primary"
        variant="outlined"
        size="medium"
        onClick={onBack}
        disabled={isSubmitting}
      >
        {t('userEdit.addForm.backButton')}
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        size="medium"
        disabled={isSubmitting}
      >
        {t('userEdit.addForm.addLegalRepresentative.sendRequest')}
      </Button>
    </Stack>
  );
};