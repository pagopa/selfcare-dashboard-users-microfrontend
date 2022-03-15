// TODO remove me
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useUnloadEventOnExit } from '@pagopa/selfcare-common-frontend/hooks/useUnloadEventInterceptor';
import React from 'react';
import { Product } from '../model/Product';

export type ProductNavigationPath = {
  description: string;
  onClick?: () => void;
};

type Props = {
  selectedProduct?: Product;
  paths: Array<ProductNavigationPath>;
};

export default function ProductNavigationBar({ selectedProduct, paths }: Props) {
  const onExit = useUnloadEventOnExit();

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        {selectedProduct && (
          <Typography variant="body2" sx={{ fontWeight: 'normal', color: 'text.secondary' }}>
            {selectedProduct?.title}
          </Typography>
        )}
        {paths.map((p) =>
          p.onClick ? (
            <Link
              key={p.description}
              variant="body2"
              onClick={() => onExit(p.onClick as () => void)}
              sx={{
                fontWeight: '700',
                color: '#5C6F82 !important',
                textDecoration: 'none !important',
                cursor: 'pointer',
              }}
            >
              {p.description}
            </Link>
          ) : (
            <Typography key={p.description} variant="body2" sx={{ color: 'text.secondary' }}>
              {p.description}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </React.Fragment>
  );
}
