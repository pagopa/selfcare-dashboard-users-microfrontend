import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Alert, Button, Grid, Stack, Tab, Tabs } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/lib/hooks/useUnloadEventInterceptor';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Party } from '../../../model/Party';
import { Product, ProductsMap } from '../../../model/Product';
import { ProductsRolesMap } from '../../../model/ProductRole';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import { ENV } from '../../../utils/env';
import MobileFilter from '../components/MobileFilter';
import UserTableNoData from '../components/UserTableNoData';
import UsersProductSection from '../components/UsersProductSection';
import UsersTableActions from '../components/UsersTableActions/UsersTableActions';
import { UsersTableFiltersConfig } from '../components/UsersTableActions/UsersTableFilters';

interface Props {
  party: Party;
  activeProducts: Array<Product>;
  productsMap: ProductsMap;
  productsRolesMap: ProductsRolesMap;
}

const emptyFilters: UsersTableFiltersConfig = {
  productIds: [],
  productRoles: [],
};

// eslint-disable-next-line sonarjs/cognitive-complexity
function UsersPage({ party, activeProducts, productsMap, productsRolesMap }: Readonly<Props>) {
  const selectedProductSection =
    window.location.hash !== ''
      ? window.location.hash.substring(1).replace(/[^a-zA-Z0-9-_]/g, '')
      : undefined;

  const { getAllProductsWithPermission, hasPermission } = usePermissions();
  const activeProductsWithReadPermission = activeProducts.filter((p: Product) =>
    hasPermission(p.id, Actions.ListProductUsers)
  );

  const selectedProducts = activeProductsWithReadPermission.filter(
    (p: Product) => !selectedProductSection || p.id === selectedProductSection
  );

  const [filters, setFilters] = useState<UsersTableFiltersConfig>(emptyFilters);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDialogMobile, setOpenDialogMobile] = useState<boolean>(false);
  const [searchByName, setSearchByName] = useState<string>('');
  const [disableRemoveFiltersButton, setDisableRemoveFiltersButton] = useState<boolean>(true);

  const { t } = useTranslation();
  const history = useHistory();
  const onExit = useUnloadEventOnExit();
  const isMobile = useIsMobile('md');

  const canSeeUsers = getAllProductsWithPermission(Actions.ListActiveProducts).length > 0;
  const canAddUser = getAllProductsWithPermission(Actions.ManageProductUsers).length > 0;

  const addUserUrl = resolvePathVariables(
    DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.ADD_PARTY_USER.path,
    { partyId: party.partyId }
  );

  const initProductFetchStatus = () =>
    Object.fromEntries(selectedProducts.map((p) => [[p.id], { loading: true, noData: false }]));
  const [productsFetchStatus, setProductsFetchStatus] =
    useState<Record<string, { loading: boolean; noData: boolean }>>(initProductFetchStatus);

  useEffect(() => {
    setFilters(emptyFilters);
    // setSearchByName('');
    setProductsFetchStatus(initProductFetchStatus);
  }, [selectedProductSection]);

  useEffect(() => {
    if (!canSeeUsers) {
      history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId: party.partyId }));
    }
  }, [party.partyId, canSeeUsers]);

  useEffect(() => {
    if (productsFetchStatus) {
      setLoading(!!Object.values(productsFetchStatus).find((p) => p.loading));
      setNoData(!Object.values(productsFetchStatus).find((p) => !p.noData));
    }
  }, [productsFetchStatus]);

  useEffect(() => trackEvent('USER_LIST', { party_id: party.partyId }), [party]);

  const setSelectedProductSection = (productId?: string) =>
    // eslint-disable-next-line functional/immutable-data
    (window.location.hash = productId ?? '');

  const isPnpg = !!selectedProducts.find((p) => p.id === 'prod-pn-pg');
  const isPnpgTheOnlyProduct =
    !!selectedProducts.find((p) => p.id === 'prod-pn-pg') && selectedProducts.length === 1;

  const mappedProducts = (p: Product) => (
    <Grid key={p.id} item xs={12}>
      <UsersProductSection
        hideProductWhenLoading={true}
        party={party}
        product={p}
        selected={p.id === selectedProductSection}
        productsMap={productsMap}
        filters={filters}
        productsRolesMap={productsRolesMap}
        onFetchStatusUpdate={(loading, noData) => {
          setProductsFetchStatus((previousState) => ({
            ...previousState,
            [p.id]: { loading, noData },
          }));
        }}
        incrementalLoad={!selectedProductSection}
        isPnpgTheOnlyProduct={isPnpgTheOnlyProduct}
        searchByName={searchByName}
      />
    </Grid>
  );

  const productsSection = useMemo(
    () => selectedProducts.map(mappedProducts),
    [selectedProductSection, filters]
  );

  const moreThanOneActiveProduct = activeProductsWithReadPermission.length > 1;

  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  return (
    <div style={{ width: '100%' }}>
      <Grid container p={3} sx={{ backgroundColor: '#F5F5F5' }}>
        <Grid container item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={9} alignItems="flex-end">
            <TitleBox
              variantTitle="h4"
              variantSubTitle="body1"
              title={t('usersPage.title')}
              subTitle={
                !isPnpg
                  ? t('usersPage.generic.subTitle')
                  : t('usersPage.pnpg.subTitle', { businessName: party.description })
              }
              mbTitle={2}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            flexDirection={isMobile ? 'row-reverse' : 'row'}
            mt={isMobile ? 3 : 5}
            display="flex"
            justifyContent="flex-end"
          >
            <Stack>
              <Button
                variant="contained"
                sx={{ height: '48px', width: '163px' }}
                onClick={() => onExit(() => history.push(addUserUrl))}
                disabled={!canAddUser}
              >
                {t('usersTable.addButton')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {ENV.ENABLE_MOBILE_PHONE && (
          <Grid item xs={12}>
            <Alert
              sx={{ mt: 5 }}
              severity="info"
              variant="standard"
              action={
                <ButtonNaked
                  component={Button}
                  onClick={() =>
                    history.push(
                      resolvePathVariables(
                        DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.EDIT_USER.path,
                        {
                          partyId: party.partyId,
                          userId: storageUserOps.read()?.uid ?? '',
                        }
                      ) + '?activeField=mobilePhone'
                    )
                  }
                  color="primary"
                  sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightBold' }}
                >
                  {t('usersPage.customAlert.button')}
                </ButtonNaked>
              }
            >
              {t('usersPage.customAlert.message')}
            </Alert>
          </Grid>
        )}
        <MobileFilter
          loading={loading}
          activeProducts={activeProductsWithReadPermission}
          filters={filters}
          openDialogMobile={openDialogMobile}
          party={party}
          productsRolesMap={productsRolesMap}
          selectedProductSection={selectedProductSection}
          setFilters={setFilters}
          setOpenDialogMobile={setOpenDialogMobile}
          searchByName={searchByName}
          setSearchByName={setSearchByName}
          disableRemoveFiltersButton={disableRemoveFiltersButton}
          setDisableRemoveFiltersButton={setDisableRemoveFiltersButton}
        />
        {isMobile ? (
          <Grid item mt={isMobile ? 3 : 0}>
            <ButtonNaked
              color="primary"
              onClick={() => setOpenDialogMobile(true)}
              startIcon={<FilterAltIcon />}
            >
              {t('usersTable.filterRole.addFilters')}
            </ButtonNaked>
          </Grid>
        ) : (
          <UsersTableActions
            disableFilters={loading}
            loading={loading}
            party={party}
            products={activeProductsWithReadPermission}
            productsRolesMap={
              selectedProductSection && !dangerousKeys.includes(selectedProductSection)
                ? { [selectedProductSection]: productsRolesMap[selectedProductSection] }
                : productsRolesMap
            }
            filters={filters}
            onFiltersChange={setFilters}
            showSelcRoleGrouped={isPnpg ? false : !selectedProductSection}
            setOpenDialogMobile={setOpenDialogMobile}
            searchByName={searchByName}
            setSearchByName={setSearchByName}
            disableRemoveFiltersButton={disableRemoveFiltersButton}
            setDisableRemoveFiltersButton={setDisableRemoveFiltersButton}
          />
        )}
        {moreThanOneActiveProduct && (
          <Grid
            item
            xs={12}
            mt={isMobile ? 2 : 5}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              backgroundColor: '#F5F5F5',
            }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={selectedProductSection ?? 'all'}
              sx={{
                '& .MuiTab-root': {
                  minWidth: 0,
                  flex: '1 0 auto',
                  maxWidth: 'none',
                },
              }}
            >
              <Tab
                label={t('usersTable.tabAll')}
                value="all"
                onClick={() => {
                  setSelectedProductSection();
                }}
              />
              {activeProductsWithReadPermission.map((p) => (
                <Tab
                  key={p.id}
                  label={p.title}
                  value={p.id}
                  onClick={() => {
                    setSelectedProductSection(p.id);
                  }}
                />
              ))}
            </Tabs>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: '#EEEEEE',
            px: isPnpgTheOnlyProduct ? 0 : 3,
            pb: isPnpgTheOnlyProduct ? 0 : 3,
          }}
          mt={moreThanOneActiveProduct ? 0 : 5}
        >
          <Grid container direction="row" alignItems={'center'}>
            {productsSection}
            {!loading && noData && (
              <UserTableNoData
                removeFilters={() => {
                  setFilters(emptyFilters);
                  setSearchByName('');
                  setDisableRemoveFiltersButton(false);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default UsersPage;
