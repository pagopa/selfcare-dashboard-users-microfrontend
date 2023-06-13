import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import { DataGrid, GridColDef, GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import React from 'react';
import { CustomPagination } from '@pagopa/selfcare-common-frontend';
import { Page } from '@pagopa/selfcare-common-frontend/model/Page';
import { Product } from '../../../../../model/Product';
import { PartyProductUser } from '../../../../../model/PartyUser';
import { Party, UserStatus } from '../../../../../model/Party';
import { ProductRolesLists } from '../../../../../model/ProductRole';
import { buildColumnDefs } from './UserProductTableColumns';
import UserProductLoading from './UserProductLoading';
import UserTableLoadMoreData from './UserProductLoadMoreData';

const rowHeight = 64;
const headerHeight = 56;

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
  '.MuiDataGrid-columnSeparator': { display: 'none' },
  '.MuiDataGrid-cell ': { padding: '0px', borderBottom: 'none' },
  '.MuiDataGrid-columnHeaders': { borderBottom: 'none' },
  '.MuiDataGrid-row': {
    backgroundColor: 'white',
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      '&:hover': { backgroundColor: 'transparent' },
    },
    '&:hover': {
      backgroundColor: 'rgba(23, 50, 77, 0.04)',
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
}: UsersTableProps) {
  const sortSplitted = sort && sort !== '' ? sort.split(',') : undefined;
  const columns: Array<GridColDef> = buildColumnDefs(product, onRowClick, productRolesLists);

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
          columns={columns}
          rowHeight={users.length === 0 && loading ? 0 : rowHeight}
          headerHeight={headerHeight}
          hideFooterSelectedRowCount={true}
          components={{
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
