import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt?: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative block overflow-y-hidden w-full"
    >
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={412}
          height={660}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="object-cover w-full h-full max-h-[75vh]"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
          width={1440}
          height={600}
        />
      </Picture>
    </a>
  );
}

function Carousel({ images = [], preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full",
      )}
    >
      <div class="col-span-full row-span-full leading-[1]">
        <Slider class="carousel carousel-center w-full gap-6">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>
      {images.length > 1
        ? (
          <>
            <div class="hidden sm:flex items-center justify-center z-10 col-start-1 row-start-2">
              <Slider.PrevButton
                class="btn-sm"
                disabled={false}
              >
                <Icon id="chevron-right" class="rotate-180" />
              </Slider.PrevButton>
            </div>

            <div class="hidden sm:flex items-center justify-center z-10 col-start-3 row-start-2">
              <Slider.NextButton
                class="btn-sm"
                disabled={false}
              >
                <Icon id="chevron-right" />
              </Slider.NextButton>
            </div>
          </>
        )
        : null}

      <ul
        class={clx(
          "col-span-full row-start-4 z-10",
          "carousel justify-center gap-3 hidden lg:flex",
        )}
      >
        {images.map((_, index) => (
          images.length > 1
            ? (
              <li class="carousel-item ">
                <Slider.Dot
                  index={index}
                  class={clx(
                    "bg-black h-3 w-3 no-animation rounded-full",
                    "disabled:w-8 disabled:bg-base-100 disabled:opacity-100 transition-[width] bg-primary",
                  )}
                >
                </Slider.Dot>
              </li>
            )
            : null
        ))}
      </ul>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Carousel;
