import SessionModal from '@pagopa/selfcare-common-frontend/lib/components/SessionModal';
import { Trans, useTranslation } from 'react-i18next';

type ConfirmChangeModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfimChangeLRModal = ({ open, onClose, onConfirm }: ConfirmChangeModalProps) => {
  const { t } = useTranslation();

  return (
    <SessionModal
      open={open}
      title={t('userEdit.addForm.addLegalRepresentative.changeManagerModalTitle')}
      message={
        <Trans
          i18nKey="userEdit.addForm.addLegalRepresentative.changeManagerModalMessage"
          components={{ 1: <br /> }}
        >
          {
            'I dati del Legale Rappresentante inseriti sono diversi da quelli indicati in <1 />precedenza. Vuoi continuare?'
          }
        </Trans>
      }
      onCloseLabel={t('userEdit.addForm.backButton')}
      onConfirmLabel={t('userEdit.addForm.continueButton')}
      onConfirm={() => {
        onConfirm();
      }}
      handleClose={() => onClose()}
    />
  );
};
