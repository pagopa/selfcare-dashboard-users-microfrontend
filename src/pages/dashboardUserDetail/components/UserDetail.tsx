import { Grid, Tooltip, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PartyUserDetail } from '../../../model/PartyUser';
import { ProductsMap } from '../../../model/Product';

const CustomStyleCapitolized = styled(Typography)({
  color: 'colorTextPrimary',
  textTransform: 'capitalize',
});

type Props = {
  roleSection: React.ReactNode;
  userInfo: PartyUserDetail;
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

export default function UserDetail({ roleSection, userInfo }: Props) {
  const { t } = useTranslation();
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
        <Tooltip
          title={
            userInfo?.email?.length > titleTooltipMaxCh ? userInfo?.email?.toLocaleLowerCase() : ''
          }
          placement="top"
          arrow={true}
        >
          <Typography sx={{ ...infoStyle, ...truncateText, color: 'colorTextPrimary' }}>
            {userInfo?.email ?? '-'}
          </Typography>
        </Tooltip>
      </Grid>

      {roleSection && (
        <Grid container item xs={12} alignContent="center" alignItems="center">
          {roleSection}
        </Grid>
      )}
    </Grid>
  );
}
