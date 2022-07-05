import { Grid, Tab, Tabs, Button } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import React, { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { HashLink } from 'react-router-hash-link';
import useScrollSpy from 'react-use-scrollspy';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import { Party } from '../../../model/Party';
import { DASHBOARD_USERS_ROUTES } from '../../../routes';
import UsersProductSection from '../components/UsersProductSection';
import { UsersTableFiltersConfig } from '../components/UsersTableActions/UsersTableFilters';
import UserTableNoData from '../components/UserTableNoData';
import { ProductRole, ProductsRolesMap } from '../../../model/ProductRole';
import { ENV } from '../../../utils/env';
import { Product, ProductsMap } from '../../../model/Product';
import UsersTableActionsContainer from '../components/UsersTableActionsContainer';

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
export type ProductRolesGroupByTitle = { [title: string]: Array<ProductRole> };

function UsersPage({ party, activeProducts, productsMap, productsRolesMap }: Props) {
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

  const [productsFetchStatus, setProductsFetchStatus] = useState<
    Record<string, { loading: boolean; noData: boolean }>
  >(() =>
    Object.fromEntries(activeProducts.map((p) => [[p.id], { loading: true, noData: false }]))
  );

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

  const prodSectionRefs = useMemo(
    () => activeProducts.map((_) => React.createRef<HTMLDivElement>()),
    [activeProducts]
  );

  const activeSection = useScrollSpy({ sectionElementRefs: prodSectionRefs, offsetPx: -80 });

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };
  const moretThanOneActiveProduct = activeProducts.length > 1;
  return (
    <Grid container px={2} mt={10} sx={{ backgroundColor: 'transparent !important' }}>
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
      <Grid item xs={12} mt={5} display="flex" justifyContent="flex-end">
        <UsersTableActionsContainer
          filters={filters}
          loading={loading}
          party={party}
          productsRolesMap={productsRolesMap}
          activeProducts={activeProducts}
          setFilters={setFilters}
          emptyFilters={emptyFilters}
        />
      </Grid>

      {moretThanOneActiveProduct && (
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
          <Tabs variant="fullWidth" scrollButtons="auto" value={activeSection}>
            {activeProducts.map((p, i) => (
              <Tab
                key={p.id}
                label={p.title}
                component={HashLink}
                to={`#${p.id}`}
                value={i}
                scroll={scrollWithOffset}
              />
            ))}
          </Tabs>
        </Grid>
      )}

      <Grid item xs={12} sx={{ height: '100%' }}>
        <Grid
          container
          direction="row"
          alignItems={'center'}
          mt={moretThanOneActiveProduct ? 0 : 5}
        >
          {activeProducts.map((p, i) => (
            <Grid key={p.id} item xs={12} ref={prodSectionRefs[i]}>
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
              />
            </Grid>
          ))}
          {!loading && noData && <UserTableNoData removeFilters={() => setFilters(emptyFilters)} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UsersPage;
