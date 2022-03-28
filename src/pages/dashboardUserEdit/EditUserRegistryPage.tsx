import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import ProductNavigationBar from '../../components/ProductNavigationBar';
import { DASHBOARD_USERS_ROUTES } from '../../routes';
import withUserDetail, { withUserDetailProps } from '../../decorators/withUserDetail';
import EditUserRegistryForm from './components/EditUserRegistryForm';

type Props = withUserDetailProps;

function EditUserRegistryPage({ party, partyUser }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path, {
        institutionId: party.institutionId,
        userId: partyUser.id,
      })
    );
  const paths = [
    {
      description: t('userPagesPath.detailRedirect'),
      onClick: () =>
        history.push(
          resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_USERS.path, {
            institutionId: party.institutionId,
          })
        ),
    },
    {
      description: `${partyUser.name} ${partyUser.surname}`,
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
        <TitleBox
          title={t('userEdit.editRegistryForm.title')}
          subTitle={t('userEdit.editRegistryForm.subTitle')}
        />
      </Grid>
      <Grid item xs={12}>
        {partyUser ? (
          <EditUserRegistryForm party={party} user={partyUser} goBack={goBack} />
        ) : (
          t('userEdit.editRegistryForm.errors.userNotFind')
        )}
      </Grid>
    </Grid>
  );
}

export default withUserDetail(EditUserRegistryPage);
