import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import { clx } from "../../sdk/clx.ts";
import Description from "../../components/product/Description.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";
import BuyTogether from "../../islands/BuyTogether.tsx";
// import type { LoaderReturnType } from "$live/types.ts";

import type { Product } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  buyTogetherLoader: Product[] | null;
}

export default function ProductDetails(
  { page, buyTogether }: {
    page: ProductDetailsPage;
    buyTogether: Product[] | null;
  },
) {
  const { product } = page;

  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Oops!</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  if (page) {
    return (
      <div class=" flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
        <div
          class={clx(
            "container grid",
            "grid-cols-1 gap-2 py-0",
            "sm:grid-cols-5 sm:gap-6",
          )}
        >
          <div class="sm:col-span-3">
            <ImageGallerySlider page={page} />
          </div>
          <div class="sm:col-span-2">
            <ProductInfo page={page} />
          </div>
        </div>
        <div>
          {/* Description card */}
          <div class="mt-4 sm:mt-6 border border-x-0 border-y-[#A8A8A8]">
            <Description page={page} />
          </div>
          <div>
            <BuyTogether product={product} buyTogether={buyTogether} />
          </div>
          <div>
            <ProductGrid page={page} />
          </div>
        </div>
      </div>
    );
  }
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
