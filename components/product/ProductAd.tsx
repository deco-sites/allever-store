import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";

import Image from "apps/website/components/Image.tsx";
import { SectionProps } from "deco/mod.ts";

import type { AppContext } from "../../apps/site.ts";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";

export interface Like {
  product: number;
  comments: string[];
}

export interface Props {
  product: ProductDetailsPage | null;
  /**
   * @title Destaque
   */
  highlight?: boolean;
  /**
   * @title Descrição do Anúncio
   * @format textarea
   */
  adDescription?: string;
  /**
   * @hide
   */
  likes: Like | null;
  vertical?: boolean;
  /**
   * @title Carregamento lento de imagem?
   * @default true
   */
  lazyLoad?: boolean;
  animateImage?: boolean;
  relatedProduct?: Product[] | null;
  showRelatedProduct?: boolean;
  /**
   * @hide
   */
  isMobile: boolean;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { product } = props;

  if (!product) return props;
  if (!product?.product) return props;

  const {
    product: {
      productID,
    },
  } = product;

  return { ...props, isMobile: ctx.device !== "desktop" };
};

export default function ProductAd({
  product,
  highlight = false,
  adDescription = "",
  vertical = false,
  lazyLoad = true,
  animateImage = true,
  relatedProduct = [],
  showRelatedProduct = false,
  isMobile,
}: SectionProps<typeof loader>) {
  if (!product) return null;
  if (!product?.product) return null;

  const { price } = useOffer(product?.product?.offers);

  const currentProduct = showRelatedProduct
    // @ts-expect-error relatedProduct is an array
    ? relatedProduct.length > 0 ? relatedProduct[0] : product.product
    : product.product;

  const {
    url,
    brand,
    name = "",
    image: images = [],
    offers,
  } = currentProduct;

  const image = images[0]?.url ?? "";

  return (
    <div class="container p-3 lg:py-0 sm:px-0 flex flex-col lg:flex-row">
      <div
        class={` gap-3 p-3 rounded-xl my-5 min-h-[320px] max-h-[320px] flex items-center mx-auto`}
      >
        <a
          href={url}
          class="block overflow-hidden rounded-xl"
          style={{
            width: isMobile ? "250px" : "250px",
            height: isMobile ? "250px" : "250px",
          }}
        >
          <Image
            class={`card object-cover ${animateImage && "hover:scale-110"}`}
            src={image}
            alt={name}
            width={250}
            height={250}
            preload={!lazyLoad}
            loading={lazyLoad ? "lazy" : "eager"}
            fetchPriority={lazyLoad ? "low" : "high"}
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
          {offers?.lowPrice === price
            ? (
              <p class="text-sm leading-[21px] text-[#989898] line-through">
                {formatPrice(offers?.lowPrice)}
              </p>
            )
            : null}
          <p class="font-semibold sm:text-right text-xl lg:text-[20px] text-[#0066E4]">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </div>
  );
}
