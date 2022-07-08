import { Button, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import useUserNotify from '@pagopa/selfcare-common-frontend/hooks/useUserNotify';
import { useEffect, useState } from 'react';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import { Trans, useTranslation } from 'react-i18next';
import UserDetail from '../components/UserDetail';
import { PartyUserDetail, PartyUserProduct } from '../../../model/PartyUser';
import UserProductRoles from '../components/UserProductRoles';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import ProductNavigationBar from '../../../components/ProductNavigationBar';
import withUserDetail from '../../../decorators/withUserDetail';
import { LOADING_TASK_UPDATE_PARTY_USER_STATUS } from '../../../utils/constants';
import { Product, ProductsMap } from '../../../model/Product';
import UserProductGroups from '../components/UserProductGroups';
import { Party } from '../../../model/Party';
import { ProductRolesLists } from '../../../model/ProductRole';
import { deletePartyUser } from './../../../services/usersService';

type Props = {
  party: Party;
  selectedProduct: Product;
  partyUser: PartyUserDetail;
  fetchPartyUser: () => void;
  productsMap: ProductsMap;
  productRolesList: ProductRolesLists;
};

function UserProductDetailPage({
  selectedProduct,
  partyUser,
  fetchPartyUser,
  productRolesList,
  party,
  productsMap,
}: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const setLoading = useLoading(LOADING_TASK_UPDATE_PARTY_USER_STATUS);
  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const [userProduct, setUserProduct] = useState<PartyUserProduct>();
  const canEdit = selectedProduct.userRole === 'ADMIN' && selectedProduct.status === 'ACTIVE';

  useEffect(() => {
    const userProduct = partyUser.products.find((product) => product.id === selectedProduct.id);
    setUserProduct(userProduct);
    if (!userProduct) {
      history.push(
        resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.path, {
          partyId: party.partyId,
          productId: selectedProduct.id,
        })
      );
    }
  }, [partyUser]);

  const onDelete = () => {
    setLoading(true);
    deletePartyUser(
      party,
      partyUser,
      userProduct as PartyUserProduct,
      (userProduct as PartyUserProduct).roles[0]
    )
      .then((_) => {
        goBack();
        addNotify({
          component: 'Toast',
          id: 'DELETE_PARTY_USER_PRODUCT',
          title: t('userDetail.actions.delete.userDelete'),
          message: '',
        });
      })
      .catch((reason) =>
        addError({
          id: `DELETE_PARTY_USER_PRODUCT_ERROR-${partyUser.id}`,
          blocking: false,
          error: reason,
          displayableTitle: t('userDetail.actions.delete.userDeleteError'),
          displayableDescription: '',
          techDescription: `Something gone wrong while deleting role ${
            (userProduct as PartyUserProduct).roles[0].relationshipId
          } for product ${(userProduct as PartyUserProduct).title}`,
          toNotify: true,
        })
      )
      .finally(() => setLoading(false));
  };

  const handleOpenDelete = () => {
    addNotify({
      component: 'SessionModal',
      id: 'PRODUCT_USER_DELETE_MODAL',
      title: t('userDetail.actions.deleteProductUserModal.title'),
      message: (
        <Trans i18nKey="userDetail.actions.deleteProductUserModal.message">
          {'Stai per eliminare '}
          <strong style={{ textTransform: 'capitalize' }}>
            {{ user: party && `${partyUser.name.toLocaleLowerCase()} ${partyUser.surname}` }}
          </strong>
          {'.'}
          <br />
          {'Vuoi continuare?'}
        </Trans>
      ),
      confirmLabel: t('userDetail.actions.deleteProductUserModal.confirmButton'),
      closeLabel: t('userDetail.actions.deleteProductUserModal.closeButton'),
      onConfirm: onDelete,
    });
  };

  const goEdit = () =>
    history.push(
      resolvePathVariables(
        DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.EDIT_PARTY_PRODUCT_USER.path,
        {
          partyId: party.partyId,
          userId: partyUser.id,
          productId: selectedProduct.id,
        }
      )
    );

  const goBack = () =>
    history.push(
      resolvePathVariables(DASHBOARD_USERS_ROUTES.PARTY_PRODUCT_USERS.subRoutes.MAIN.path, {
        partyId: party.partyId,
        productId: selectedProduct.id,
      })
    );

  const paths = [
    {
      description: t('userDetail.pathDescription'),
      onClick: goBack,
    },
    {
      description: partyUser.name + ' ' + partyUser.surname,
    },
  ];
  const isProductDetailPage = true;

  return userProduct ? (
    <Grid
      item
      xs={8}
      container
      alignItems={'center'}
      px={2}
      mt={10}
      sx={{ width: '100%', backgroundColor: 'transparent !important' }}
    >
      <Grid item xs={12} mb={3}>
        <ProductNavigationBar paths={paths} selectedProduct={selectedProduct} />
      </Grid>
      <Grid container item mb={4}>
        <Grid item xs={10}>
          <Typography variant="h4">{t('userDetail.title')}</Typography>
        </Grid>
        {partyUser.products.find((p) => productsMap[p.id]?.userRole === 'ADMIN') && (
          <Grid item xs={2} display="flex" justifyContent="flex-end" alignItems="flex-start">
            <Button
              disabled={partyUser.status === 'SUSPENDED'}
              disableRipple
              variant="outlined"
              sx={{ height: '40px' }}
              onClick={goEdit}
            >
              {t('userDetail.editButton')}
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid sx={{ backgroundColor: 'background.paper', padding: 3 }}>
        <Grid container item sx={{ backgroundColor: 'background.paper', padding: 3 }}>
          <Grid item xs={12}>
            <UserDetail
              productsMap={productsMap}
              // party={party}
              userInfo={partyUser}
              roleSection={<></>}
              goEdit={goEdit}
            />
          </Grid>
        </Grid>

        <Grid item xs={10} mb={4}>
          <UserProductRoles
            showActions={true}
            party={party}
            user={partyUser}
            fetchPartyUser={fetchPartyUser}
            userProduct={userProduct}
            product={selectedProduct}
            productRolesList={productRolesList}
            canEdit={canEdit}
            isProductDetailPage={isProductDetailPage}
          />
        </Grid>
        <Grid container item xs={10} mt={3}>
          <UserProductGroups
            party={party}
            user={partyUser}
            product={selectedProduct}
            canEdit={canEdit}
          />
        </Grid>
      </Grid>
      <Grid container item my={10} spacing={2}>
        <Grid item xs={2}>
          <Button
            disableRipple
            variant="outlined"
            sx={{ height: '40px', width: '100%' }}
            onClick={goBack}
          >
            {t('userDetail.backButton')}
          </Button>
        </Grid>
        {userProduct.roles.length === 1 && !partyUser.isCurrentUser && canEdit && (
          <Grid item xs={2}>
            <Button
              disableRipple
              variant="outlined"
              sx={{
                height: '40px',
                width: '100%',
                color: '#C02927',
                borderColor: '#C02927',
                '&:hover': { borderColor: '#C02927', backgroundColor: 'transparent' },
              }}
              onClick={handleOpenDelete}
            >
              {t('userDetail.deleteButton')}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default withUserDetail(UserProductDetailPage);
