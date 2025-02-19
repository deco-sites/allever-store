import type { Product } from "apps/commerce/types.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  product: Product;
}

const SelectedVariantNames = ({ product }: Props) => {
  const possibilities = useVariantPossibilities(
    product.isVariantOf?.hasVariant ?? [],
    product,
  );

  const currentUrl = relative(product.url);

  const selectedVariant = product.isVariantOf?.hasVariant.find(
    (variant) => relative(variant.url) === currentUrl,
  );

  return (
    <h1 class="text-base font-bold lg:text-xl flex-grow">
      {selectedVariant?.name ?? product.name ?? null}
    </h1>
  );
};

export default SelectedVariantNames;
