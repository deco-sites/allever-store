import { IS_BROWSER } from "$fresh/runtime.ts";

interface Props {
  id: string;
  type?: string;
}

export default function SwiperJS({
  id,
  type = "default",
}: Props) {
  if (!IS_BROWSER) return null;

  const carousel = document.getElementById(id);
  if (carousel) {
    if (type === "category-home") {
      // @ts-ignore swiper exists
      new Swiper(`#${id}`, {
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
    }
  }

  return null;
}
