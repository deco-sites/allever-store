import { useDevice } from "deco/hooks/useDevice.ts";
import Image from "apps/website/components/Image.tsx";

import { SecondVariationProps } from "./components/types/types.ts";

const SecondVariation = ({ title, items }: SecondVariationProps) => {
  const device = useDevice();

  return (
    <div class="my-4">
      <>
        {device === "desktop" && (
          <div class="container">
            <div class="my-[35px]">
              {title && <p class="text-3xl font-semibold">{title}</p>}
            </div>
            <div class="my-6 flex gap-[34.38px] space-between">
              {items?.map((item, index) => (
                <a href={item.Link} class={`flex`} key={index}>
                  <Image
                    src={item.desktop?.Image
                      ? item.desktop?.Image
                      : `https://placehold.co/${item?.desktop?.Width}x${item?.desktop?.Height}`}
                    alt={item?.Alt ||
                      "esse é um banner de uma marca tradicional"}
                    width={item?.desktop?.Width}
                    height={item?.desktop?.Height}
                    fetchPriority="low"
                    class="object-cover rounded-[40px]"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
        {device === "mobile" && (
          <div class="container px-5">
            {title &&
              (
                <div class="my-[35px]">
                  <p class="text-base font-semibold">{title}</p>
                </div>
              )}
            {items &&
              (
                <div class={`my-6 flex gap-[15px] justify-center flex-wrap`}>
                  {items.map((item, index) => (
                    <a href={item.Link} class={`flex w-full`} key={index}>
                      <Image
                        src={item.mobile?.Image
                          ? item.mobile?.Image
                          : `https:placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                        alt={item.Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={item.mobile?.Width}
                        height={item.mobile?.Height}
                        fetchPriority="low"
                        class="object-cover rounded-[20px] w-full"
                      />
                    </a>
                  ))}
                </div>
              )}
          </div>
        )}
      </>
    </div>
  );
};

export default SecondVariation;
