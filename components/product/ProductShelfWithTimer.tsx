import ProductSlider from "./ProductSlider.tsx";
import CampaignTimer from "../../islands/CampaignTimer.tsx";
import Section, { Props as SectionHeaderProps } from "../ui/Section.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "../../apps/site.ts";
import { type SectionProps } from "@deco/deco";
export interface Timer {
    /**
     * @title Data Final
     * @format datetime
     */
    expireAt?: string;
    hideLabel?: boolean;
}
export interface Props extends SectionHeaderProps, Timer {
    products: Product[] | null;
}
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
    console.log("CTX", ctx);
    return { ...props };
};
export default function ProductShelf({ products, title, cta, expireAt, hideLabel = false }: SectionProps<typeof loader>) {
    const id = useId();
    if (!products || products.length === 0) {
        return null;
    }
    const viewItemListEvent = useSendEvent({
        on: "view",
        event: {
            name: "view_item_list",
            params: {
                item_list_name: title,
                items: products.map((product, index) => mapProductToAnalyticsItem({
                    index,
                    product,
                    ...(useOffer(product.offers)),
                })),
            },
        },
    });
    return (<div id={id}>
      <Section.Container {...viewItemListEvent} class="[view-transition-name:loading-fallback-2]">
        <div class="flex flex-wrap items-center gap-x-10 gap-y-[0.5rem] px-[18px] lg:px-[25px]">
          <Section.Header title={title} cta={cta}/>
          {expireAt && (<div class="bg-primary px-3 py-2 lg:py-[15px] rounded-[10px]">
              <CampaignTimer hideLabel={hideLabel} expiresAt={expireAt} id={id}/>
            </div>)}
        </div>
        <ProductSlider products={products} itemListName={title}/>
      </Section.Container>
    </div>);
}
