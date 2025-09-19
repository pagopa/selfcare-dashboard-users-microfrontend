import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend/lib';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { Party } from '../../../../../../model/Party';
import { Product } from '../../../../../../model/Product';
import { commonStyles } from '../../../../utils/helpers';

interface ProductSelectionSectionProps {
  products: Array<Product>;
  party: Party;
  hasPermission: (productId: string, action: string) => boolean;
  userProduct: Product | undefined;
  setUserProduct: (product: Product | undefined) => void;
  selectLabel: string;
  validTaxcode: string | undefined;
  productInPage: boolean | undefined;
  t: (key: string) => string;
}

export const ProductSelectionSection = ({
  products,
  party,
  hasPermission,
  userProduct,
  setUserProduct,
  selectLabel,
  validTaxcode,
  productInPage,
  t,
}: ProductSelectionSectionProps) => (
  <Grid container direction="column" sx={commonStyles}>
    <Grid item xs={12}>
      <TitleBox
        variantTitle="h6"
        variantSubTitle="body2"
        title={t('userEdit.addForm.product.title')}
        subTitle={t('userEdit.addForm.product.subTitle')}
        mbTitle={2}
        mbSubTitle={3}
      />
    </Grid>
    <Grid item xs={12} mb={3}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel
          id="select-label-products"
          size="small"
          sx={{
            color: !validTaxcode ? 'text.disabled' : '',
            '& .MuiInputLabel-root.Mui-focused': {
              fontWeight: 'fontWeightMedium',
              fontSize: 'fontSize',
              whiteSpace: 'nowrap',
            },
          }}
        >
          {selectLabel}
        </InputLabel>
        <Select
          fullWidth
          size="small"
          aria-label="user"
          name="products"
          value={userProduct?.title ?? ''}
          labelId="select-label-products"
          disabled={!validTaxcode || productInPage}
          variant="outlined"
          renderValue={(userProduct) => (
            <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
              {userProduct}
            </Typography>
          )}
          input={<OutlinedInput label={selectLabel} />}
        >
          {products
            .filter((p) =>
              party.products.some(
                (pp) =>
                  p.id === pp.productId && hasPermission(pp.productId, Actions.CreateProductUsers)
              )
            )
            .map((p) => (
              <MenuItem
                key={p.id}
                value={p.id}
                data-testid={`product: ${p.id}`}
                sx={{
                  fontSize: 'fontSize',
                  fontWeight: 'fontWeightMedium',
                  color: 'text.primary',
                }}
                onClick={validTaxcode ? () => setUserProduct(p) : undefined}
              >
                {p.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);
