import { ThirdVariationProps } from "./components/types/types.ts";
import { useDevice } from "deco/hooks/useDevice.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";

const ThirdVariation = ({ items, title }: ThirdVariationProps) => {
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
              <div class="my-6 flex  justify-center flex-wrap">
                <div class="flex gap-[20.38px] flex-col">
                  <div class="flex gap-[20.38px]">
                    <a href={items[0]?.Link} class={`flex`}>
                      <Image
                        src={items[0].desktop?.Image
                          ? items[0].desktop?.Image
                          : `https://placehold.co/${items[0].desktop?.Width}x${
                            items[0].desktop?.Height
                          }`}
                        alt={items[0].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[0].desktop?.Width}
                        height={items[0].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px]"
                      />
                    </a>
                    <a href={items[1]?.Link} class={`flex`}>
                      <Image
                        src={items[1].desktop?.Image
                          ? items[1].desktop?.Image
                          : `https://placehold.co/${items[1].desktop?.Width}x${
                            items[1].desktop?.Height
                          }`}
                        alt={items[1].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[1].desktop?.Width}
                        height={items[1].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px]"
                      />
                    </a>
                  </div>
                  <div class="flex gap-[20.38px]">
                    <a href={items[2]?.Link} class={`flex`}>
                      <Image
                        src={items[2].desktop?.Image
                          ? items[2].desktop?.Image
                          : `https://placehold.co/${items[2].desktop?.Width}x${
                            items[2].desktop?.Height
                          }`}
                        alt={items[2].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[2].desktop?.Width}
                        height={items[2].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px]"
                      />
                    </a>
                    <a href={items[3]?.Link} class={`flex`}>
                      <Image
                        src={items[3].desktop?.Image
                          ? items[3].desktop?.Image
                          : `https://placehold.co/${items[3].desktop?.Width}x${
                            items[3].desktop?.Height
                          }`}
                        alt={items[3].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[3].desktop?.Width}
                        height={items[3].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
      {device === "mobile" && (
        <div>
          {title &&
            (
              <div class="container px-5">
                <p class="text-2xl sm:text-3xl font-semibold">{title}</p>
              </div>
            )}
          {items &&
            (
              <div class="my-6">
                <div class="mt-[10px] overflow-x-hidden">
                  <div id={id} class="grid grid-rows-1">
                    <div class="col-start-1 col-span-3 row-start-1 row-span-1">
                      <Slider class="carousel carousel-center w-full gap-6 px-5">
                        {items.map((item, index) => (
                          <Slider.Item
                            index={index}
                            class="carousel-item justify-start"
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
                                class="object-cover rounded-[20px]"
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
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default ThirdVariation;