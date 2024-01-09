import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import SessionModal from '@pagopa/selfcare-common-frontend/components/SessionModal';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { roleLabels } from '@pagopa/selfcare-common-frontend/utils/constants';
import { ButtonNaked } from '@pagopa/mui-italia';
import AddIcon from '@mui/icons-material/Add';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { Party } from '../../../model/Party';
import { PartyUserDetail, PartyUserProduct } from '../../../model/PartyUser';
import { Product } from '../../../model/Product';
import { ProductRole, ProductRolesLists } from '../../../model/ProductRole';
import { addUserProductRoles } from '../../../services/usersService';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';

type Props = {
  party: Party;
  user: PartyUserDetail;
  fetchPartyUser: () => void;
  userProduct: PartyUserProduct;
  product: Product;
  productRolesList: ProductRolesLists;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function UserProductAddRoles({
  party,
  user,
  userProduct,
  product,
  fetchPartyUser,
  productRolesList,
}: Props) {
  const { t } = useTranslation();
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const [selectedRoles, setSelectedRoles] = useState<Array<string>>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedRoles(userProduct.roles.map((r) => r.role));
  }, [userProduct.roles]);

  const onAddMultiRole = () => {
    const newRoleSelected = selectedRoles.filter(
      (r) => !userProduct.roles.find((ur) => ur.role === r)
    );

    setOpen(false);
    setLoading(true);
    addUserProductRoles(party, product, user.id, {
      ...user,
      productRoles: newRoleSelected ?? [],
      confirmEmail: user.email,
      certifiedName: false,
      certifiedSurname: false,
      certifiedMail: false,
    })
      .then((_) => {
        trackEvent('USER_ADD_ROLE', {
          party_id: party.partyId,
          product_id: product.id,
          product_role: newRoleSelected,
        });
        addNotify({
          component: 'Toast',
          id: 'ADD_MULTI_ROLE_USER',
          title: t('userDetail.actions.successfulAddRole'),
          message: '',
        });
        fetchPartyUser();
      })
      .catch((error) => {
        addError({
          component: 'Toast',
          id: `ADD_MULTI_ROLE_USER_ERROR-${user.id}`,
          displayableTitle: t('userDetail.actions.addRoleError'),
          displayableDescription: '',
          techDescription: `An error occurred while add role`,
          blocking: false,
          error,
          toNotify: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const selcRoleProductRoleList = productRolesList.groupBySelcRole[userProduct.roles[0].selcRole];
  const initialRolesMap = useMemo(
    () =>
      userProduct.roles.reduce((acc: any, r) => {
        // eslint-disable-next-line functional/immutable-data
        acc[r.role] = true;
        return acc;
      }, {}),
    [userProduct.roles]
  );

  const orderedRolesList = useMemo(
    () =>
      selcRoleProductRoleList.slice().sort((a: ProductRole, b: ProductRole) => {
        const existA = initialRolesMap[a.productRole];
        const existB = initialRolesMap[b.productRole];
        // eslint-disable-next-line no-bitwise
        if (!(existA ^ existB)) {
          return 0;
        } else if (existA) {
          return -1;
        } else {
          return 1;
        }
      }),
    [productRolesList, userProduct.roles]
  );

  return userProduct.roles.length < selcRoleProductRoleList.length &&
    selcRoleProductRoleList[0].multiroleAllowed ? (
    <Grid container>
      <Grid item xs={3} />
      <Grid item xs={9} mt={3}>
        <ButtonNaked
          component="button"
          onClick={() => {
            setOpen(true);
          }}
          startIcon={<AddIcon fontSize="medium" />}
          sx={{ color: 'primary.main' }}
          weight="default"
        >
          {t('userDetail.actions.newRoleAssign')}
        </ButtonNaked>
        <SessionModal
          open={open}
          title={t('userDetail.actions.newRoleAssignModal.title')}
          message={
            <>
              <Trans
                i18nKey="userDetail.actions.newRoleAssignModal.message"
                values={{
                  user: `${user.name} ${user.surname}`,
                  userRole: `${t(
                    roleLabels[userProduct.roles[0].selcRole].longLabelKey
                  ).toLowerCase()}`,
                  productTitle: `${product.title}:`,
                }}
                components={{ 1: <strong />, 3: <strong />, 5: <strong /> }}
              >
                {`Assegna a <1>{{user}}</1> un altro ruolo <3>{{userRole}}</3> sul prodotto <5>{{productTitle}}</5>`}
              </Trans>

              {Object.values(orderedRolesList).map((p) => {
                const isSelected = (selectedRoles?.indexOf(p.productRole) ?? -1) > -1;
                const isDisabled =
                  (userProduct.roles.map((u) => u.role).indexOf(p.productRole) ?? -1) > -1;
                return (
                  <Box key={p.productRole}>
                    <FormControlLabel
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      checked={isSelected}
                      disabled={isDisabled}
                      value={p.productRole}
                      control={<Checkbox />}
                      label={
                        <>
                          <Typography> {p.title} </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 400,
                              fontSize: '12px',
                              color: '#5C6F82',
                            }}
                          >
                            {p.description}
                          </Typography>
                        </>
                      }
                      onChange={
                        isDisabled
                          ? undefined
                          : () =>
                              setSelectedRoles(
                                isSelected
                                  ? selectedRoles?.filter((s) => s !== p.productRole)
                                  : selectedRoles?.concat([p.productRole])
                              )
                      }
                    />
                  </Box>
                );
              })}
            </>
          }
          onConfirm={onAddMultiRole}
          onConfirmEnabled={selectedRoles.length > userProduct.roles.length}
          handleClose={() => setOpen(false)}
          onConfirmLabel={t('userDetail.actions.newRoleAssignModal.confirmButton')}
          onCloseLabel={t('userDetail.actions.newRoleAssignModal.closeButton')}
        />
      </Grid>
    </Grid>
  ) : (
    <> </>
  );
}
