import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../../sdk/useId.ts";
import { FourthVariationProps } from "./components/types/types.ts";

const FourthVariation = (
  { items, title, bannerFull }: FourthVariationProps,
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
          {items &&
            (
              <div class="my-6 flex flex-col gap-4 justify-center">
                <div class="flex gap-4 justify-center">
                  {items.map((item, index) => (
                    <a href={item.Link} class="flex" key={index}>
                      <Image
                        src={item?.desktop?.Image
                          ? item?.desktop?.Image
                          : `https://placehold.co/${item?.desktop?.Width}x${item?.desktop?.Height}`}
                        alt={item?.Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={item?.desktop?.Width}
                        height={item?.desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px]"
                      />
                    </a>
                  ))}
                </div>
                {bannerFull &&
                  (
                    <div class="flex justify-center">
                      <a href={bannerFull?.Link} class="flex">
                        <Image
                          src={bannerFull?.desktop?.Image
                            ? bannerFull.desktop?.Image
                            : `https://placehold.co/${bannerFull?.desktop?.Width}x${bannerFull?.desktop?.Height}`}
                          alt={bannerFull?.Alt || "Image"}
                          width={bannerFull?.desktop?.Width}
                          height={bannerFull?.desktop?.Height}
                          fetchPriority="low"
                          class="object-cover lg:rounded-[40px] rounded-[20px]"
                        />
                      </a>
                    </div>
                  )}
              </div>
            )}
        </div>
      )}
      {device === "mobile" && (
        <>
          {items &&
            (
              <div class="mt-[10px] overflow-x-hidden">
                <div id={id} class="grid grid-rows-1">
                  <div class="col-start-1 col-span-3 row-start-1 row-span-1">
                    <Slider class="carousel carousel-center w-full gap-[0.5rem] px-5">
                      {items.map((item, index) => (
                        <Slider.Item
                          index={index}
                          class="carousel-item justify-center"
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
          {bannerFull &&
            (
              <a href={bannerFull?.Link} class="flex w-full mt-[70px]">
                <Image
                  src={bannerFull?.mobile?.Image
                    ? bannerFull.mobile?.Image
                    : `https://placehold.co/${bannerFull?.mobile?.Width}x${bannerFull?.mobile?.Height}`}
                  alt={bannerFull?.Alt || "Image"}
                  width={bannerFull?.mobile?.Width}
                  height={bannerFull?.mobile?.Height}
                  fetchPriority="low"
                  class="object-cover w-full"
                />
              </a>
            )}
        </>
      )}
    </>
  );
};

export default FourthVariation;
