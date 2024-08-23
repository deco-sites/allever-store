import { useDevice } from "deco/hooks/useDevice.ts";

import Image from "apps/website/components/Image.tsx";
import { SixthVariationProps } from "./components/types/types.ts";

const SixthVariation = ({ title, items }: SixthVariationProps) => {
  const device = useDevice();

  if (!items || items.length < 3) {
    return null;
  }

  return (
    <>
      {device === "desktop" && (
        <div class="container">
          <div class="my-[35px]">
            {title && <p class="text-2xl sm:text-3xl font-semibold">{title}</p>}
          </div>
          <div class="my-6 flex gap-4 justify-center">
            <div class="col-span-1">
              <a href={items[0].Link} class="flex">
                <Image
                  src={items[0].desktop?.Image ||
                    `https://placehold.co/${items[0].desktop?.Width}x${
                      items[0].desktop?.Height
                    }`}
                  alt={items[0].Alt || "Image"}
                  width={items[0].desktop?.Width}
                  height={items[0].desktop?.Height}
                  fetchPriority="low"
                  class="object-cover rounded-[40px]"
                />
              </a>
            </div>
            <div class="col-span-1 grid grid-rows-2 gap-4">
              {items.slice(1, 3).map((item, index) => (
                <a href={item.Link} class="flex" key={index}>
                  <Image
                    src={item.desktop?.Image ||
                      `https://placehold.co/${item.desktop?.Width}x${item.desktop?.Height}`}
                    alt={item.Alt ||
                      "esse é um banner de uma marca tradicional"}
                    width={item.desktop?.Width}
                    height={item.desktop?.Height}
                    fetchPriority="low"
                    class="object-cover rounded-[40px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      {device === "mobile" && (
        <div class="container px-5">
          <div class="my-[35px]">
            {title && <p class="text-2xl font-semibold">{title}</p>}
          </div>
          <div class="my-6 grid grid-cols-1 gap-4 justify-center">
            <div class="col-span-1">
              <a href={items[0].Link} class="flex justify-center sm:w-[100%]">
                <Image
                  src={items[0].mobile?.Image ||
                    `https://placehold.co/${items[0].mobile?.Width}x${
                      items[0].mobile?.Height
                    }`}
                  alt={items[0].Alt || "Image"}
                  width={items[0].mobile?.Width}
                  height={items[0].mobile?.Height}
                  fetchPriority="low"
                  class="object-cover rounded-[20px] sm:w-[100%]"
                />
              </a>
            </div>
            <div class="col-span-1 grid grid-cols-2 gap-4">
              {items.slice(1, 3).map((item, index) => (
                <a href={item.Link} class="flex justify-center sm:w-[100%]" key={index}>
                  <Image
                    src={item.mobile?.Image ||
                      `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                    alt={item.Alt ||
                      "esse é um banner de uma marca tradicional"}
                    width={item.mobile?.Width}
                    height={item.mobile?.Height}
                    fetchPriority="low"
                    class="object-cover rounded-[20px] sm:w-[100%]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SixthVariation;
