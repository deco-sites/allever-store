import ProductSlider from "./ProductSlider.tsx";
import CampaignTimer from '../../islands/CampaignTimer.tsx';
import Section, { Props as SectionHeaderProps } from "../ui/Section.tsx";

import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import type { Product } from "apps/commerce/types.ts";

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

export default function ProductShelf({ products, title, cta, expireAt, hideLabel = false }: Props) {
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
                items: products.map((product, index) =>
                    mapProductToAnalyticsItem({
                        index,
                        product,
                        ...(useOffer(product.offers)),
                    })
                ),
            },
        },
    });

    return (
        <div id={id}>
          <Section.Container
            {...viewItemListEvent}
            class="[view-transition-name:loading-fallback-2]"
          >
              <div class="flex items-center gap-10">
                  <Section.Header title={title} cta={cta} />
                  {expireAt && (
                      <div class="bg-primary px-[18px] py-2 lg:px-[25px] lg:py-[15px] rounded-[10px]">
                        <CampaignTimer
                          hideLabel={hideLabel}
                          expiresAt={expireAt}
                          id={id}
                        />
                      </div>
                  )}
              </div>
              <ProductSlider products={products} itemListName={title} />
          </Section.Container>
        </div>
    );
}

export function LoadingFallback() {
    return (
        <div
            style={{ height: "716px" }}
            class="flex justify-center items-center [view-transition-name:loading-fallback-2]"
        >
            <span class="loading loading-spinner" />
        </div>
    );
}
