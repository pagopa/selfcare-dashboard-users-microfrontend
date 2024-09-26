import { Grid } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { matchPath, useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withUserRegistry, { withUserRegistryProps } from '../../decorators/withUserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import EditUserRegistryForm from './components/EditUserRegistryForm';

type Props = withUserRegistryProps;

function EditUserRegistryPage({ party, user }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () => history.goBack();

  /*
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        userId: user.id,
        partyId: party.partyId,
      })
    );
    */

  const goBackToUserDetail = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        partyId: party.partyId,
        userId: user.id,
      })
    );

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
            partyId: party.partyId,
          })
        ),
    },
    {
      description: `${user.name} ${user.surname}`,
      onClick: goBackToUserDetail,
    },
    {
      description: t('userPagesPath.editUser'),
    },
  ];

  const isUsersDetailPath = matchPath(location.pathname, {
    path: DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
    exact: true,
  });

  return (
    <Grid
      container
      alignItems={'center'}
      px={3}
      mt={3}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid container item xs={12} lg={8}>
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar
            paths={paths as any}
            showBackComponent={false}
            goBack={goBack}
            backLabel={isUsersDetailPath ? paths[0].description : paths[1].description}
          />
        </Grid>
        <Grid item xs={12}>
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('userEdit.editRegistryForm.title')}
            mbTitle={5}
          />
        </Grid>
        <Grid item xs={12}>
          {user ? (
            <EditUserRegistryForm
              party={party}
              user={{
                id: user.id,
                taxCode: user.taxCode,
                name: user.name,
                surname: user.surname,
                email: user.email,
                certifiedName: user.certifiedName,
                certifiedSurname: user.certifiedSurname,
                certifiedMail: user.certifiedMail,
                confirmEmail: '',
              }}
              goBack={goBack}
            />
          ) : (
            t('userEdit.editRegistryForm.errors.userNotFind')
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withUserRegistry(EditUserRegistryPage);
