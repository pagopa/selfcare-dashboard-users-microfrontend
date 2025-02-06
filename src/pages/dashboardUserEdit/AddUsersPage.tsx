import { Grid } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia/dist/components/ButtonNaked/ButtonNaked';
import SessionModal from '@pagopa/selfcare-common-frontend/lib/components/SessionModal';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { Party } from '../../model/Party';
import { AsyncOnboardingUserData } from '../../model/PartyUser';
import { Product } from '../../model/Product';
import { ProductsRolesMap } from '../../model/ProductRole';
import { RequestOutcomeMessage } from '../../model/UserRegistry';
import { PRODUCT_IDS } from '../../utils/constants';
import { ENV } from '../../utils/env';
import AddLegalRepresentativeForm from './components/AddLegalRepresentativeForm';
import AddUserForm from './components/AddUserForm';
import { MessageNoAction } from './components/MessageNoAction';

type Props = {
  party: Party;
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
};

export default function AddUsersPage({ party, activeProducts, productsRolesMap }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState<Product | undefined>();
  const [asyncUserData, setAsyncUserData] = useState<Array<AsyncOnboardingUserData>>([]);
  const [isAddInBulkEAFlow, setIsAddInBulkEAFlow] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<RequestOutcomeMessage | null>();
  const [openAminMaxLimitsModal, setOpenAminMaxLimitsModal] = useState(false);

  const forwardNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const backPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goBack = () => {
    history.push(resolvePathVariables(ENV.ROUTES.USERS, { partyId: party.partyId }));
  };

  const usersPathWithProduct = `${resolvePathVariables(ENV.ROUTES.USERS, {
    partyId: party.partyId ?? '',
  })}#${PRODUCT_IDS.PAGOPA}`;

  return outcome ? (
    <MessageNoAction {...outcome} />
  ) : (
    <Grid
      item
      px={3}
      mt={3}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
      xs={12}
      md={8}
    >
      <SessionModal
        open={openAminMaxLimitsModal}
        title={t('userEdit.addForm.adminLimit.title')}
        message={
          <Trans
            i18nKey="userEdit.addForm.adminLimit.message"
            values={{ adminCount: ENV.MAX_ADMIN_COUNT }}
            components={{
              1: <div style={{ marginTop: '8px' }} />,
            }}
          >
            {`Al momento hai {{adminCount}} Amministratori attivi, che è il numero massimo consentito. <1 /> Per aggiungerne uno nuovo, rimuovi prima un Amministratore esistente.`}
          </Trans>
        }
        onConfirmLabel={t('userEdit.addForm.adminLimit.modifyButton')}
        onConfirm={() => {
          history.push(usersPathWithProduct);
          setOpenAminMaxLimitsModal(false);
        }}
        onCloseLabel={t('userEdit.addForm.adminLimit.backButton')}
        handleClose={() => setOpenAminMaxLimitsModal(false)}
      />
      <Grid item xs={12} mb={2}>
        <ProductNavigationBar
          showBackComponent={true}
          goBack={goBack}
          backLabel={t('userPagesPath.exit')}
          colorBackComponent="primary.main"
        />
      </Grid>

      <TitleBox
        variantTitle="h4"
        variantSubTitle="body1"
        title={t('userEdit.addForm.title')}
        subTitle={t('userEdit.addForm.subTitle')}
        mbTitle={1}
        mbSubTitle={1}
      />

      <ButtonNaked
        component="button"
        color="primary"
        sx={{
          fontWeight: 'fontWeightBold',
          fontSize: '14px',
          textDecoration: 'underline',
          marginBottom: 5,
        }}
        onClick={() => {
          window.open(ENV.DOCUMENTATION_LINKS.USERS);
        }}
      >
        {t('userEdit.addForm.addLegalRepresentative.moreInformationOnRoles')}
      </ButtonNaked>

      <Grid item xs={12}>
        {currentStep === 1 && (
          <AddUserForm
            party={party}
            products={activeProducts}
            productsRolesMap={productsRolesMap}
            initialFormData={{
              taxCode: '',
              name: '',
              surname: '',
              email: '',
              confirmEmail: '',
              certifiedMail: false,
              certifiedName: false,
              certifiedSurname: false,
              productRoles: [],
            }}
            canEditRegistryData={true}
            forwardNextStep={forwardNextStep}
            setCurrentSelectedProduct={setCurrentSelectedProduct}
            setAsyncUserData={setAsyncUserData}
            isAddInBulkEAFlow={isAddInBulkEAFlow}
            setIsAddInBulkEAFlow={setIsAddInBulkEAFlow}
          />
        )}

        {currentStep === 2 && (
          <AddLegalRepresentativeForm
            productName={currentSelectedProduct?.title ?? ''}
            productId={currentSelectedProduct?.id ?? ''}
            backPreviousStep={backPreviousStep}
            party={party}
            asyncUserData={asyncUserData}
            setOutcome={setOutcome}
            isAddInBulkEAFlow={isAddInBulkEAFlow}
          />
        )}
      </Grid>
    </Grid>
  );
}
