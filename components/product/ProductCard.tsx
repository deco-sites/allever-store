import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";

import ProductStarCard from "./ProductStarCard.tsx"
import ProductStars from "../../islands/ProductStars.tsx"

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
  offerLimited?: boolean;
  productGroupID?: string;
  internationalBuy?: boolean;
}

const WIDTH = 270;
const HEIGHT = 225;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
  internationalBuy = true,
  offerLimited = true,
  // productGroupID,
}: Props) {
  const id = useId();

  const { url, image: images, offers, isVariantOf, additionalProperty } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  // console.log("offers", offers);
  const { listPrice, price, seller = "1", availability, installment } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  const firstSkuVariations = Object.entries(possibilities)[0];
  const variants = Object.entries(firstSkuVariations?.[1] ?? {});
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;


  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */ }
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


  const hasPromocao = additionalProperty?.some(
    (prop) => prop.value === "Promoção"
  );

  const hasNovidade = additionalProperty?.some(
    (prop) => prop.value === "Novidades"
  );

  return (
    <div {...event} class={clx("card flex flex-col space-between card-compact group text-sm bg-white p-5", _class)}>
      <figure class="relative overflow-hidden" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Product Images */}
        <a href={relativeUrl} aria-label="view product" class={"absolute top-4 right-4 z-[9] flex items-center"}>
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="bg-base-100 col-span-full row-span-full w-full opacity-100 lg:group-hover:opacity-0 lg:group-hover:z-10"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="bg-base-100 col-span-full row-span-full w-full transition-opacity opacity-0 lg:group-hover:opacity-100 lg:group-hover:z-30 absolute left-0"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>
        <div class="absolute  top-2 lg:top-[10px] left-0 z-10 max-w-[200px] flex flex-wrap gap-[5px]">
          {/* Discounts */}
          {percent > 1 && inStock ? (
            <span class={clx("text-xs font-semibold text-white uppercase bg-[#123ADD] text-center text-white px-2 py-1 rounded-[6px]")}>
              {percent} % off
            </span>
          ) : null}
          {/* Notify Me */}
          {hasNovidade && (
            <span class={clx("text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-[6px]")}>
              Novidade
            </span>
          )}
          {/* News */}
          {hasPromocao && (
            <span class={clx("text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-[6px]")}>
              Promoção
            </span>
          )}
        </div>
        {/* Wishlist button */}
        <div class="absolute top-0 right-0 w-full flex items-center justify-end z-10">
          <WishlistButton item={item} variant="icon" />
        </div>
      </figure>
      <div>
        <a href={relativeUrl} class="pt-5">
          {offerLimited && (
            <p class="px-6 py-[2px] flex items-center justify-center bg-[#f22e2e] text-white font-semibold text-xs mt-[5px]">
              Oferta por tempo limitado
            </p>
          )}
          {internationalBuy && (
            <p class="px-6 py-[2px] flex items-center justify-center bg-[#000] text-white font-semibold text-xs mt-[5px]">
              Compra Internacional
            </p>
          )}
          {seller && inStock ? <p class="my-[5px] text-sm text-[#d3d3d3] capitalize">{seller}</p> : <span class="my-[5px]"></span>}
          <p class="font-normal text-sm max-h-[63px] overflow-hidden">{title}</p>
          {inStock ? (
            <div class="flex gap-2 flex-col pt-2">
              {listPrice && (
                <span class="line-through font-normal text-[#a8a8a8] text-sm">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <span class="font-semibold text-[20px] text-[#123ADD]">
                {formatPrice(installment?.price)}{" "}
                <span class="text-[#123ADD] font-normal text-[20px] leading-[30px]">no pix</span>
              </span>
              <span class="text-[#a8a8a8] text-xs">
                ou {installment?.billingDuration}x de{" "}
                {formatPrice(installment?.billingIncrement, offers!.priceCurrency!)}
              </span>
            </div>
          ) : (
            <p class="flex text-center mt-2 justify-center font-semibold"> Produto Indisponível</p>
          )}
        </a>
        <ProductStars storeId="121576" productId={productGroupID ?? ""} />
      </div>
      {/* SKU Selector */}
      {/* {variants.length > 1 && (
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
      )} */}
      {/* {inStock ? (
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
      )} */}
    </div>
  );
}

export default ProductCard;