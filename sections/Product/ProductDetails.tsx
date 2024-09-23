import Icon from "../../components/ui/Icon.tsx";
import Collapsable from "../../components/ui/Collapsable.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Description from "../../components/product/Description.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import type { SectionProps } from "@deco/deco";
import type { AppContext } from "../../apps/site.ts";
export interface Props {
    /** @title Integration */
    page: ProductDetailsPage | null;
}
const onLoad = (productId: string, productName: string, image: string) => {
    // @ts-ignore _trustvox exists
    globalThis._trustvox = [
        ['_storeId', "121576"],
        ['_productId', productId],
        ['_productName', productName],
        ['_productPhotos', [image]],
    ];
    const script = document.createElement('script');
    script.id = "_trustvox_widget_script";
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//static.trustvox.com.br/sincero/sincero.js';
    document.head.append(script);
    // @ts-ignore _trustvox_shelf_rate exists
    const _trustvox_shelf_rate = globalThis._trustvox_shelf_rate || [];
    _trustvox_shelf_rate.push(['_storeId', "121576"]);
};
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const {
    internationalFlag = "",
    promoFlag = "",
    newsFlag = "",
  } = ctx;

  return {
    ...props,
    internationalFlag,
    promoFlag,
    newsFlag,
  }
}
export default function ProductDetails({ 
  page,
  internationalFlag,
  promoFlag,
  newsFlag,
}: SectionProps<typeof loader>) {
    if (!page) {
        return (<div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Oops!</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>);
    }
    if (page) {
        const { product } = page;
        const { productID: productId, image: images, isVariantOf } = product;
        const productName = (isVariantOf?.name ?? product.name) || "";
        const [front] = images ?? [];
        const image = front?.url || "";
        const device = useDevice();
        const { additionalProperty = [], } = isVariantOf ?? {};
        return (<>
        <ProductInfo flags={[ internationalFlag, promoFlag, newsFlag ]} page={page} device={device}/>
        <div class="border border-x-0 border-b-[#a8a8a8] border-t-0 lg:border-t-[1px] lg:border-t-[#a8a8a8] mt-0 lg:mt-12">
          <Description page={page}/>
        </div>
        {additionalProperty.length > 0 && (<div id="specifications" class="pt-32 -mt-32 border border-x-0 border-b-[#a8a8a8] border-t-0">
            <Collapsable class="container px-5" title={<div class="flex space-between items-center">
                  <span class="text-base lg:text-xl py-5 sm:py-12 font-semibold">Especificações Técnicas</span>
                  <Icon id={"arrow-right"} size={13} class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"/>
                </div>}>
              <table class="table mb-5">
                <tbody>
                  {isVariantOf?.additionalProperty.map((property) => (<tr class="text-sm sm:text-base max-sm:flex flex-col table-row even:bg-middle-gray odd:bg-transparent">
                      <td class="font-semibold sm:after:content-[':'] max-sm:pb-0">{property.name}</td>
                      <td class="max-sm:pt-0">{property.value}</td>
                    </tr>))}
                </tbody>
              </table>
            </Collapsable>
          </div>)}
        <ProductGrid page={page}/>
        <div className="container px-5">
          <div id='_trustvox_widget'/>
        </div>
        <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad, productId, productName, image) }}/>
      </>);
    }
}
export function LoadingFallback() {
    return (<div style={{ height: "710px" }} class="w-full flex justify-center items-center">
      <span class="loading loading-spinner"/>
    </div>);
}
