import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

interface Category {
    Images?: ImageWidget;
    Label?: string;
    Link?: string;
    width?: number;
    height?: number;
}

interface Props {
    Title?: string;
    layout: 'Marca' | 'Categoria';
    category: Category[];
}

function Card({ Images, Label = "banner de categoria", Link, layout, width = 113, height = 105 }: Category & Pick<Props, 'layout'>) {
    return (
        <a className="flex flex-col group" href={Link}>
            <Image
                className={layout === 'Marca' ? 'rounded-full' : 'rounded-[11px] mb-[9.75px]'}
                src={Images ? Images : `https://placehold.co/${width}x${height}`}
                alt={Label}
                width={width ? height : 113}
                height={height ? height : 105}
                loading="lazy"
            />
            {layout === 'Categoria' && (
                <p className="text-base text-center group-hover:text-[#123ADD] ease-in duration-300">{Label}</p>
            )}
        </a>
    );
}

const CarouselCategory = ({ category, Title, layout }: Props) => {
    const id = useId();

    return (
        <div className="container px-5 lg:px-0 pb-[20px] lg:pb-[45px]">
            <h3 className="sm:my-[50px] mt-[35px] mb-5 text-base font-semibold sm:text-2xl">{Title}</h3>
            <div
                id={id}
                className="grid grid-rows-1"
                style={{
                    gridTemplateColumns: "min-content 1fr min-content",
                }}
            >
                <div className="col-start-1 col-span-3 row-start-1 row-span-1">
                    <Slider className={`carousel carousel-center sm:carousel-end ${layout === 'Marca' ? 'gap-0' : 'sm:gap-[25px]'} w-full lg:justify-center`}>
                        {category.map((item, index) => (
                            <>
                                <Slider.Item
                                    key={index}
                                    index={index}
                                    className="carousel-item  justify-start lg:justify-center flex-shrink-0 flex-grow-0 basis-1/3 lg:basis-[8.6rem] "
                                >
                                    <Card {...item} layout={layout} />
                                </Slider.Item>


                            </>
                        ))}

                    </Slider>
                </div>

                <div className="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
                    <Slider.PrevButton className="hidden sm:flex disabled:opacity-50">
                        <Icon id="chevron-right" className="rotate-180" />
                    </Slider.PrevButton>
                </div>

                <div className="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
                    <Slider.NextButton className="hidden sm:flex disabled:opacity-50">
                        <Icon id="chevron-right" />
                    </Slider.NextButton>
                </div>
            </div>
            <Slider.JS rootId={id} />
        </div>
    );
}

export default CarouselCategory;
