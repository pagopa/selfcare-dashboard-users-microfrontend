import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import withUserRegistry, { withUserRegistryProps } from '../../decorators/withUserRegistry';
import EditUserRegistryForm from './components/EditUserRegistryForm';

type Props = withUserRegistryProps;

function EditUserRegistryPage({ party, user }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        userId: user.id,
        partyId: party.partyId,
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
      onClick: goBack,
    },
    {
      description: t('userPagesPath.editUser'),
    },
  ];

  return (
    <Grid
      container
      alignItems={'center'}
      px={2}
      mt={10}
      sx={{ width: '985px', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} />
      </Grid>
      <Grid item xs={12} mb={9}>
        <TitleBox variantTitle="h4" title={t('userEdit.editRegistryForm.title')} />
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
  );
}

export default withUserRegistry(EditUserRegistryPage);
