import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, styled, Typography, Chip, Grid, Button } from '@mui/material';
import { DataGrid, GridColDef, GridSortDirection, GridSortModel, GridRow } from '@mui/x-data-grid';
import React from 'react';
import { CustomPagination } from '@pagopa/selfcare-common-frontend';
import { Page } from '@pagopa/selfcare-common-frontend/model/Page';
import { useTranslation } from 'react-i18next';
import { roleLabels, UserRole } from '@pagopa/selfcare-common-frontend/utils/constants';
import { theme } from '@pagopa/mui-italia';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useHistory } from 'react-router-dom';
import { Product } from '../../../../../model/Product';
import { PartyProductUser } from '../../../../../model/PartyUser';
import { Party, UserStatus } from '../../../../../model/Party';
import { ProductRolesLists } from '../../../../../model/ProductRole';
import { useIsMobile } from '../../../../../hooks/useIsMobile';
import { DASHBOARD_USERS_ROUTES } from '../../../../../routes';
import { buildColumnDefs } from './UserProductTableColumns';
import UserProductLoading from './UserProductLoading';
import UserTableLoadMoreData from './UserProductLoadMoreData';

interface UsersTableProps {
  incrementalLoad: boolean;
  loading: boolean;
  noMoreData: boolean;
  party: Party;
  users: Array<PartyProductUser>;
  product: Product;
  productRolesLists: ProductRolesLists;
  fetchPage: (page?: number, size?: number, refetch?: boolean) => void;
  page: Page;
  sort?: string;
  onSortRequest: (sort: string) => void;
  onRowClick: (partyUser: PartyProductUser) => void;
  onDelete: (partyUser: PartyProductUser) => void;
  onStatusUpdate: (partyUser: PartyProductUser, nextStatus: UserStatus) => void;
}

const CustomDataGrid = styled(DataGrid)({
  border: 'none !important',
  '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within':
    { outline: 'none' },
  '&.MuiDataGrid-root .MuiDataGrid-cell': {
    whiteSpace: 'normal !important',
    wordWrap: 'break-word !important',
    lineHeight: '25px !important',
  },
  '&.MuiDataGrid-columnHeaders': { borderBottom: 'none !important' },
  '.justifyContentBold': {
    fontSize: '16px',
    fontWeight: '600',
    '&>div': {
      display: 'flex !important',
      alignItems: 'center',
    },
  },
  '.MuiDataGrid-virtualScroller': {
    backgroundColor: '#F2F2F2',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '.MuiDataGrid-columnSeparator': { display: 'none' },
  '.MuiDataGrid-cell ': { padding: '0px', borderBottom: 'none' },
  '.MuiDataGrid-columnHeaders': { borderBottom: 'none' },
  '.MuiDataGrid-row': {
    backgroundColor: 'white',
    '&.Mui-selected': {
      backgroundColor: '#ebf4fd',
      '&:hover': { backgroundColor: 'transparent' },
    },
    '&:hover': {
      backgroundColor: '#f6f7f8',
    },
  },
  '.MuiDataGrid-row:first-child': { borderRadius: '4px 4px 0 0' },
  '.MuiDataGrid-row:last-child': { borderRadius: '0 0 4px 4px' },
  '.MuiDataGrid-row:first-child:last-child': {
    borderRadius: '4px',
  },
  '.justifyContentNormal': {
    fontSize: '16px',
    fontWeight: 'normal',
    '&>div': {
      display: 'flex !important',
      alignItems: 'center',
    },
  },
  '.justifyContentNormalRight': {
    fontSize: '16px',
    fontWeight: 'normal',
    '&>div': {
      display: 'flex !important',
      alignItems: 'center',
      justifyContent: 'right',
    },
  },
});

export default function UsersProductTable({
  incrementalLoad,
  loading,
  fetchPage,
  noMoreData,
  product,
  productRolesLists,
  users,
  page,
  sort,
  onSortRequest,
  onRowClick,
  party,
}: UsersTableProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile('lg');
  const history = useHistory();

  const sortSplitted = sort && sort !== '' ? sort.split(',') : undefined;
  const columns: Array<GridColDef> = buildColumnDefs(product, onRowClick, productRolesLists);

  const rowHeight = isMobile ? 250 : 64;
  const headerHeight = isMobile ? 10 : 56;

  return (
    <React.Fragment>
      <Box
        id="UsersSearchTableBox"
        sx={{
          position: 'relative',
          width: '100% !important',
          border: 'none',
        }}
        justifyContent="start"
      >
        <CustomDataGrid
          className="CustomDataGrid"
          autoHeight={true}
          columnBuffer={5}
          rows={users}
          rowCount={Math.max(page?.totalElements ?? 0, users.length)}
          getRowId={(r) => r.id}
          columns={isMobile ? [] : columns}
          rowHeight={users.length === 0 && loading ? 0 : rowHeight}
          headerHeight={headerHeight}
          hideFooterSelectedRowCount={true}
          components={{
            Row: (props) => {
              const user = props.row;
              const userSuspended = user.status === 'SUSPENDED';
              const userRole = user.userRole as UserRole;
              if (isMobile) {
                return (
                  <Box
                    key={user.id}
                    sx={{
                      marginBottom: 2,
                      width: 'calc(100vw - 110px)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      sx={{
                        textAlign: 'start',
                        marginTop: 2,
                        paddingY: 3,
                        width: '100%',
                        height: '100%',
                        justifyItems: '-moz-initial',
                        flexDirection: 'row',
                        backgroundColor: 'background.paper',
                        borderRadius: theme.spacing(2),
                        boxShadow:
                          '0px 8px 10px -5px rgba(0, 43, 85, 0.1), 0px 16px 24px 2px rgba(0, 43, 85, 0.05), 0px 6px 30px 5px rgba(0, 43, 85, 0.1)',
                      }}
                      onClick={() =>
                        history.push(
                          resolvePathVariables(
                            DASHBOARD_USERS_ROUTES.PARTY_USERS.subRoutes.PARTY_USER_DETAIL.path,
                            { partyId: party.partyId, userId: user.id }
                          )
                        )
                      }
                    >
                      <Grid container spacing={2}>
                        <Grid item sx={{ width: '100%' }}>
                          <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                            {t('usersTable.usersProductTableColumns.headerFields.name')}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 'fontSize',
                              fontWeight: 'fontWeightRegular',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                              textTransform: 'capitalize',
                            }}
                          >
                            {`${user.surname} ${user.name}`.toLowerCase()}
                          </Typography>
                        </Grid>

                        <Grid item sx={{ width: '100%' }}>
                          <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                            {t('usersTable.usersProductTableColumns.headerFields.email')}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 'fontSize',
                              fontWeight: 'fontWeightRegular',
                              color: userSuspended ? 'text.disabled' : 'text.primary',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {user.email}
                          </Typography>
                        </Grid>

                        <Grid item sx={{ width: '100%' }}>
                          <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                            {t('usersTable.usersProductTableColumns.headerFields.role')}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 'fontSize',
                              fontWeight: 'fontWeightRegular',
                              color: userSuspended ? 'text.disabled' : 'text.primary',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {t(roleLabels[userRole].longLabelKey)}
                          </Typography>
                        </Grid>
                        {userSuspended && (
                          <Grid item sx={{ width: '100%' }}>
                            <Chip
                              label={t('usersTable.usersProductTableColumns.rows.suspendedChip')}
                              aria-label={'Suspended'}
                              color='warning'
                              sx={{
                                fontSize: '14px',
                                fontWeight: 'fontWeightMedium',
                                paddingBottom: '1px',
                                height: '24px',
                                cursor: 'pointer',
                              }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Button>
                  </Box>
                );
              }
              return <GridRow {...props} />;
            },
            Footer:
              loading || incrementalLoad
                ? () =>
                    loading ? (
                      <UserProductLoading />
                    ) : !noMoreData && !(users.length === page.totalElements) ? (
                      <UserTableLoadMoreData fetchNextPage={fetchPage} />
                    ) : (
                      <></>
                    )
                : undefined,
            Pagination: incrementalLoad
              ? undefined
              : () => (
                  <CustomPagination
                    sort={sort}
                    page={page}
                    onPageRequest={(nextPage) => fetchPage(nextPage.page, nextPage.size)}
                  />
                ),
            NoRowsOverlay: () => <></>,
            NoResultsOverlay: () => <></>,
            ColumnSortedAscendingIcon: () => <ArrowDropUp sx={{ color: '#5C6F82' }} />,
            ColumnSortedDescendingIcon: () => <ArrowDropDown sx={{ color: '#5C6F82' }} />,
          }}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          onSortModelChange={(model: GridSortModel) =>
            onSortRequest(model.map((m) => `${m.field},${m.sort}`)[0] ?? '')
          }
          sortModel={
            sortSplitted
              ? [{ field: sortSplitted[0], sort: sortSplitted[1] as GridSortDirection }]
              : []
          }
        />
      </Box>
    </React.Fragment>
  );
}
