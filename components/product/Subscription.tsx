import { formatPrice } from "../../sdk/format.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  productID: string;
  seller: string;
  quantity: number;
  listPrice: number;
  price: number;
}

export interface TimelineCalcProps {
  selected: SubscriptionOptions | null;
}

export type SubscriptionOptions = "none" | "2W" | "1M" | "2M" | "3M";

export default function SubscriptionButtonVTEX({
  productID,
  seller,
  quantity,
  price,
  listPrice,
}: Props) {
  const { currentSubscription } = useUI();

  const discount = price * 0.2;

  return (
    <button
      type="button"
      class="flex items-center justify-center gap-4 bg-dark-green text-white font-bold text-xs sm:text-[13px] h-12 px-4 rounded-md font-lemon-milk"
      onClick={() => {
        currentSubscription.value = {
          productID,
          seller,
          quantity,
          listPrice,
          price,
        };
      }}
    >
      ASSINE COM {formatPrice(discount * quantity)} de desconto
      <span class="flex-none max-[400px]:hidden">
        {/* <IconAsterisk /> */}
      </span>
    </button>
  );
}
