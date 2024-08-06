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
                        <div class="my-[35px]">
                            <p class="text-2xl sm:text-3xl font-semibold">{title}</p>
                        </div>
                    }
                    {items &&
                        <div class="my-6 flex gap-[34.38px] justify-center flex-wrap">

                            {items.map((item, index) => (
                                <a href={item.Link} class={`flex`} key={index}>
                                    <Image
                                        src={item.desktop?.Image ? item.desktop?.Image : `https://placehold.co/${item.desktop?.Width}x${item.desktop?.Height}`}
                                        alt={item.Alt || 'esse é um banner de uma marca tradicional'}
                                        width={item.desktop?.Width}
                                        height={item.desktop?.Height}
                                        fetchPriority="low"
                                        class="object-cover lg:rounded-[40px] rounded-[20px]"
                                    />
                                </a>
                            ))}
                        </div>
                    }
                </div>

            )}
            {device === "mobile" && (
                <div>
                    {title &&
                        <div class="container px-5" >
                            <p class="text-2xl sm:text-3xl font-semibold">{title}</p>
                        </div>
                    }
                    {items &&
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
                                                            src={item.mobile?.Image ? item.mobile?.Image : `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                                                            alt={item.Alt || 'esse é um banner de uma marca tradicional'}
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
                    }
                </div>
            )}

        </>
    )
}

export default ThirdVariation