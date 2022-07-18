import { Grid, Tab, Tabs, Button } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { Product, ProductsMap } from '../../../model/Product';
import { Party } from '../../../model/Party';
import UsersTableActions from '../components/UsersTableActions/UsersTableActions';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import UsersProductSection from '../components/UsersProductSection';
import { UsersTableFiltersConfig } from '../components/UsersTableActions/UsersTableFilters';
import UserTableNoData from '../components/UserTableNoData';
import { ProductsRolesMap } from '../../../model/ProductRole';
import { ENV } from '../../../utils/env';

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

function UsersPage({ party, activeProducts, productsMap, productsRolesMap }: Props) {
  const selectedProductSection =
    window.location.hash !== '' ? window.location.hash.substring(1) : undefined;
  const selectedProducts = activeProducts.filter(
    (p: Product) => !selectedProductSection || p.id === selectedProductSection
  );

  const [filters, setFilters] = useState<UsersTableFiltersConfig>(emptyFilters);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const history = useHistory();
  const onExit = useUnloadEventOnExit();
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
    setProductsFetchStatus(initProductFetchStatus);
  }, [selectedProductSection]);

  useEffect(() => {
    if (party.userRole !== 'ADMIN') {
      history.push(resolvePathVariables(ENV.ROUTES.OVERVIEW, { partyId: party.partyId }));
    }
  }, [party.partyId]);

  useEffect(() => {
    if (productsFetchStatus) {
      setLoading(!!Object.values(productsFetchStatus).find((p) => p.loading));
      setNoData(!Object.values(productsFetchStatus).find((p) => !p.noData));
    }
  }, [productsFetchStatus]);

  useEffect(() => trackEvent('USER_LIST', { party_id: party.partyId }), [party]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [!selectedProductSection]);

  const setSelectedProductSection = (productId?: string) =>
    // eslint-disable-next-line functional/immutable-data
    (window.location.hash = productId ?? '');

  const mappedProducts = (p: Product) => (
    <Grid key={p.id} item xs={12}>
      <UsersProductSection
        hideProductWhenLoading={true}
        party={party}
        product={p}
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
      />
    </Grid>
  );

  const productsSection = useMemo(
    () => selectedProducts.map(mappedProducts),
    [selectedProductSection, filters]
  );

  const moreThanOneActiveProduct = activeProducts.length > 1;

  return (
    <div style={{ width: '100%' }}>
      <Grid container p={3} sx={{ backgroundColor: 'transparent !important' }}>
        <Grid item xs={9} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <TitleBox
            variantTitle="h4"
            variantSubTitle="body1"
            title={t('usersPage.title')}
            subTitle={t('usersPage.generic.subTitle')}
            mbTitle={2}
          />
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button
            variant="contained"
            sx={{ height: '40px', width: '163px' }}
            onClick={() => onExit(() => history.push(addUserUrl))}
          >
            {t('usersTable.addButton')}
          </Button>
        </Grid>
        <Grid item xs={12} mt={5}>
          <UsersTableActions
            disableFilters={loading}
            loading={loading}
            party={party}
            products={activeProducts}
            productsRolesMap={
              !selectedProductSection
                ? productsRolesMap
                : { [selectedProductSection]: productsRolesMap[selectedProductSection] }
            }
            filters={filters}
            onFiltersChange={setFilters}
            showSelcRoleGrouped={!selectedProductSection}
          />
        </Grid>
        {moreThanOneActiveProduct && (
          <Grid
            item
            xs={12}
            mt={5}
            sx={{
              borderBottom: 1,
              borderBottomWidth: '2px',
              borderColor: 'divider',
              position: 'sticky',
              top: 0,
              zIndex: 100,
              backgroundColor: '#F5F6F7',
            }}
          >
            <Tabs variant="fullWidth" scrollButtons="auto" value={selectedProductSection ?? 'all'}>
              <Tab
                label={t('usersTable.tabAll')}
                value="all"
                onClick={() => {
                  setSelectedProductSection(undefined);
                }}
              />
              {activeProducts.map((p) => (
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

        <Grid item xs={12} sx={{ backgroundColor: 'background.default', px: 3, pb: 3 }}>
          <Grid
            container
            direction="row"
            alignItems={'center'}
            mt={moreThanOneActiveProduct ? 0 : 5}
          >
            {productsSection}
            {!loading && noData && (
              <UserTableNoData removeFilters={() => setFilters(emptyFilters)} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default UsersPage;
