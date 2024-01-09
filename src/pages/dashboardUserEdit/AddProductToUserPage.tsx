import { Grid, styled, Typography } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PeopleAlt } from '@mui/icons-material';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withUserDetail, { withUserDetailProps } from '../../decorators/withUserDetail';
import { Party } from '../../model/Party';
import { PartyUserOnCreation } from '../../model/PartyUser';
import { Product } from '../../model/Product';
import { ProductsRolesMap } from '../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import AddUserForm from './components/AddUserForm';

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

  const isPnpg = !!activeProducts.find((p) => p.id === 'prod-pn-pg');

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      icon: isPnpg ? undefined : PeopleAlt,
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.MAIN.path, {
            partyId: party.partyId,
          })
        ),
    },
    {
      description: partyUser.name + ' ' + partyUser.surname,
      onClick: goBack,
    },
    {
      description: t('userEdit.addProduct.navigation'),
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={3}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={12} lg={8}>
        <Grid item xs={12}>
          <ProductNavigationBar paths={paths as any} showBackComponent={true} goBack={goBack} />
        </Grid>
        <Grid item xs={12}>
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('userEdit.addProduct.title')}
            subTitle={t('userEdit.addProduct.subTitle', {
              institutionName: `${party.description}`,
            })}
            mbTitle={1}
            mtTitle={1}
            mbSubTitle={5}
          />
        </Grid>
        <Grid item xs={9} mb={5}>
          <Grid
            item
            sx={{
              backgroundColor: 'background.default',
              padding: 3,
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
        </Grid>

        <Grid item xs={9} mb={9}>
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
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withUserDetail(AddProductToUserPage);
