import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "../../apps/site.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { type SectionProps } from "@deco/deco";
export interface Like {
  product: number;
  comments: string[];
}
export interface Props {
  product: ProductDetailsPage | null;
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const { product } = props;
  if (!product) {
    return props;
  }
  if (!product?.product) {
    return props;
  }
  return { ...props, isMobile: ctx.device !== "desktop" };
};
export default function ProductAd({
  product,
}: SectionProps<typeof loader>) {
  if (!product) {
    return null;
  }
  if (!product?.product) {
    return null;
  }
  const {
    pix,
    listPrice,
  } = useOffer(product?.product?.offers);
  const {
    product: currentProduct
  } = product;
  const { url, brand, name = "", image: images = [], offers } = currentProduct;
  const image = images && images[0]?.url;
  return (
    <div class="container p-3 lg:py-0 sm:px-0 flex flex-col lg:flex-row">
      <div class={`gap-3 rounded-xl flex`}>
        <a href={url} class="block overflow-hidden rounded-xl">
          <Image
            class="object-cover"
            src={image || ""}
            alt={name}
            width={250}
            height={250}
            preload={true}
            loading="lazy"
            fetchPriority="low"
            style={{ transition: "all .3s ease" }}
          />
        </a>
      </div>
      <div class={`flex flex-col items-start justify-center p-3`}>
        <p class="mb-[5px] text-[#D3D3D3] text-sm leading-[21px] uppercase">
          {brand?.name}
        </p>
        <p class="text-base leading-6 font-normal text-black max-w-[252px]">
          {name}
        </p>
        <div class="flex items-start lg:items-center mt-[5px] flex-col lg:flex-row lg:gap-[6px]">
          <p class="text-sm leading-[21px] text-[#989898] line-through">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </p>
          <p class="font-semibold sm:text-right text-xl lg:text-[20px] text-[#0066E4]">
            {formatPrice(pix, offers?.priceCurrency)}
          </p>
        </div>
      </div>
    </div>
  );
}
