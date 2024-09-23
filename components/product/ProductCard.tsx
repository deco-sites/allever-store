import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import type { Product, PropertyValue } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";

import ProductStarCard from "./ProductStarCard.tsx";
import ProductStars from "../../islands/ProductStars.tsx";

interface Props {
  flags?: [internationalFlag: string, promoFlag: string, newsFlag: string];
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
  productGroupID?: string;
}

const WIDTH = 270;
const HEIGHT = 225;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export const getFlagCluster = (flag: string, additionalProperty?: PropertyValue[]) => {
  return additionalProperty?.find((prop) => {
    if (prop.name === "cluster") {
      return prop.propertyID === flag;
    }
  })
}

function ProductCard({
  flags,
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const id = useId();
  const [
    internationalFlag = "",
    promoFlag = "",
    newsFlag = "",
  ] = flags ?? [];

  const { url, image: images, offers, isVariantOf, additionalProperty } =
    product;

  console.log("additionalProperty", additionalProperty);
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability, installment } =
    useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  const firstSkuVariations = Object.entries(possibilities)[0];
  const variants = Object.entries(firstSkuVariations?.[1] ?? {});
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  const hasInternationalFlag = getFlagCluster(internationalFlag, additionalProperty);
  const hasPromoFlag = getFlagCluster(promoFlag, additionalProperty);
  const hasNewsFlag = getFlagCluster(newsFlag, additionalProperty);

  return (
    <div
      {...event}
      class={clx(
        "card flex flex-col space-between card-compact group text-sm bg-white p-3 sm:p-5",
        _class,
      )}
    >
      <div class="flex items-start justify-between">
        <div class="flex flex-wrap gap-[5px]">
          {/* Discounts */}
          {percent > 1 && inStock
            ? (
              <span
                class={clx(
                  "text-xs font-semibold text-white uppercase bg-[#123ADD] text-center text-white px-2 py-1 rounded-[6px]",
                )}
              >
                {percent} % off
              </span>
            )
            : null
          }
          {hasNewsFlag && (
            <span
              class={clx(
                "text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-[6px]",
              )}
            >
              Novidade
            </span>
          )}
          {hasPromoFlag && (
            <span
              class={clx(
                "text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-[6px]",
              )}
            >
              Promoção
            </span>
          )}
        </div>
        <WishlistButton item={item} variant="icon" />
      </div>
      <figure
        class="relative overflow-hidden rounded-none"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      <div>
        <a href={relativeUrl} class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            {hasInternationalFlag && (
              <p class="px-1 sm:px-6 py-1 flex items-center justify-center bg-[#000] text-white font-semibold text-[10px] sm:text-xs">
                Compra Internacional
              </p>
            )}
          </div>
          {seller && inStock && <p class="text-sm text-[#d3d3d3] capitalize">{seller}</p>}
          <p class="font-normal text-sm text-ellipsis font-bold line-clamp-2 h-10">
            {title}
          </p>
          {inStock
            ? (
              <div class="flex flex-col">
                {listPrice && (
                  <span class="line-through font-normal text-[#a8a8a8] text-xs leading-[1]">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </span>
                )}
                <span class="font-semibold text-[20px] text-[#123ADD]">
                  {formatPrice(price)}{" "}
                  <span class="text-[#123ADD] font-normal text-[20px] leading-[30px]">
                    no pix
                  </span>
                </span>
                <span class="text-[#a8a8a8] text-xs leading-[1]">
                  ou {installment?.billingDuration}x de {formatPrice(
                    installment?.billingIncrement,
                    offers!.priceCurrency!,
                  )}
                </span>
              </div>
            )
            : (
              <p class="text-left font-semibold">
                Produto Indisponível
              </p>
            )}
        </a>
        <ProductStars context="card" storeId="121576" productId={productGroupID ?? ""} />
      </div>
      {/* SKU Selector */}
      {
        /* {variants.length > 1 && (
        <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto">
          {variants.map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link} class="cursor-pointer">
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`${id}-${firstSkuVariations[0]}`}
                    checked={link === relativeUrl}
                  />
                  <Ring value={value} checked={link === relativeUrl} />
                </a>
              </li>
            ))}
        </ul>
      )} */
      }
      {
        /* {inStock ? (
        <AddToCartButton
          product={product}
          seller={seller}
          item={item}
          class={clx(
            "btn",
            "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
            "hover:!bg-transparent",
            "disabled:!bg-transparent disabled:!opacity-50",
            "btn-primary hover:!text-primary disabled:!text-primary"
          )}
        />
      ) : (
        <a
          href={relativeUrl}
          class={clx(
            "btn",
            "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
            "hover:!bg-transparent",
            "disabled:!bg-transparent disabled:!opacity-75",
            "btn-error hover:!text-error disabled:!text-error"
          )}
        >
          Sold out
        </a>
      )} */
      }
    </div>
  );
}

export default ProductCard;
