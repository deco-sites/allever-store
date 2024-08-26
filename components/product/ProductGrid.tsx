import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const ProductGrid = ({ page }: Props) => {
  const { product } = page;
  const { image } = product || {};

  return (
    <div className="container">
      <ul className="grid grid-cols-2 gap-4">
        {image && image.map((img, index) => (
          <li key={index} className="w-full">
            <img src={img.url} alt={img.alternateName} className="w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductGrid;
