import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "arrow-right"
  | "search"
  | "shopping_bag"
  | "menu"
  | "account_circle"
  | "close"
  | "chevron-right"
  | "favorite"
  | "home_pin"
  | "call"
  | "local_shipping"
  | "pan_zoom"
  | "share"
  | "share-2"
  | "sell"
  | "check-circle"
  | "error"
  | "trash"
  | "wishlist-icon"
  | "wishlist-icon-white"
  | "wishlist-gray-icon"
  | "search-drawer"
  | "close-white"
  | "close-black"
  | "sac"
  | "account_blue"
  | "bag-blue"
  | "ecomm-ticket"
  | "contact-white"
  | "arrowRight"
  | "pix"
  | "credit-card"
  | "delivery-box"
  | "check"
  | "favorite-pdp"
  | "ArrowSlide"
  | "rain"
  | "18"
  | "whatsapp"
  | "facebook"
  | "copy-paste"
  | "mail"
  | "x-twitter"
  | "bookmark";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="search" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, size = 24, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
