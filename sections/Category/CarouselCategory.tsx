import { useId } from "../../sdk/useId.ts";
import { useScript } from "deco/hooks/useScript.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

interface Category {
  Images?: ImageWidget;
  Label?: string;
  Link?: string;
  width?: number;
  height?: number;
}

interface Props {
  Title?: string;
  layout: "Marca" | "Categoria";
  category: Category[];
}

const onLoad = (id: string) => {
  const carousel = document.getElementById(id);
  if (carousel) {
    // @ts-ignore swiper exists
    new Swiper(`#${id} #content > div`, {
      spaceBetween: 12,
      slidesPerView: "auto",
      breakpoints: {
        640: {
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: `#${id} .button-next`,
        prevEl: `#${id} .button-prev`,
      },
      pagination: {
        el: `#${id} .pagination`,
        clickable: true,
      },
    });

    document.querySelector(`#${id} #content`)?.classList.remove("hidden");
    document.querySelector(`#${id} #fakeLoading`)?.classList.add("hidden");
  }
};

function Card(
  {
    Images,
    Label = "banner de categoria",
    Link,
    layout,
    width = 113,
    height = 105,
  }: Category & Pick<Props, "layout">,
) {
  return (
    <a className="flex flex-col group" href={Link}>
      <Image
        className={layout === "Marca"
          ? "rounded-full"
          : "rounded-[11px] mb-[9.75px]"}
        src={Images ? Images : `https://placehold.co/${width}x${height}`}
        alt={Label}
        width={width ? height : 113}
        height={height ? height : 105}
        loading="lazy"
      />
      {layout === "Categoria" && (
        <p className="text-base text-center group-hover:text-[#123ADD] ease-in duration-300">
          {Label}
        </p>
      )}
    </a>
  );
}

const CarouselCategory = ({ category, Title, layout }: Props) => {
  const id = useId();

  return (
    <div id={id}>
      <div className="container px-5 lg:px-0 overflow-hidden">
        <h3 className="mb-5 text-base font-semibold sm:text-2xl px-0 sm:px-5">
          {Title}
        </h3>
      </div>
      <div id="fakeLoading" class="container px-5 flex gap-5 overflow-x-hidden">
        {new Array(15).fill("").map((_, index) => (
          <div key={index}>
            <div 
              class={layout === "Marca"
                ? "rounded-full skeleton"
                : "rounded-[11px] mb-[9.75px] skeleton"
              }
              style={{
                width: "113px",
                height: "105px",
              }}
            />
            {layout !== "Marca" && <div class="skeleton h-6 w-full rounded-[11px]" />}
          </div>
        ))}
      </div>
      <div id="content" class="hidden container px-0 lg:px-14 overflow-hidden relative">
        <div class="overflow-hidden">
          <div class="swiper-wrapper">
            {category.map((item, index) => (
              <div
                class="swiper-slide max-w-[113px] sm:max-w-[105px] first:ml-5 last:mr-5 lg:first:ml-0 lg:last:mr-0"
                key={index}
              >
                <Card {...item} layout={layout} />
              </div>
            ))}
          </div>
          <div class="button-prev absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <Icon id="chevron-right" className="rotate-180" />
          </div>
          <div class="button-next absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <Icon id="chevron-right" />
          </div>
          <div class="pagination static mt-5 flex sm:hidden justify-center" />
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad, id),
          }}
        />
      </div>
    </div>
  );
};

export default CarouselCategory;
