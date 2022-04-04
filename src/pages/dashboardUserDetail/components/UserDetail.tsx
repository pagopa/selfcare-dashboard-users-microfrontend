import { Button, Grid, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Party } from '../../../model/Party';
import { PartyUserDetail } from '../../../model/PartyUser';
import { ProductsMap } from '../../../model/Product';

const CustomStyleCapitolized = styled(Typography)({
  color: '#000000',
  textTransform: 'capitalize',
});

type Props = {
  party: Party;
  roleSection: React.ReactNode;
  userInfo: PartyUserDetail;
  goEdit: () => void;
  productsMap: ProductsMap;
};

export default function UserDetail({ roleSection, userInfo, party, goEdit, productsMap }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid container item alignContent="center">
              <Grid item xs={3}>
                <Typography variant="h6" className="CustomLabelStyle">
                  {t('userDetail.name')}
                </Typography>
              </Grid>
              <Grid item xs={9} className="userInfoStyle">
                <CustomStyleCapitolized variant="body2">
                  {userInfo.name.toLocaleLowerCase()}
                </CustomStyleCapitolized>
              </Grid>
            </Grid>
            <Grid container item alignContent="center">
              <Grid item xs={3}>
                <Typography variant="h6" className="CustomLabelStyle">
                  {t('userDetail.surname')}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <CustomStyleCapitolized variant="body2">
                  {userInfo.surname.toLocaleLowerCase()}
                </CustomStyleCapitolized>
              </Grid>
            </Grid>
            <Grid container item alignContent="center">
              <Grid item xs={3}>
                <Typography variant="h6" className="CustomLabelStyle">
                  {t('userDetail.fiscalCode')}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body2" className="CustomInfoStyle">
                  {userInfo.taxCode}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item alignContent="center">
              <Grid item xs={3}>
                <Typography variant="h6" className="CustomLabelStyle">
                  {t('userDetail.institutionalEmail')}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body2" className="CustomInfoStyle">
                  {userInfo.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item alignContent="center">
              <Grid item xs={3}>
                <Typography variant="h6" className="CustomLabelStyle">
                  {t('userDetail.institution')}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body2" className="CustomInfoStyle">
                  {party.description}
                </Typography>
              </Grid>
            </Grid>

            <Grid container item alignContent="center">
              {roleSection}
            </Grid>
          </Grid>
        </Grid>
        {userInfo.products.find((p) => productsMap[p.id]?.userRole === 'ADMIN') && (
          <Grid item xs={2}>
            <Button
              disableRipple
              disabled={userInfo.status === 'SUSPENDED'}
              variant="contained"
              sx={{ height: '40px', width: '120px' }}
              onClick={goEdit}
            >
              {t('userDetail.editButton')}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}
