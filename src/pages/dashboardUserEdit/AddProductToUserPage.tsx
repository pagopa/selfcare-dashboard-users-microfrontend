import { Grid, styled, Typography } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend/lib';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withUserDetail, { withUserDetailProps } from '../../decorators/withUserDetail';
import { Party } from '../../model/Party';
import { AsyncOnboardingUserData, PartyUserOnCreation } from '../../model/PartyUser';
import { Product } from '../../model/Product';
import { ProductsRolesMap } from '../../model/ProductRole';
import { RequestOutcomeMessage } from '../../model/UserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import AddLegalRepresentativeForm from './AddLegalRepresentativeForm';
import AddUserForm from './components/AddUserForm';
import { MessageNoAction } from './components/MessageNoAction';

const CustomTextTransform = styled(Typography)({
  textTransform: 'capitalize',
});

type Props = {
  party: Party;
  activeProducts: Array<Product>;
  productsRolesMap: ProductsRolesMap;
} & withUserDetailProps;

function AddProductToUserPage({ party, activeProducts, productsRolesMap, partyUser }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState<Product | undefined>();
  const [asyncUserData, setAsyncUserData] = useState<Array<AsyncOnboardingUserData>>([]);
  const [isAddInBulkEAFlow, setIsAddInBulkEAFlow] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<RequestOutcomeMessage | null>();

  const forwardNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const backPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goBack = () => {
    history.goBack();
    /*
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        partyId: party.partyId,
        userId: partyUser.id,
      })
    );
    */
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
      description: `${partyUser.name} ${partyUser.surname}`,
      onClick: goBack,
    },
    {
      description: t('userEdit.addProduct.navigation'),
    },
  ];

  return outcome ? (
    <Grid container justifyContent={'center'} width={'100%'}>
      <MessageNoAction {...outcome} />
    </Grid>
  ) : (
    <Grid container item px={3} mt={3} sx={{ width: '100%' }}>
      <Grid container item xs={12} md={8}>
        <ProductNavigationBar
          paths={paths as any}
          showBackComponent={false}
          goBack={goBack}
          backLabel={t('userPagesPath.exit')}
          colorBackComponent="primary.main"
        />

        <Grid item xs={12}>
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('userEdit.addProduct.title')}
            subTitle={t('userEdit.addProduct.subTitle', {
              institutionName: `${party.description}`,
            })}
            mbSubTitle={5}
            mtTitle={1}
          />
        </Grid>
        <Grid item xs={12}>
          {currentStep === 1 && (
            <>
              <Grid
                item
                sx={{
                  backgroundColor: '#EEEEEE',
                  padding: 3,
                  mb: 5,
                }}
              >
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid container item alignContent="center">
                      <Grid item xs={3}>
                        <Typography variant="body2" fontSize="fontSize">
                          {t('userEdit.addProduct.name')}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={9}
                        className="partyUserStyle"
                        sx={{
                          height: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          overflowWrap: 'break-word',
                        }}
                      >
                        <CustomTextTransform
                          color="text.primary"
                          fontWeight="fontWeightMedium"
                          fontSize="fontSize"
                          className="CustomInfoStyle"
                        >
                          {partyUser.name.toLocaleLowerCase()}
                        </CustomTextTransform>
                      </Grid>
                    </Grid>
                    <Grid container item alignContent="center">
                      <Grid item xs={3}>
                        <Typography variant="body2" fontSize="fontSize">
                          {t('userEdit.addProduct.surname')}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={9}
                        sx={{
                          height: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          overflowWrap: 'break-word',
                        }}
                      >
                        <CustomTextTransform
                          color="text.primary"
                          fontWeight="fontWeightMedium"
                          fontSize="fontSize"
                          className="CustomInfoStyle"
                        >
                          {partyUser.surname}
                        </CustomTextTransform>
                      </Grid>
                    </Grid>
                    <Grid container item alignContent="center">
                      <Grid item xs={3}>
                        <Typography variant="body2" fontSize="fontSize">
                          {t('userEdit.addProduct.fiscalCode')}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={9}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          overflowWrap: 'break-word',
                        }}
                      >
                        <CustomTextTransform
                          color="text.primary"
                          fontWeight="fontWeightMedium"
                          fontSize="fontSize"
                          className="CustomInfoStyle"
                        >
                          {partyUser.taxCode}
                        </CustomTextTransform>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <AddUserForm
                goBack={goBack}
                party={party}
                userId={partyUser.id}
                products={activeProducts.filter((p) =>
                  partyUser.products.every((userProduct) => p.id !== userProduct.id)
                )}
                productsRolesMap={productsRolesMap}
                initialFormData={
                  {
                    taxCode: partyUser.taxCode,
                    name: partyUser.name,
                    surname: partyUser.surname,
                    email: partyUser.email,
                    confirmEmail: partyUser.email,
                    id: partyUser.id,
                    productRoles: [],
                    certifiedName: false,
                    certifiedSurname: false,
                    certifiedMail: false,
                  } as PartyUserOnCreation
                }
                canEditRegistryData={false}
                forwardNextStep={forwardNextStep}
                setCurrentSelectedProduct={setCurrentSelectedProduct}
                setAsyncUserData={setAsyncUserData}
                isAddInBulkEAFlow={isAddInBulkEAFlow}
                setIsAddInBulkEAFlow={setIsAddInBulkEAFlow}
              />
            </>
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
    </Grid>
  );
}

export default withUserDetail(AddProductToUserPage);
