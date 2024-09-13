import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useScript } from "deco/hooks/useScript.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};

export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}

const QUANTITY_MAX_VALUE = 100;

const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");

  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};

function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity } = item;
  const isGift = price < 0.01;

  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;

  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-2 bg-white py-2 px-[10px] rounded-[10px]"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Image
        alt={name}
        src={image}
        width={140}
        height={192}
        class="h-full object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-[10px] ml-[10px]">
        {/* Name and Remove button */}
        <div class="flex justify-between items-center">
          <legend class="text-xs text-black">{name}</legend>
          <button
            class={clx(
              isGift && "hidden",
              "btn btn-ghost btn-square no-animation",
            )}
            hx-on:click={useScript(removeItemHandler)}
          >
            <Icon id="trash" size={24} />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex flex-col items-start gap-2">
          <span class="line-through  text-sm text-[#a8a8a8]">
            {formatPrice(listPrice, currency, locale)}
          </span>
          <span class=" text-sm text-[#123ADD] font-semibold">
            {isGift ? "Grátis" : formatPrice(price, currency, locale)}
          </span>
        </div>

        {/* Quantity Selector */}
        <QuantitySelector
          min={0}
          max={QUANTITY_MAX_VALUE}
          value={quantity}
          name={`item::${index}`}
        />
      </div>
    </fieldset>
  );
}

export default CartItem;
