import { useDevice } from "deco/hooks/useDevice.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../../sdk/useId.ts";

import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";

import { FirstVariationProps } from "./components/types/types.ts";

const FirstVariation = (
  { items, title, slide, bannerFull }: FirstVariationProps,
) => {
  const device = useDevice();
  const id = useId();

  return (
    <>
      {device === "desktop" && (
        <div class="container">
          {title &&
            (
              <div class="my-[35px]">
                <p class="text-2xl sm:text-3xl font-semibold">{title}</p>
              </div>
            )}
          {slide &&
            (
              <div class="mt-[10px] overflow-x-hidden">
                <div id={id} class="grid grid-rows-1">
                  <div class="col-start-1 col-span-3 row-start-1 row-span-1">
                    <Slider class="carousel carousel-center w-full gap-6">
                      {slide.map((item, index) => (
                        <Slider.Item
                          index={index}
                          class="carousel-item w-full justify-center max-w-[1440px]"
                          key={index}
                        >
                          <a href={item.Link} class="flex w-full">
                            <Image
                              src={item.desktop?.Image
                                ? item.desktop?.Image
                                : `https://placehold.co/${item.desktop?.Width}x${item.desktop?.Height}`}
                              alt={item.Alt ||
                                "esse é um banner de uma marca tradicional"}
                              width={item.desktop?.Width}
                              height={item.desktop?.Height}
                              fetchPriority="low"
                              class="object-cover lg:rounded-[40px] rounded-[20px] w-full"
                            />
                          </a>
                        </Slider.Item>
                      ))}
                    </Slider>
                  </div>
                  <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
                    <Slider.PrevButton class="hidden sm:flex disabled:opacity-50">
                      <Icon id="chevron-right" class="rotate-180" />
                    </Slider.PrevButton>
                  </div>
                  <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
                    <Slider.NextButton class="hidden sm:flex disabled:opacity-50">
                      <Icon id="chevron-right" />
                    </Slider.NextButton>
                  </div>
                </div>
                <Slider.JS rootId={id} />
              </div>
            )}
          {items &&
            (
              <div class="my-6 flex gap-[24.38px] justify-between">
                  <a href={items[0].Link} class="flex max-w-[450px]">
                    <Image
                      src={items[0].desktop?.Image
                        ? items[0].desktop?.Image
                        : `https://placehold.co/${items[0].desktop?.Width}x${items[0].desktop?.Height}`}
                      alt={items[0].Alt ||
                        "esse é um banner de uma marca tradicional"}
                      width={items[0].desktop?.Width}
                      height={items[0].desktop?.Height}
                      fetchPriority="low"
                      class="object-cover rounded-[40px] w-full"
                    />
                  </a>
                  <a href={items.Link} class="flex max-w-[450px]">
                    <Image
                      src={items[1].desktop?.Image
                        ? items[1].desktop?.Image
                        : `https://placehold.co/${items[1].desktop?.Width}x${items[1].desktop?.Height}`}
                      alt={items[1].Alt ||
                        "esse é um banner de uma marca tradicional"}
                      width={items[1].desktop?.Width}
                      height={items[1].desktop?.Height}
                      fetchPriority="low"
                      class="object-cover rounded-[40px] w-full"
                    />
                  </a>
                  <a href={items.Link} class="flex max-w-[450px]">
                    <Image
                      src={items[2].desktop?.Image
                        ? items[2].desktop?.Image
                        : `https://placehold.co/${items[2].desktop?.Width}x${items[2].desktop?.Height}`}
                      alt={items[2].Alt ||
                        "esse é um banner de uma marca tradicional"}
                      width={items[2].desktop?.Width}
                      height={items[2].desktop?.Height}
                      fetchPriority="low"
                      class="object-cover rounded-[40px] w-full"
                    />
                  </a>
              </div>
            )}
          {bannerFull &&
            (
              <div>
                <a
                  href={bannerFull.Link}
                  class="flex justify-center w-full"
                  key="bannerFull"
                >
                  <Image
                    src={bannerFull.desktop?.Image
                      ? bannerFull.desktop?.Image
                      : `https://placehold.co/${bannerFull.desktop?.Width}x${bannerFull.desktop?.Height}`}
                    alt={bannerFull.Alt ||
                      "esse é um banner de uma marca tradicional"}
                    width={bannerFull.desktop?.Width}
                    height={bannerFull.desktop?.Height}
                    fetchPriority="low"
                    class="object-cover rounded-[40px] w-full"
                  />
                </a>
              </div>
            )}
        </div>
      )}
      {device === "mobile" && (
        <div>
          <div class="my-[35px]">
            {title && (
              <p class="text-base sm:text-3xl font-semibold">{title}</p>
            )}
          </div>
          <div class="my-6">
            <a href={items[0].Link} class="flex">
              <Image
                src={items[0].mobile?.Image
                  ? items[0].mobile?.Image
                  : `https://placehold.co/${items[0].mobile?.Width}x${
                    items[0].mobile?.Height
                  }`}
                alt={items[0].Alt ||
                  "esse é um banner de uma marca tradicional"}
                width={items[0].mobile?.Width}
                height={items[0].mobile?.Height}
                fetchPriority="low"
                loading={items[0].Loading}
                class="object-cover w-full"
              />
            </a>
          </div>
          <div class="container">
            <Slider class="carousel carousel-center w-full gap-4 px-5 sm:flex sm:justify-between ">
              {slide?.map((item, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-fit justify-start"
                  key={index}
                >
                  <a href={item.Link} class="flex">
                    <Image
                      src={item.mobile?.Image
                        ? item.mobile?.Image
                        : `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                      alt={item.Alt ||
                        "esse é um banner de uma marca tradicional"}
                      width={item.mobile?.Width}
                      height={item.mobile?.Height}
                      fetchPriority="low"
                      class="object-cover lg:rounded-[40px] rounded-[20px]"
                    />
                  </a>
                </Slider.Item>
              ))}
            </Slider>
            <Slider.JS rootId={id} />
          </div>
          <div class="my-6">
            <a href={bannerFull?.Link} class="flex">
              <Image
                src={bannerFull?.mobile?.Image
                  ? bannerFull?.mobile?.Image
                  : `https://placehold.co/${bannerFull?.mobile?.Width}x${bannerFull?.mobile?.Height}`}
                alt={bannerFull?.Alt ||
                  "esse é um banner de uma marca tradicional"}
                width={bannerFull?.mobile?.Width}
                height={bannerFull?.mobile?.Height}
                fetchPriority="low"
                loading={bannerFull?.Loading}
                class="object-cover w-full"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstVariation;
