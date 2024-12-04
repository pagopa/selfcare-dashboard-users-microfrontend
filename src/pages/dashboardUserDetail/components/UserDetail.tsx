import AddIcon from '@mui/icons-material/Add';
import { Grid, Tooltip, Typography, styled } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Party } from '../../../model/Party';
import { PartyUserDetail } from '../../../model/PartyUser';
import { ProductsMap } from '../../../model/Product';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import { ENV } from '../../../utils/env';

const CustomStyleCapitolized = styled(Typography)({
  color: 'colorTextPrimary',
  textTransform: 'capitalize',
});

type Props = {
  roleSection: React.ReactNode;
  userInfo: PartyUserDetail;
  party: Party;
  goEdit: () => void;
  productsMap: ProductsMap;
};

const labelStyle = {
  fontSize: 'fontSize',
  fontWeight: 'fontWeightRegular',
  color: 'colorTextPrimary',
  width: '100%',
  wordWrap: 'break-word',
};
const infoStyle = {
  fontSize: 'fontSize',
  fontWeight: 'fontWeightMedium',
  color: 'colorTextPrimary',
};
const truncateText = {
  height: '100%',
  display: 'inline-block',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const titleTooltipMaxCh = 20;

export default function UserDetail({ roleSection, userInfo, party }: Readonly<Props>) {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Grid container xs={12} m={2}>
      {/* Name */}
      <Grid item xs={12} sm={3}>
        <Typography sx={labelStyle}>{t('userDetail.name')}</Typography>
      </Grid>
      <Grid item xs={12} sm={9} display="flex" alignItems="center">
        <Tooltip
          title={userInfo.name.length > titleTooltipMaxCh ? userInfo.name.toLocaleLowerCase() : ''}
          placement="top"
          arrow={true}
        >
          <CustomStyleCapitolized sx={{ ...infoStyle, ...truncateText, pb: { xs: 2, sm: 1 } }}>
            {userInfo.name.toLocaleLowerCase()}
          </CustomStyleCapitolized>
        </Tooltip>
      </Grid>

      {/* Surname */}
      <Grid item xs={12} sm={3}>
        <Typography sx={labelStyle}>{t('userDetail.surname')}</Typography>
      </Grid>
      <Grid item xs={12} sm={9} display="flex" alignItems="center">
        <Tooltip
          title={
            userInfo.surname.length > titleTooltipMaxCh ? userInfo.surname.toLocaleLowerCase() : ''
          }
          placement="top"
          arrow={true}
        >
          <CustomStyleCapitolized sx={{ ...infoStyle, ...truncateText, pb: { xs: 2, sm: 1 } }}>
            {userInfo.surname.toLocaleLowerCase()}
          </CustomStyleCapitolized>
        </Tooltip>
      </Grid>

      {/* Tax Code */}
      <Grid item xs={12} sm={3}>
        <Typography sx={labelStyle}>{t('userDetail.fiscalCode')}</Typography>
      </Grid>
      <Grid item xs={12} sm={9} display="flex" alignItems="center">
        <Typography sx={{ ...infoStyle, pb: { xs: 2, sm: 1 } }}>{userInfo.taxCode}</Typography>
      </Grid>

      {/* Email */}
      <Grid item xs={12} sm={3}>
        <Typography sx={labelStyle}>{t('userDetail.institutionalEmail')}</Typography>
      </Grid>
      <Grid item xs={12} sm={9} display="flex" alignItems="center">
        <Typography sx={{ ...infoStyle, ...truncateText, color: 'colorTextPrimary' }}>
          {userInfo?.email ?? '-'}
        </Typography>
      </Grid>

      {/* Phone */}
      {ENV.ENABLE_MOBILE_PHONE && (
        <>
          <Grid item xs={12} sm={3} mt={1}>
            <Typography sx={labelStyle}>{t('userDetail.mobilePhone')}</Typography>
          </Grid>
          <Grid item xs={12} sm={9} display="flex" alignItems="center" mt={1}>
            {!userInfo.mobilePhone && userInfo.isCurrentUser ? (
              <ButtonNaked
                onClick={() =>
                  history.push(
                    resolvePathVariables(
                      DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.EDIT_USER.path,
                      {
                        partyId: party.partyId,
                        userId: userInfo.id,
                      }
                    ) + '?activeField=mobilePhone'
                  )
                }
                startIcon={<AddIcon />}
                color="primary"
              >
                {t('userDetail.addNumber')}
              </ButtonNaked>
            ) : (
              <Typography sx={{ ...infoStyle }}>{userInfo?.mobilePhone ?? '-'}</Typography>
            )}
          </Grid>
        </>
      )}
      {roleSection && (
        <Grid container item xs={12} alignContent="center" alignItems="center">
          {roleSection}
        </Grid>
      )}
    </Grid>
  );
}
