import { Grid } from '@mui/material';
import { IllusCompleted, IllusError } from '@pagopa/mui-italia';
import { EndingPage } from '@pagopa/selfcare-common-frontend/lib';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { Party } from '../../model/Party';
import { Product } from '../../model/Product';
import { ProductsRolesMap } from '../../model/ProductRole';
import { RequestOutcomeOptions } from '../../model/UserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import { ENV } from '../../utils/env';
import AddLegalRepresentativeForm from './AddLegalRepresentativeForm';
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
  const [currentStep, _setCurrentStep] = useState(1);
  /*
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
*/
  const goBack = () => {
    history.goBack();
  };

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
            partyId: party.partyId,
          })
        ),
    },
    {
      description: t('userPagesPath.addUser'),
    },
  ];

  // TODO render based on call outcome succes or generic error
  const outcomeContent: RequestOutcomeOptions = {
    success: {
      title: '',
      description: [
        <>
          <EndingPage
            minHeight="52vh"
            icon={<IllusCompleted size={60} />}
            title={t('onboarding.success.flow.user.title')}
            description={
              <Trans
                i18nKey="onboarding.success.flow.user.description"
                components={{ 1: <br />, 3: <br /> }}
              >
                {`Invieremo un’email all’indirizzo PEC primario dell’ente. <1 /> Al suo interno, ci sono le istruzioni per completare <3 />l’operazione.`}
              </Trans>
            }
            variantTitle={'h4'}
            variantDescription={'body1'}
            buttonLabel={t('onboarding.backHome')}
            onButtonClick={() => window.location.assign(ENV.ROUTES.USERS)}
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
            variantTitle={'h4'}
            variantDescription={'body1'}
            title={t('onboarding.error.title')}
            description={
              <Trans i18nKey="onboarding.error.description" components={{ 1: <br /> }}>
                {`A causa di un errore del sistema non è possibile completare <1 />la procedura. Ti chiediamo di riprovare più tardi.`}
              </Trans>
            }
            buttonLabel={t('onboarding.backHome')}
            onButtonClick={() => window.location.assign(ENV.ROUTES.USERS)}
          />
        </>,
      ],
    },
  };

  /*
  // TODO not allowed 
  const notAllowedError: RequestOutcomeMessage = {
    title: '',
    description: [
      <>
        <UserNotAllowedPage
          partyName={onboardingFormData?.businessName}
          productTitle={selectedProduct?.title}
        />
      </>,
    ],
  };
*/
  return (
    <Grid
      container
      px={3}
      mt={3}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={12} md={8}>
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar
            paths={paths as any}
            // TODO showBackComponent into true after prod deploy
            showBackComponent={false}
            goBack={goBack}
            backLabel={t('userPagesPath.exit')}
            colorBackComponent="primary.main"
          />
        </Grid>
        <Grid item xs={12}>
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('userEdit.addForm.title')}
            subTitle={t('userEdit.addForm.subTitle')}
            mbTitle={1}
            mbSubTitle={5}
          />
        </Grid>
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
            />
          )}

          {currentStep === 2 && <AddLegalRepresentativeForm productName={'Test Name'} />}

          {
            // TODO render based on call outcome succes or generic error
            currentStep === 3 && <MessageNoAction {...outcomeContent.success} />
          }
        </Grid>
      </Grid>
    </Grid>
  );
}
