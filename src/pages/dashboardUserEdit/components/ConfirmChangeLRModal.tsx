import SessionModal from '@pagopa/selfcare-common-frontend/lib/components/SessionModal';
import { Trans, useTranslation } from 'react-i18next';

type ConfirmChangeModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  managerFullName: string;
};

export const ConfirmChangeLRModal = ({
  open,
  onClose,
  onConfirm,
  managerFullName,
}: ConfirmChangeModalProps) => {
  const { t } = useTranslation();

  return (
    <SessionModal
      open={open}
      title={t('userEdit.addForm.addLegalRepresentative.changeManagerModalTitle')}
      message={
        <Trans
          i18nKey="userEdit.addForm.addLegalRepresentative.changeManagerModalMessage"
          components={{ 1: <br />, 3: <br />, 4: <br /> }}
          values={{ managerFullName }}
        >
          {
            'Stai per sostituire l’attuale Legale Rappresentante, {{managerFullName}}, con una nuova persona. <1 />Se procedi, l’attuale Legale rappresentante potrà continuare a operare come Amministratore. <3 /> <4 />Vuoi continuare?'
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
