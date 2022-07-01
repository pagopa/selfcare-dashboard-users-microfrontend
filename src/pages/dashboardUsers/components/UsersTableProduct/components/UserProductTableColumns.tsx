import { Chip, Typography, Grid, IconButton } from '@mui/material';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import React, { CSSProperties, ReactNode } from 'react';
import i18n from '@pagopa/selfcare-common-frontend/locale/locale-utils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/system';
import { PartyProductUser } from '../../../../../model/PartyUser';
import { ProductRolesLists } from '../../../../../model/ProductRole';

import { Product } from '../../../../../model/Product';

export function buildColumnDefs(
  _product: Product,
  onRowClick: (partyUser: PartyProductUser) => void,

  productRolesLists: ProductRolesLists
) {
  return [
    {
      field: 'fullName',
      cellClassName: 'justifyContentBold',
      headerName: i18n.t('usersTable.usersProductTableColumns.headerFields.name'),
      align: 'left',
      headerAlign: 'left',
      width: 275,
      editable: false,
      disableColumnMenu: true,
      valueGetter: getFullName,
      renderHeader: showCustmHeader,
      renderCell: (params) => showName(params, false, onRowClick),
      sortable: false,
      flex: 2,
    },
    {
      field: 'email',
      cellClassName: 'justifyContentNormal',
      headerName: i18n.t('usersTable.usersProductTableColumns.headerFields.email'),
      align: 'left',
      headerAlign: 'left',
      width: 293,
      editable: false,
      disableColumnMenu: true,
      renderHeader: showCustmHeader,
      renderCell: (params) => renderCell(params, undefined, onRowClick),
      sortable: false,
      flex: 2,
    },
    {
      field: 'userRole',
      cellClassName: 'justifyContentBold',
      headerName: i18n.t('usersTable.usersProductTableColumns.headerFields.role'),
      align: 'left',
      headerAlign: 'left',
      width: 250,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => showRoles(params, productRolesLists, onRowClick),
      renderHeader: showCustmHeader,
      sortable: false,
      flex: 2,
    },
    {
      field: 'status',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'center',
      width: 82,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (params) => showStatus(params, onRowClick),
      sortable: false,
      flex: 1,
    },
    {
      field: 'azioni',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'right',
      width: 53,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (p) => showActions(p, onRowClick),
      sortable: false,
      flex: 1,
    },
  ] as Array<GridColDef>;
}

function renderCell(
  params: GridRenderCellParams,
  value: ReactNode = params.value,
  onRowClick?: (partyUser: PartyProductUser) => void,
  overrideStyle: CSSProperties = {}
) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '-16px',
        paddingBottom: '-16px',
        marginTop: '16px',
        borderBottom: '1px solid #CCD4DC',
        cursor: 'pointer',
        ...overrideStyle,
      }}
      onClick={onRowClick ? () => onRowClick(params.row) : undefined}
    >
      <div
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const,
          paddingBottom: '8px',
          width: '100%',
          color: params.row.status === 'SUSPENDED' ? '#9E9E9E' : undefined,
          fontSize: '14px',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function isUserSuspended(user: PartyProductUser): boolean {
  return user.status === 'SUSPENDED' || !user.product.roles?.find((r) => r.status !== 'SUSPENDED');
}

function getFullName(params: GridValueGetterParams) {
  return `${params.row.name} ${params.row.surname} ${params.row.status}`;
}

function showCustmHeader(params: GridColumnHeaderParams) {
  return (
    <React.Fragment>
      <Typography
        color="text.secondary"
        sx={{ fontSize: '14px', fontWeight: 'fontWeightBold', outline: 'none', paddingLeft: 1 }}
      >
        {params.colDef.headerName}
      </Typography>
    </React.Fragment>
  );
}

function showName(
  params: GridRenderCellParams,
  canShowChip: boolean,
  onRowClick: (partyUser: PartyProductUser) => void
) {
  const isSuspended = isUserSuspended(params.row as PartyProductUser);
  const showChip = canShowChip && isSuspended;
  return (
    <React.Fragment>
      {renderCell(
        params,
        <>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={showChip ? 7 : 12} sx={{ width: '100%' }}>
              <Typography
                variant="body2"
                color={isSuspended ? 'text.disabled' : 'primary.main'}
                sx={{ fontWeight: 'fontWeightBold' }}
              >
                {params.row.name} {params.row.surname} {params.row.isCurrentUser ? '(tu)' : ''}
              </Typography>
            </Grid>
            {showChip && (
              <Grid
                item
                xs={5}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <TableChip text="Sospeso" />
              </Grid>
            )}
          </Grid>
        </>,
        onRowClick
      )}
    </React.Fragment>
  );
}

function TableChip({ text }: { text: string }) {
  return (
    <Chip
      label={text}
      aria-label={'Suspended'}
      sx={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#17324D',
        backgroundColor: '#E0E0E0',
        paddingBottom: '1px',
        height: '24px',
      }}
    />
  );
}

function showRoles(
  params: GridRenderCellParams<PartyProductUser>,
  productRolesLists: ProductRolesLists,
  onRowClick: (partyUser: PartyProductUser) => void
) {
  const isSuspended = isUserSuspended(params.row as PartyProductUser);
  return (
    <React.Fragment>
      {renderCell(
        params,
        <Grid container direction="column">
          {(params.row as PartyProductUser).product.roles?.map(
            (
              r // load just the actual product
            ) => (
              <Grid item key={r.relationshipId}>
                <Typography
                  color={isSuspended || r.status === 'SUSPENDED' ? '#9E9E9E' : undefined}
                  sx={{ fontSize: '14px', fontWeight: 'fontWeightBold', outline: 'none' }}
                >
                  {productRolesLists.groupByProductRole[r.role]
                    ? productRolesLists.groupByProductRole[r.role].title
                    : r.role}
                </Typography>
              </Grid>
            )
          )}
        </Grid>,
        onRowClick
      )}
    </React.Fragment>
  );
}

function showStatus(
  params: GridRenderCellParams,
  onRowClick: (partyUser: PartyProductUser) => void
) {
  const showChip = isUserSuspended(params.row as PartyProductUser);
  return renderCell(params, <>{showChip && <TableChip text="Sospeso" />}</>, onRowClick, {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
  });
}

function showActions(
  p: GridRenderCellParams<PartyProductUser>,
  onRowClick: (partyUser: PartyProductUser) => void
) {
  return renderCell(
    p,
    <Box width="100%">
      <IconButton
        onClick={onRowClick ? () => onRowClick(p.row) : undefined}
        sx={{ '&:hover': { backgroundColor: 'transparent' }, width: '100%' }}
      >
        <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 'small' }} />
      </IconButton>
    </Box>,
    undefined,
    { paddingLeft: 0, paddingRight: 0, textAlign: 'center' }
  );
}
