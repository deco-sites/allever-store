import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import SwiperJS from "../../islands/SwiperJS.tsx";

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
        <>
            <div className="container px-5 lg:px-0 overflow-hidden">
                <h3 className="sm:my-[50px] mt-[35px] mb-5 text-base font-semibold sm:text-2xl">{Title}</h3>
            </div>
            <div className="container px-0 lg:px-14 mb-[20px] lg:mb-[45px] overflow-hidden relative">
                <div id={id} class="overflow-hidden">
                    <div class="swiper-wrapper">
                        {category.map((item, index) => (
                            <div class="swiper-slide max-w-[113px] sm:max-w-[105px] first:ml-5 last:mr-5 sm:first:ml-0 sm:last:mr-0" key={index}>
                                <Card {...item} layout={layout} />
                            </div>
                        ))}
                    </div>
                    <div class="button-prev absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
                        <Icon id="chevron-right" className="rotate-180" />
                    </div>
                    <div class="button-next absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block">
                        <Icon id="chevron-right" />
                    </div>
                    <div class="pagination static mt-5 flex sm:hidden justify-center" />
                </div>
                <SwiperJS id={id} type="category-home" />
            </div>
        </>
    );
}

export default CarouselCategory;
