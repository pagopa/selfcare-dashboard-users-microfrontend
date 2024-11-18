import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material';
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import React, { CSSProperties, ReactNode } from 'react';
import { PartyProductUser } from '../../../../../model/PartyUser';
import { Product } from '../../../../../model/Product';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../../../model/ProductRole';

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
      renderHeader: showCustomHeader,
      renderCell: (params) => showName(params, false, onRowClick),
      sortable: false,
      flex: 4,
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
      renderHeader: showCustomHeader,
      renderCell: (params) => renderCell(params, undefined, onRowClick),
      sortable: false,
      flex: 4,
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
      renderHeader: showCustomHeader,
      sortable: false,
      flex: 3,
    },
    {
      field: 'status',
      cellClassName: 'justifyContentNormalRight',
      headerName: '',
      align: 'right',
      width: 82,
      hideSortIcons: true,
      disableColumnMenu: true,
      editable: false,
      renderCell: (params) => showStatus(params, onRowClick),
      sortable: false,
      flex: 2,
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
  const isSuspended = isUserSuspended(params.row as PartyProductUser);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '-16px',
        paddingBottom: '-16px',
        cursor: 'pointer',
        ...overrideStyle,
      }}
      onClick={onRowClick ? () => onRowClick(params.row) : undefined}
    >
      <Box
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const,
          width: '100%',
          color:
            isSuspended || params.row.status === 'SUSPENDED' ? 'text.disabled' : 'colorTextPrimary',
          fontSize: '14px',
        }}
      >
        {value ?? '-'}
      </Box>
    </div>
  );
}

function isUserSuspended(user: PartyProductUser): boolean {
  return user.status === 'SUSPENDED' || !user.product.roles?.find((r) => r.status !== 'SUSPENDED');
}

function getFullName(params: GridValueGetterParams) {
  return `${params.row.name} ${params.row.surname} ${params.row.status}`;
}

function showCustomHeader(params: GridColumnHeaderParams) {
  return (
    <React.Fragment>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'fontWeightMedium',
          outline: 'none',
          paddingLeft: '14px',
        }}
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
                color="primary.main"
                sx={{
                  fontWeight: 'fontWeightBold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  textTransform: 'capitalize',
                }}
              >
                {`${params.row.surname} ${params.row.name} `.toLowerCase()}
                {params.row.isCurrentUser
                  ? i18n.t('usersTable.usersProductTableColumns.rows.isCurrentUser')
                  : ''}
              </Typography>
            </Grid>
            {showChip && (
              <Grid
                item
                xs={5}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <TableChip
                  text={i18n.t('usersTable.usersProductTableColumns.rows.suspendedChip')}
                />
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
      color='warning'
      sx={{
        fontSize: '14px',
        fontWeight: 'fontWeightMedium',
        paddingBottom: '1px',
        height: '24px',
        cursor: 'pointer',
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
        <Grid container direction="column" sx={{ display: 'contents' }}>
          {(params.row as PartyProductUser).product.roles?.map(
            (
              r // load just the actual product
            ) => (
              <Grid item key={r.relationshipId}>
                <Typography
                  variant="caption"
                  color={
                    isSuspended || r.status === 'SUSPENDED' ? 'text.disabled' : 'colorTextPrimary'
                  }
                  sx={{ outline: 'none', paddingLeft: 3 }}
                >
                  {transcodeProductRole2Title(r.role, productRolesLists)}
                </Typography>
              </Grid>
            )
          )}
        </Grid>,
        onRowClick,
        {
          paddingLeft: 0,
          paddingRight: 0,
        }
      )}
    </React.Fragment>
  );
}

function showStatus(
  params: GridRenderCellParams,
  onRowClick: (partyUser: PartyProductUser) => void
) {
  const showChip = isUserSuspended(params.row as PartyProductUser);
  return renderCell(
    params,
    <>
      {showChip && (
        <TableChip text={i18n.t('usersTable.usersProductTableColumns.rows.suspendedChip')} />
      )}
    </>,
    onRowClick,
    {
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: 'right',
    }
  );
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
        sx={{
          '&:hover': { backgroundColor: 'transparent' },
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          pr: 4,
          cursor: 'pointer',
        }}
      >
        <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 'small' }} />
      </IconButton>
    </Box>,
    undefined,
    { paddingLeft: 0, paddingRight: 0, textAlign: 'center' }
  );
}
