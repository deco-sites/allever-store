import { ProductDetailsPage } from "apps/commerce/types.ts";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Description from "../../components/product/Description.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";

import { useDevice } from "deco/hooks/useDevice.ts";
import { useScript } from "deco/hooks/useScript.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const onLoad = (
  productId: string,
  productName: string,
  image: string,
) => {
  // @ts-ignore _trustvox exists
  globalThis._trustvox = [
    ['_storeId', "121576"],
    ['_productId', productId],
    ['_productName', productName],
    ['_productPhotos', [image]],
  ]

  const script = document.createElement('script')

  script.id = "_trustvox_widget_script"
  script.async = true
  script.type = 'text/javascript'
  script.src = '//static.trustvox.com.br/sincero/sincero.js'

  document.head.append(script)

  // @ts-ignore _trustvox_shelf_rate exists
  const _trustvox_shelf_rate = globalThis._trustvox_shelf_rate || []
  _trustvox_shelf_rate.push(['_storeId', "121576"])
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
    const { product } = page;
    const { productID: productId, image: images, isVariantOf } = product;
    const productName = (isVariantOf?.name ?? product.name) || "";
    const [front] = images ?? [];
    const image = front?.url || "";
    
    const device = useDevice();

    return (
      <>
        <ProductInfo page={page} device={device} />
        <div class="border border-x-0 border-b-[#a8a8a8] border-t-0 lg:border-t-[1px] lg:border-t-[#a8a8a8] mt-0 lg:mt-12">
          <Description page={page} />
        </div>
        <ProductGrid page={page} />
        <div className="container px-5">
          <div id='_trustvox_widget' />
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(onLoad, productId, productName, image) }}
        />
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
