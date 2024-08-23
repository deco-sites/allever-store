import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../components/product/ProductSlider.tsx";
import Section, { Props as SectionHeaderProps } from "../components/ui/Section.tsx";
import { useOffer } from "../sdk/useOffer.ts";
import { useSendEvent } from "../sdk/useSendEvent.ts";
import { useState } from 'preact/hooks';
import CampaignTimer from './CampaignTimer.tsx';

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
    // console.log('expireAt:', expireAt); 

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

    const [expire, setExpire] = useState(false);

    const handleExpire = () => {
        setExpire(true);
    };

    if (expire) {
        return null;
    }

    return (
        <Section.Container
            {...viewItemListEvent}
            class="[view-transition-name:loading-fallback-2]"
        >
            <div class="flex items-center gap-10">
                <Section.Header title={title} cta={cta} />
                {expireAt && (
                    <div class="bg-primary px-[18px] py-2 lg:px-[25px] lg:py-[15px] rounded-[10px]">
                        <CampaignTimer
                            class="flex text-sm lg:text-[20px] gap-[10px] lg:gap-[15px]"
                            key={expireAt}
                            expiresAt={expireAt}
                            hideLabel={hideLabel}
                            onExpire={handleExpire}
                        />
                    </div>
                )}
            </div>
            <ProductSlider products={products} itemListName={title} />
        </Section.Container>
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
