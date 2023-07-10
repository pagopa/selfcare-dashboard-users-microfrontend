import { Grid, Typography, styled, Tooltip } from '@mui/material';
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
    <Grid container spacing={1} xs={12} m={2}>
      {/* name */}
      <Grid item xs={3}>
        <Typography sx={labelStyle}>{t('userDetail.name')}</Typography>
      </Grid>
      <Grid item xs={9} display="flex" alignItems={'center'}>
        <Tooltip
          title={userInfo.name.length > titleTooltipMaxCh ? userInfo.name.toLocaleLowerCase() : ''}
          placement="top"
          arrow={true}
        >
          <CustomStyleCapitolized sx={{ ...infoStyle, ...truncateText }}>
            {userInfo.name.toLocaleLowerCase()}
          </CustomStyleCapitolized>
        </Tooltip>
      </Grid>
      {/* surname */}
      <Grid item xs={3}>
        <Typography sx={labelStyle}>{t('userDetail.surname')}</Typography>
      </Grid>
      <Grid item xs={9} display="flex" alignItems={'center'}>
        <Tooltip
          title={
            userInfo.surname.length > titleTooltipMaxCh ? userInfo.surname.toLocaleLowerCase() : ''
          }
          placement="top"
          arrow={true}
        >
          <CustomStyleCapitolized sx={{ ...infoStyle, ...truncateText }}>
            {userInfo.surname.toLocaleLowerCase()}
          </CustomStyleCapitolized>
        </Tooltip>
      </Grid>
      {/* taxcode */}
      <Grid item xs={3}>
        <Typography sx={labelStyle}>{t('userDetail.fiscalCode')}</Typography>
      </Grid>
      <Grid item xs={9} display="flex" alignItems={'center'}>
        <Typography sx={{ ...infoStyle, ...labelStyle, color: 'colorTextPrimary' }}>
          {userInfo.taxCode}
        </Typography>
      </Grid>
      {/* email */}
      <Grid item xs={3}>
        <Typography sx={labelStyle}>{t('userDetail.institutionalEmail')}</Typography>
      </Grid>
      <Grid item xs={9} display="flex" alignItems={'center'}>
        <Tooltip
          title={
            userInfo.email?.length > titleTooltipMaxCh ? userInfo.email.toLocaleLowerCase() : ''
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
        <Grid container item alignContent="center" alignItems={'center'}>
          {roleSection}
        </Grid>
      )}
    </Grid>
  );
}
