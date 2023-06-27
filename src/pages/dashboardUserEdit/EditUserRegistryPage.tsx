import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { PeopleAlt } from '@mui/icons-material';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import withUserRegistry, { withUserRegistryProps } from '../../decorators/withUserRegistry';
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

  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
            partyId: party.partyId,
          })
        ),
      icon: PeopleAlt,
    },
    {
      description: `${user.name} ${user.surname}`,
      onClick: () =>
        history.push(
          resolvePathVariables(
            DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
            {
              partyId: party.partyId,
              userId: user.id,
            }
          )
        ),
    },
    {
      description: t('userPagesPath.editUser'),
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
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar paths={paths} showBackComponent={true} goBack={goBack} />
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
