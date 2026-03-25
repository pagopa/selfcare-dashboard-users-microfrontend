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
import { AllUserInfo, PartyProductUser } from '../../../../../model/PartyUser';
import { Product } from '../../../../../model/Product';
import { ProductRolesLists, transcodeProductRole2Title } from '../../../../../model/ProductRole';
import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { isUserSuspended } from '../../../../../utils/utils';

export function buildColumnDefs(
  _product: Product,
  onRowClick: (partyUser: PartyProductUser | AllUserInfo) => void,
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
      headerName: isPagoPaUser() ? i18n.t('usersTable.usersProductTableColumns.headerFields.status') : '',
      align: isPagoPaUser() ? 'left' : 'right',
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
  onRowClick?: (partyUser: PartyProductUser | AllUserInfo) => void,
  overrideStyle: CSSProperties = {}
) {
  const isSuspended = isUserSuspended(params.row as PartyProductUser | AllUserInfo);
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
            isSuspended || ('product' in params.row && params.row.status === 'SUSPENDED')
              ? 'text.disabled'
              : 'colorTextPrimary',
          fontSize: '14px',
        }}
      >
        {value ?? '-'}
      </Box>
    </div>
  );
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
  onRowClick: (partyUser: PartyProductUser | AllUserInfo) => void
) {
  const isSuspended = isUserSuspended(params.row as PartyProductUser | AllUserInfo);
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

function TableChip({
  text,
  color = 'warning',
}: {
  text: string;
  color?: 'success' | 'warning' | 'error' | 'default' | 'info' | 'primary' | 'secondary';
}) {
  return (
    <Chip
      label={text}
      aria-label={text}
      color={color}
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
  params: GridRenderCellParams<PartyProductUser | AllUserInfo>,
  productRolesLists: ProductRolesLists,
  onRowClick: (partyUser: PartyProductUser | AllUserInfo) => void
) {
  const isSuspended = isUserSuspended(params.row as PartyProductUser | AllUserInfo);
  return (
    <React.Fragment>
      {renderCell(
        params,
        <Grid container direction="column" sx={{ display: 'contents' }}>
          {'product' in params.row ? (
            (params.row as PartyProductUser).product.roles?.map(
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
            )
          ) : (
            <Grid item>
              <Typography
                variant="caption"
                color={isSuspended ? 'text.disabled' : 'colorTextPrimary'}
                sx={{ outline: 'none', paddingLeft: 3 }}
              >
                {(params.row as AllUserInfo).partyRole}
              </Typography>
            </Grid>
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
  onRowClick: (partyUser: PartyProductUser | AllUserInfo) => void
) {
  const row = params.row as PartyProductUser | AllUserInfo;
  if ('product' in row) {
    const showChip = isUserSuspended(row);
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
  } else {
    const status = row.status;
    const isRemoved = status === 'DELETED';
    const isSuspended = status === 'SUSPENDED';
    const isActive = status === 'ACTIVE';

    return renderCell(
      params,
      <>
        {isActive && (
          <TableChip
            text={i18n.t('usersTable.usersProductTableColumns.rows.activeChip')}
            color="success"
          />
        )}
        {isSuspended && (
          <TableChip
            text={i18n.t('usersTable.usersProductTableColumns.rows.suspendedChip')}
            color="warning"
          />
        )}
        {isRemoved && (
          <TableChip
            text={i18n.t('usersTable.usersProductTableColumns.rows.removedChip')}
            color="error"
          />
        )}
      </>,
      onRowClick,
      {
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'left',
      }
    );
  }
}

function showActions(
  p: GridRenderCellParams<PartyProductUser | AllUserInfo>,
  onRowClick: (partyUser: PartyProductUser | AllUserInfo) => void
) {
  return renderCell(
    p,
    <Box width="100%">
      <IconButton
        onClick={onRowClick ? () => onRowClick(p.row) : undefined}
        sx={{ backgroundColor: 'transparent' }}
        aria-label={i18n.t('usersTable.usersProductTableColumns.rows.detailPageRedirectButton') + ` ${p.row.surname} ${p.row.name}`}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 'small' }} />
      </IconButton>
    </Box>,
    undefined,
    { paddingLeft: 0, paddingRight: 0, textAlign: 'center' }
  );
}
