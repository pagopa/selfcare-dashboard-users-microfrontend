import { Grid } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import withUserRegistry, { withUserRegistryProps } from '../../decorators/withUserRegistry';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import EditUserRegistryForm from './components/EditUserRegistryForm';

type Props = withUserRegistryProps;

function EditUserRegistryPage({ party, user }: Readonly<Props>) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBackToUserDetail = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        partyId: party.partyId,
        userId: user.id,
      })
    );

  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent={'center'}
      px={3}
      mt={3}

    >
      <Grid container item xs={12} lg={8}>
        <Grid item xs={12} mb={2}>
          <ProductNavigationBar
            showBackComponent={true}
            goBack={goBackToUserDetail}
            backLabel={t('userPagesPath.exit')}
            colorBackComponent="primary.main"
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
                mobilePhone: user.mobilePhone,
                certifiedName: user.certifiedName,
                certifiedSurname: user.certifiedSurname,
                certifiedMail: user.certifiedMail,
                confirmEmail: '',
              }}
              goBack={goBackToUserDetail}
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
