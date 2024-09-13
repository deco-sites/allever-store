import { ProductDetailsPage } from "apps/commerce/types.ts";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Description from "../../components/product/Description.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";

import { useDevice } from "deco/hooks/useDevice.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  // buyTogetherLoader: Product[] | null;
}

export default function ProductDetails({
  page,
}: Props) {
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
    const { product, breadcrumbList } = page;

    const { isVariantOf } = product;
    const title = isVariantOf?.name ?? product.name;

    const device = useDevice();

    return (
      <>
        <ProductInfo page={page} device={device} />
        {/* <div class="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-10">
          <div class="container px-5 py-4 flex items-center">
            <div class="text-xl font-semibold text-black uppercase">{title}</div>
          </div>
        </div> */}
        <div class="border border-x-0 border-b-[#a8a8a8] border-t-0 lg:border-t-[1px] lg:border-t-[#a8a8a8] mt-0 lg:mt-12">
          <Description page={page} />
        </div>
        <ProductGrid page={page} />
      </>
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
