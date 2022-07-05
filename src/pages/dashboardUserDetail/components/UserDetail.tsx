import { Grid, Typography, styled, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PartyUserDetail } from '../../../model/PartyUser';
import { ProductsMap } from '../../../model/Product';

const CustomStyleCapitolized = styled(Typography)({
  color: '#000000',
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
};
const infoStyle = {
  fontSize: 'fontSize',
  fontWeight: 'fontWeightMedium',
  color: 'colorTextPrimary',
};
const truncateText = {
  display: 'inline-block',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export default function UserDetail({ roleSection, userInfo }: Props) {
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid container item alignContent="center">
            <Grid item xs={3}>
              <Typography sx={labelStyle}>{t('userDetail.name')}</Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                height: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflowWrap: 'break-word',
                minWidth: 0,
                maxWidth: 0,
              }}
            >
              <Tooltip title={userInfo.name.length > 20 ? userInfo.name.toLocaleLowerCase() : ''}>
                <CustomStyleCapitolized sx={{ ...infoStyle, ...truncateText }}>
                  {userInfo.name.toLocaleLowerCase()}
                </CustomStyleCapitolized>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container item alignContent="center">
            <Grid item xs={3}>
              <Typography sx={labelStyle}>{t('userDetail.surname')}</Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                height: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflowWrap: 'break-word',
                minWidth: 0,
                maxWidth: 0,
              }}
            >
              <Tooltip
                title={userInfo.surname.length > 20 ? userInfo.surname.toLocaleLowerCase() : ''}
              >
                <CustomStyleCapitolized sx={{ ...infoStyle, ...truncateText }}>
                  {userInfo.surname.toLocaleLowerCase()}
                </CustomStyleCapitolized>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container item alignContent="center">
            <Grid item xs={3}>
              <Typography sx={labelStyle}>{t('userDetail.fiscalCode')}</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography sx={infoStyle}>{userInfo.taxCode}</Typography>
            </Grid>
          </Grid>
          <Grid container item alignContent="center">
            <Grid item xs={3}>
              <Typography sx={labelStyle}>{t('userDetail.institutionalEmail')}</Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                height: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflowWrap: 'break-word',
                minWidth: 0,
                maxWidth: 0,
              }}
            >
              <Tooltip title={userInfo.email.length > 20 ? userInfo.email.toLocaleLowerCase() : ''}>
                <Typography sx={{ ...infoStyle, ...truncateText }}>{userInfo.email}</Typography>
              </Tooltip>
            </Grid>
          </Grid>
          {/* <Grid container item alignContent="center">
            <Grid item xs={3}>
              <Typography 
              >
                {t('userDetail.institution')}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" className="CustomInfoStyle">
                {party.description}
              </Typography>
            </Grid>
          </Grid> */}

          {roleSection && (
            <Grid container item alignContent="center">
              {roleSection}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
